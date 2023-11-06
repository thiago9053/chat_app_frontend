import { useLoginMutation } from "@/shared/infra/redux/endpoints/users";
import type { loadingState } from "@/shared/constants/loadingState";
import { useState } from "react";
import { signIn } from "next-auth/react";

export const useLogin = () => {
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const handleLogin = async (formValue: any) => {
    const { username, password } = formValue;
    const result = await login({ username, password });
    console.log(result);
  };
  return {
    handleLogin,
  };
};
