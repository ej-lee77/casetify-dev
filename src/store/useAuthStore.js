import { sendPasswordResetEmail, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, db, googleProvider, kakaoProvider, naverProvider } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { persist, createJSONStorage } from "zustand/middleware";
import {
    deleteUser as firebaseDeleteUser, EmailAuthProvider, reauthenticateWithCredential, updatePassword
} from "firebase/auth";

export const useAuthStore = create(
    persist((set, get) => ({
        // 로그인, 회원가입
        user: null,

        // firebase 로그인 (앱 최초 실행)
        // 자동로그인 방지
        initAuth: () => {
            onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    const userDocRef = doc(db, "users", firebaseUser.uid);
                    const userSnap = await getDoc(userDocRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        set({ user: userData });
                    }
                } else {
                    set({ user: null });
                }
            })
        },

        // 회원가입
        onMember: async ({ username, email, password, phone, birthDate, zonecode, address, detailaddress }) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userCredential);
                const user = userCredential.user;

                // 인증 메일 보내기
                await sendEmailVerification(user);

                // Firestore에 저장하기
                // 1단계 - 저장위치 지정 doc(db정보, "컬렉션", 문서)
                const userRef = doc(db, "users", user.uid);

                const year = birthDate.getFullYear();
                const month = String(birthDate.getMonth() + 1).padStart(2, '0');
                const day = String(birthDate.getDate()).padStart(2, '0');
                const dateString = `${year}-${month}-${day}`;

                // 2단계 - 저장할 사용자 정보 만들기
                const userInfo = {
                    uid: user.uid,
                    name: username,
                    email,
                    phone,
                    birthDate: dateString,
                    zonecode,
                    address,
                    detailaddress,
                    isFirstLogin: true
                }

                // 3단계 - firestore에 데이터 저장
                await setDoc(userRef, userInfo);

                // 4단계 - zustand에 상태저장
                set({ user: userInfo });
                return true;
            } catch (err) {
                // alert(err.message);
                return err.code;
            }
        },

        // 이메일로그인
        onLogin: async (email, password) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log(userCredential);
                const user = userCredential.user;

                if (user.emailVerified) {
                    console.log("인증됨")

                    // 첫 로그인 확인
                    const userDocRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userDocRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();

                        if (userData.isFirstLogin) {
                            console.log("첫 로그인 확인됨");

                            // 다시는 실행되지 않도록 플래그 업데이트
                            await updateDoc(userDocRef, { isFirstLogin: false });

                            set({ user: userData });
                            return "첫로그인"
                        }

                        // 1. 인증 완료된 경우
                        set({ user: userData });
                        return true;
                    } else {
                        return false;
                    }

                } else {
                    console.log("인증안됨")
                    // 2. 인증 안 된 경우: 에러 상태 설정 및 재발송
                    try {
                        await sendEmailVerification(user);
                        console.log("인증 이메일이 재발송되었습니다.");
                    } catch (err) {
                        console.log(err.message);
                        // console.log("재발송 중 오류가 발생했습니다.");
                    }
                    return "메일인증";
                }
            } catch (err) {
                console.log(err.message);
                return false;
            }
        },

        // 구글로그인
        onGoogleLogin: async () => {
            try {
                const result = await signInWithPopup(auth, googleProvider);
                console.log(result);

                const user = result.user;
                // 데이터 베이스
                const userRef = doc(db, 'users', user.uid);

                // 회원인지 아닌지 체크하기
                const userDoc = await getDoc(userRef);
                if (!userDoc.exists()) {
                    const userInfo = {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName,
                        phone: user.phoneNumber,
                        birthDate: "",
                        zonecode: "",
                        address: "",
                        detailaddress: "",
                        provider: 'google'
                    }

                    await setDoc(userRef, userInfo);
                    set({ user: userInfo });
                } else {
                    set({ user: userDoc.data() });
                    console.log(user);
                }
                return true;
            } catch (err) {
                console.log(err.message);
                return false;
            }
        },

        // 카카오 로그인
        onKakaoLogin: async () => {
            try {
                const kakaoKey = kakaoProvider;
                // 1 카카오 SDK 초기화
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(kakaoKey);
                    // console.log(' Kakao SDK 초기화 완료');
                }

                // 2 로그인 요청 (Promise 변환)
                const authObj = await new Promise((resolve, reject) => {
                    window.Kakao.Auth.login({
                        scope: 'profile_nickname, profile_image',
                        success: resolve,
                        fail: reject,
                    });
                });
                // console.log(' 카카오 로그인 성공:', authObj);

                // 3 사용자 정보 요청 (Promise 기반)
                const res = await window.Kakao.API.request({
                    url: '/v2/user/me',
                });
                // console.log(' 카카오 사용자 정보:', res);

                // 4 사용자 정보 가공
                const uid = res.id.toString();
                const kakaoUser = {
                    uid,
                    email: res.kakao_account?.email || '',
                    name: res.kakao_account.profile?.nickname || '카카오사용자',
                    photoURL: res.kakao_account.profile?.profile_image_url || '',
                    provider: 'kakao',
                    // createdAt: new Date(),
                };

                // 5 Firestore에 저장
                const userRef = doc(db, 'users', uid);
                const userDoc = await getDoc(userRef);

                if (!userDoc.exists()) {
                    await setDoc(userRef, kakaoUser);
                    // console.log(' 신규 카카오 회원 Firestore에 등록 완료');
                } else {
                    // console.log('기존 카카오 회원 Firestore 데이터 있음');
                }

                // 6 Zustand 상태 업데이트
                set({ user: kakaoUser });

                // alert(`${kakaoUser.nickname}님, 카카오 로그인 성공! `);
                // if (navigate) navigate('/dashboard');
                return true;
            } catch (err) {
                console.error(' 카카오 로그인 중 오류:', err);
                // alert('카카오 로그인 실패: ' + err.message);
                return false;
            }
        },

        // 네이버 로그인 로직 (카카오 로그인 코드와 비슷한 구조)
        onNaverLogin: async () => {
            try {
                // 1. 네이버 로그인 팝업 열기
                const clientId = naverProvider;
                const callbackUrl = encodeURIComponent("http://localhost:5173/login/naver");
                const state = "random_string";
                const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${clientId}&redirect_uri=${callbackUrl}&state=${state}`;

                // 1. 팝업 오픈
                const popup = window.open(naverLoginUrl, 'naverlogin', 'width=600,height=700');
                // 2. 팝업에서 토큰 받아오기
                const token = await new Promise((resolve, reject) => {
                    const handleMessage = (e) => {
                        // 보안을 위해 origin 확인
                        if (e.origin !== window.location.origin) return;

                        window.removeEventListener('message', handleMessage);
                        resolve(e.data.token);
                    };
                    window.addEventListener('message', handleMessage);
                });

                // 3. 사용자 정보 요청 (네이버 API)
                const res = await fetch('/v1/nid/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                const userInfo = data.response;

                // 4. 데이터 가공 및 Firestore 저장
                const uid = `naver_${userInfo.id}`;
                const naverUser = {
                    uid,
                    email: userInfo.email,
                    name: userInfo.name,
                    photoURL: userInfo.profile_image,
                    provider: 'naver',
                };

                const userRef = doc(db, 'users', uid);
                const userDoc = await getDoc(userRef);
                if (!userDoc.exists()) {
                    await setDoc(userRef, naverUser);
                }

                set({ user: naverUser });
                return true;
            } catch (err) {
                console.error('네이버 로그인 오류:', err);
                return false;
            }
        },

        // 로그아웃
        onLogout: async () => {
            try {
                await signOut(auth);
                set({ user: null });
                return true;
            } catch (err) {
                console.error('로그아웃 오류:', err);
                return false;
            }
        },

        // 아이디찾기
        onFindId: async (formdata) => {
            try {
                const { username, phone, birthDate } = formdata;
                const usersRef = collection(db, 'users');

                const year = birthDate.getFullYear();
                const month = String(birthDate.getMonth() + 1).padStart(2, '0');
                const day = String(birthDate.getDate()).padStart(2, '0');
                const dateString = `${year}-${month}-${day}`;

                const q = query(
                    usersRef,
                    where("name", "==", username),
                    where("phone", "==", phone),
                    where("birthDate", "==", dateString)
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    return false;
                }

                // 일치하는 첫 번째 계정의 이메일 가져오기
                const userData = querySnapshot.docs[0].data();
                return userData.email;

            } catch (error) {
                return false;
            }
        },
        // 비밀번호 찾기
        onFindPass: async (formdata) => {
            try {
                const { username, email, phone, birthDate } = formdata;
                const usersRef = collection(db, 'users');

                const year = birthDate.getFullYear();
                const month = String(birthDate.getMonth() + 1).padStart(2, '0');
                const day = String(birthDate.getDate()).padStart(2, '0');
                const dateString = `${year}-${month}-${day}`;

                const q = query(
                    usersRef,
                    where("name", "==", username),
                    where("email", "==", email),
                    where("phone", "==", phone),
                    where("birthDate", "==", dateString)
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    return false;
                }

                await sendPasswordResetEmail(auth, email);
                return true;
            } catch (error) {
                console.log(error.message);
                return error.code;
            }
        },

        // 위시리스트
        wishlist: [],
        // 위시리스트 추가
        onAddWishlist: async (wishItem) => {
            const user = get().user;

            const productData = {
                productId: wishItem.id,
                device: wishItem.device,
                color: wishItem.color,
                title: wishItem.productName,
                price: wishItem.price,
                imgUrl: wishItem.imgUrl,
                caseCategory: wishItem.caseCategory
            };

            try {
                const userWishRef = doc(db, "wishlists", user.uid);
                const currentWishlist = get().wishlist;
                
                // 1. 이미 존재하는지 확인 (productId 기준)
                const existingItemIndex = currentWishlist.findIndex(item =>
                    item.productId === wishItem.id &&
                    item.device === wishItem.device &&
                    item.color === wishItem.color
                );
                // const isExisted = currentWishlist.some(item => item.productId === wishItem.id);

                if (existingItemIndex >-1) {
                    // 2. 삭제 처리
                    await setDoc(userWishRef, {
                        items: arrayRemove(productData)
                    }, { merge: true });

                    const updatedList = currentWishlist.filter((_, index) => index !== existingItemIndex);
                    set({ wishlist: updatedList });
                    return "del";
                } else {
                    // 3. 추가 처리
                    await setDoc(userWishRef, {
                        items: arrayUnion(productData)
                    }, { merge: true });
                    set({ wishlist: [...currentWishlist, productData] });
                    return "add";
                }
            } catch (err) {
                console.log(err.message);
                return false;
            }
        },
        // 위시리스트 삭제
        onRemoveWishlist: async (targetItem) => {
            const user = get().user;
            const currentWishlist = get().wishlist;
            const userWishRef = doc(db, "wishlists", user.uid);

            try {
                await updateDoc(userWishRef, {
                    items: arrayRemove(targetItem)
                });

                const updatedList = currentWishlist.filter(item => 
                    !(item.productId === targetItem.productId && 
                    item.device === targetItem.device && 
                    item.color === targetItem.color)
                );
                set({ wishlist: updatedList });
                return true;
            } catch (err) {
                console.log(err.message);
                return false;
            }
        },
        // 위시리스트 가져오기
        onFetchWishlist: async () => {
            const user = get().user; // 현재 로그인된 유저 정보
            if (!user) return;

            try {
                const userWishRef = doc(db, "wishlists", user.uid);
                const docSnap = await getDoc(userWishRef);

                if (docSnap.exists()) {
                    // 문서가 있으면 그 안의 items 배열을 저장
                    set({ wishlist: docSnap.data().items || [] });
                } else {
                    // 문서 자체가 없으면 빈 배열
                    set({ wishlist: [] });
                }
            } catch (err) {
                console.log("위시리스트 로딩 실패:", err.message);
            }
        },

        // 장바구니
        cart: [],
        checkedCart: [],
        // 장바구니 결제할 것만
        onUpdateCheckedCart: (items) => {
            set({ checkedCart: items });
        },
        // 장바구니 가져오기
        onFetchCart: async () => {
            const user = get().user;
            if (!user) return;

            try {
                const cartRef = doc(db, "carts", user.uid);
                const snap = await getDoc(cartRef);

                if (snap.exists()) {
                    set({ cart: snap.data().items });
                } else {
                    set({ cart: [] });
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        // 장바구니 추가
        onAddToCart: async (product) => {
            const { user, cart } = get();
            if (!user) return;

            const currentCart = [...get().cart];

            // 동일 상품(아이디 + 옵션까지 같은지) 찾기
            const existingItemIndex = currentCart.findIndex(item =>
                item.productId === product.id &&
                item.device === product.device &&
                item.color === product.color
            );

            if (existingItemIndex > -1) {
                // 이미 있다면 수량만 증가
                currentCart[existingItemIndex].quantity += 1;
            } else {
                // 없다면 새로 추가
                currentCart.push({
                    productId: product.id,
                    title: product.productName,
                    price: product.price,
                    imgUrl: product.imgUrl,
                    device: product.device,
                    deviceKey: product.deviceKey,
                    color: product.color,
                    imgUrl: product.imgUrl,
                    colorList: product.colorList,
                    deviceList: product.deviceList,
                    isPhone: product.isPhone,
                    deviceBrand: product.deviceBrand,
                    caseCategory: product.caseCategory,
                    quantity: 1
                });
            }

            // DB 업데이트
            try {
                const cartRef = doc(db, "carts", user.uid);
                await setDoc(cartRef, { items: currentCart }, { merge: true });
                set({ cart: currentCart }); // 로컬 스토어 동기화
                return true;
            } catch (e) {
                console.log(e.message);
                return false;
            }
        },
        //장바구니 옵션 업데이트
        onUpdateOption: async (oldItem, newModel, newColor, newDeviceKey) => {
            const { user, cart } = get();
            if (!user) return;

            let currentCart = [...cart];

            // 1. 기존 아이템 제거
            // 식별 기준: productId + 기존 device + 기존 color
            const targetIndex = currentCart.findIndex(item =>
                item.productId === oldItem.productId &&
                item.device === oldItem.device &&
                item.color === oldItem.color
            );

            if (targetIndex === -1) return; // 수정 대상 못 찾으면 종료

            const updatedItem = {
                ...currentCart[targetIndex],
                device: newModel,
                deviceKey: newDeviceKey,
                color: newColor
            };

            // 기존 위치 아이템 삭제
            currentCart.splice(targetIndex, 1);

            // 2. 새로운 옵션이 이미 장바구니에 있는지 확인 (중복 체크)
            const existingItemIndex = currentCart.findIndex(item =>
                item.productId === updatedItem.productId &&
                item.device === updatedItem.device &&
                item.color === updatedItem.color
            );

            if (existingItemIndex > -1) {
                // 이미 동일 옵션 상품이 있다면 수량 합치기
                currentCart[existingItemIndex].quantity += updatedItem.quantity;
            } else {
                // 없다면 수정된 아이템을 해당 위치 또는 끝에 삽입
                currentCart.splice(targetIndex, 0, updatedItem);
            }

            // 3. DB 및 로컬 스토어 업데이트
            try {
                const cartRef = doc(db, "carts", user.uid);
                await setDoc(cartRef, { items: currentCart }, { merge: true });
                set({ cart: currentCart });
            } catch (e) {
                console.error("옵션 업데이트 실패:", e.message);
            }
        },
        // 장바구니 수량변경
        updateQuantity: async (index, amount) => {
            const newCart = [...get().cart];
            newCart[index].quantity += amount;

            // 수량이 0 이하면 삭제 처리하거나 1로 고정
            if (newCart[index].quantity < 1) return;

            const user = get().user;
            await setDoc(doc(db, "carts", user.uid), { items: newCart }, { merge: true });
            set({ cart: newCart });
        },
        // 장바구니 선택 삭제
        onRemoveSelected: async (selectedItems) => {
            const { user, cart } = get();
            if (!user) return;

            // selectedItems에 포함되지 않은 아이템들만 남기기
            const updatedCart = get().cart.filter(cartItem =>
                !selectedItems.some(selected =>
                    selected.productId === cartItem.productId &&
                    selected.device === cartItem.device &&
                    selected.color === cartItem.color
                )
            );

            try {
                const cartRef = doc(db, "carts", user.uid);
                await setDoc(cartRef, { items: updatedCart }, { merge: true });
                set({ cart: updatedCart });
            } catch (e) {
                console.log("일괄 삭제 실패:", e.message);
            }
        },
        // 장바구니 전체 비우기
        onClearCart: async () => {
            const user = get().user;
            if (!user) return;

            try {
                const cartRef = doc(db, "carts", user.uid);
                await setDoc(cartRef, { items: [] }, { merge: true });
                set({ cart: [] });
            } catch (e) {
                console.log("장바구니 비우기 실패:", e.message);
            }
        },

        // 회원정보 수정
        onUpdateUser: async (formData) => {
            try {
                const user = get().user;
                if (!user) return false;

                const userRef = doc(db, "users", user.uid);

                // birthDate 변환
                let birthDateString = '';
                if (formData.birthDate instanceof Date) {
                    const year = formData.birthDate.getFullYear();
                    const month = String(formData.birthDate.getMonth() + 1).padStart(2, '0');
                    const day = String(formData.birthDate.getDate()).padStart(2, '0');
                    birthDateString = `${year}-${month}-${day}`;
                } else {
                    birthDateString = formData.birthDate || '';
                }

                await updateDoc(userRef, {
                    name: formData.name,
                    phone: formData.phone,
                    zonecode: formData.zonecode,
                    address: formData.address,
                    detailaddress: formData.detailaddress,
                    birthDate: birthDateString
                });

                set({
                    user: {
                        ...user,
                        ...formData,
                        birthDate: birthDateString  // zustand에도 문자열로 저장
                    }
                });

                return true;
            } catch (err) {
                console.log(err.message);
                return false;
            }
        },
        handleChangePassword: async (passwordData) => {
            // console.log("받은 passwordData:", passwordData); // 확인용
            const user = auth.currentUser;
            // console.log("현재 user:", user); // 확인용

            // if (!user) {
            //     alert("로그인이 필요합니다");
            //     return false;
            // }
            if (!user) return "no-user";

            // if (passwordData.newPassword !== passwordData.confirmPassword) {
            //     alert("비밀번호가 일치하지 않습니다");
            //     return false;
            // }

            if (passwordData.newPassword !== passwordData.confirmPassword) return "password-mismatch";

            try {
                const credential = EmailAuthProvider.credential(
                    user.email,
                    passwordData.currentPassword
                );
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, passwordData.newPassword);
                console.log("sss", passwordData.newPassword);
                console.log("aaa", passwordData.confirmPassword);
                console.log("fff", passwordData.currentPassword);
                return true;
            } catch (err) {
                console.log(err.code);
                return err.code;
            }
        },
        // 계정 삭제
        onDeleteUser: async () => {
            try {
                const user = get().user;
                const currentUser = auth.currentUser;

                if (!user || !currentUser) return false;

                // 1. Auth 계정 삭제
                await firebaseDeleteUser(currentUser);

                // 2. Firestore 데이터 삭제
                const userRef = doc(db, "users", user.uid);
                await deleteDoc(userRef);

                // 3. 상태 초기화
                set({ user: null });

                return true;
            } catch (err) {
                console.log(err.message);
                return err.code;
            }
        },
    }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                user: state.user ? {
                    uid: state.user.uid,
                    provider: state.user.provider,
                } : null,
                checkedCart: state.checkedCart
            })
        }
    ));