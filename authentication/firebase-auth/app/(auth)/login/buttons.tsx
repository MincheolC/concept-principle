"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/lib/utils/firebase";
import GoogleButton from "@/components/buttons/GoogleButton";
import FacebookButton from "@/components/buttons/FacebookButton";

export default function Buttons({ isLogin }: { isLogin: boolean }) {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // 성공적으로 로그인 처리됨
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      // 성공적으로 로그인 처리됨
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {isLogin ? (
        <button onClick={handleSignOut}>로그아웃</button>
      ) : (
        <>
          <GoogleButton type="signup" size="medium" onClick={handleGoogleSignIn} />
          <FacebookButton type="signup" size="medium" onClick={handleFacebookSignIn} />
        </>
      )}
    </div>
  );
}
