"use client";
import { Providers } from "@/shared/infra/redux/providers";
import "@/shared/styles/globals.css";
import "@/shared/styles/_main.scss";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdStyledComponentsRegistry } from "@/shared/infra/antd/AntdStyledComponentsRegistry";
import ToastProvider from "@/shared/infra/toastify/ToastProvider";
import { SocketProvider } from "@/shared/infra/socket/provider";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SocketProvider> */}
        <Providers>
          <AntdStyledComponentsRegistry>
            <ToastProvider>{children}</ToastProvider>
          </AntdStyledComponentsRegistry>
        </Providers>
        {/* </SocketProvider> */}
      </body>
    </html>
  );
}
