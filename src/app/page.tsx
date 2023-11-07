"use client";
import { useLogout } from "@/modules/users/hooks/useLogout";
import { authService } from "@/shared/infra/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { handleLogout } = useLogout();

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  return (
    <button
      onClick={() => {
        handleLogout();
      }}
    >
      Logout
    </button>
  );
}
