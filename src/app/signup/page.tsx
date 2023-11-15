"use client";
import React, { useEffect } from "react";
import { Header } from "@/shared/components/layouts/Header";
import { authService } from "@/shared/infra/services";
import { useRouter } from "next/navigation";
import { Signup } from "@/modules/users/components/signup";

const SignupPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-full h-screen bg-primary flex items-center p-6 justify-end">
      <div className="w-1/4 h-full mr-6">
        <Header />
      </div>
      <div className="bg-white w-3/4 h-full rounded-xl flex justify-center items-center shadow-xl">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
