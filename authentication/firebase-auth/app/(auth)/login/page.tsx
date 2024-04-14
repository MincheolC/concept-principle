"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/utils/firebase";
import LoginButtons from "@/app/(auth)/login/buttons";

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 상태
        setUser(user);
      } else {
        // 사용자가 로그아웃한 상태
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center items-center h-lvh p-10">
      <div className="shadow-md border border-slate-100 p-6 rounded-2xl w-full xl:w-1/3 xl:p-10">
        <LoginButtons isLogin={!!user} />
      </div>
    </div>
  );
}
