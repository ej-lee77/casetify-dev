import { sendPasswordResetEmail, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, db, googleProvider, kakaoProvider, naverProvider } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const useAuthStore = create((set, get)=>({
    // 로그인, 회원가입
    user: null,

    // firebase 로그인 (앱 최초 실행)
    // 자동로그인 방지
    initAuth: ()=>{
        onAuthStateChanged(auth, async (firebaseUser)=>{
            if(firebaseUser){
                if(!firebaseUser.emailVerified){
                    alert("이메일 인증을 먼저 해주세요!!");
                    await signOut(auth);
                    set({user:null});
                    return
                }
            }
        })
    },

    // 회원가입
    onMember: async({username, email, password, phone, birthDate, zonecode, address, detailaddress})=>{
        try{
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
            set({user: userInfo});
            return true;
        }catch(err){
            // alert(err.message);
            return err.code;
        }
    },

    // 이메일로그인
    onLogin: async (email, password)=>{
        try{
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

                        set({user: user});
                        return "첫로그인"
                    }
                }
                
                // 1. 인증 완료된 경우
                set({user: user});
                return true;
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
        }catch(err){
            console.log(err.message);
            return false;
        }
    },

    // 구글로그인
    onGoogleLogin: async ()=>{
        try{
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result);

            const user = result.user;
            // 데이터 베이스
            const userRef = doc(db, 'users', user.uid);

            // 회원인지 아닌지 체크하기
            const userDoc = await getDoc(userRef);
            if(!userDoc.exists()){
                const userInfo = {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    phone: user.phoneNumber,
                    birthDate: "",
                    zonecode: "",
                    address: "",
                    detailaddress: ""
                }

                await setDoc(userRef, userInfo);
                set({user: userInfo});
            }else{
                set({user: userDoc.data()});
            }
            return true;
        }catch(err){
            console.log(err.message);
            return false;
        }
    },

    // 카카오 로그인
    onKakaoLogin: async()=>{
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
    onLogout: async ()=>{
        try{
            await signOut(auth);
            set({user: null});
            return true;
        }catch(err){
            console.error('로그아웃 오류:', err);
            return false;
        }
    },

    // 아이디찾기
    onFindId: async(formdata)=>{
        try {
            const {username, phone, birthDate} = formdata;
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
    onFindPass: async(formdata)=>{
        try {
            const {username, email, phone, birthDate} = formdata;
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
    }
}));