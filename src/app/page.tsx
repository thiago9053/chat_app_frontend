"use client";
import { Menu } from "@/modules/sidebar/components/menu";
import { Sidebar } from "@/modules/sidebar/components/sidebar/sidebar";
import { authService } from "@/shared/infra/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      router.push("/login");
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
