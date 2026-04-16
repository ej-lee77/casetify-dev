import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, db, googleProvider } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

            // 2단계 - 저장할 사용자 정보 만들기
            const userInfo = {
                uid: user.uid,
                name: username,
                email,
                phone,
                birthDate,
                zonecode,
                address,
                detailaddress
            }

            // 3단계 - firestore에 데이터 저장
            await setDoc(userRef, userInfo);

            // 4단계 - zustand에 상태저장
            set({user: userInfo});
            return true;
        }catch(err){
            alert(err.message);
            return false;
        }
    },

    // 이메일로그인
    onLogin: async (email, password)=>{
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);

            set({user: userCredential.user});
            return true;
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
    onKakaoLogin: ()=>{

    },

    // 로그아웃
    onLogout: async ()=>{
        await signOut(auth);
        set({user: null});
    }

}));