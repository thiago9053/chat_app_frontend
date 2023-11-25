"use client";
import { Menu } from "@/modules/sidebar/components/menu";
import { Sidebar } from "@/modules/sidebar/components/sidebar/sidebar";
import { getProfileAction } from "@/modules/sidebar/slices/profile";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { authService } from "@/shared/infra/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      dispatch(getProfileAction());
    }
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-between">
      <div className="h-full flex item-centers">
        <Menu />
        <Sidebar />
      </div>
    </div>
  );
}
