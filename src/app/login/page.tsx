"use client";
import React from "react";
import { Login } from "@/modules/users/login/components/login";
import { Header } from "@/shared/components/layouts/Header";

const LoginPage: React.FC = () => (
  <div className="w-full h-screen bg-primary flex items-center p-6 justify-end">
    <div className="w-1/4 h-full mr-6">
      <Header />
    </div>
    <div className="bg-white w-3/4 h-full rounded-xl flex justify-center items-center shadow-xl">
      <Login />
    </div>
  </div>
);

export default LoginPage;
