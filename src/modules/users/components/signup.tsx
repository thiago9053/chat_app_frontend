import Link from "next/link";
import { FC, FormEvent, useState } from "react";
import {
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
  HeartIcon,
  ShowPasswordIcon,
  HidePasswordIcon,
} from "@/shared/components/icons";
import { Form, Input, Button } from "antd";
import { useSignup } from "../hooks/useSignup";

export const Signup: FC = () => {
  const { handleSignup } = useSignup();

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center w-1/2 my-auto">
        <h1 className="text-slate-800 text-[24px] font-bold mb-4">
          Register Account
        </h1>
        <p className="text-[#797c8c] mb-12">Get your free Moot account now.</p>
        <Form
          className="w-3/5"
          autoComplete="off"
          layout="vertical"
          onFinish={handleSignup}
        >
          <Form.Item
            className="!mb-2"
            label={
              <span className="text-[#495057] text-[15px] font-bold">
                Username
              </span>
            }
            name="username"
          >
            <Input className="text-[13px] border border-[#e6ebf5] rounded outline-0 px-3 py-1 focus:outline-0 focus:ring-0 focus:border-[#e6ebf5]" />
          </Form.Item>
          <Form.Item
            className="!mb-2"
            label={
              <span className="text-[#495057] text-[15px] font-bold">
                Email
              </span>
            }
            name="email"
            rules={[{ type: "email" }]}
          >
            <Input className="text-[13px] border border-[#e6ebf5] rounded outline-0 px-3 py-1 focus:outline-0 focus:ring-0 focus:border-[#e6ebf5]" />
          </Form.Item>
          <Form.Item
            className="!mb-2"
            label={
              <div className="w-full flex justify-between">
                <span className="text-[#495057] text-[15px] font-bold">
                  Password
                </span>
              </div>
            }
            name="password"
          >
            <Input.Password
              iconRender={(visible: boolean) => {
                return (
                  <span className="cursor-pointer w-4">
                    {visible ? (
                      <ShowPasswordIcon
                        className="cursor-pointer h-3"
                        fill="#4267B2"
                      />
                    ) : (
                      <HidePasswordIcon
                        className="cursor-pointer h-3"
                        fill="#4267B2"
                      />
                    )}
                  </span>
                );
              }}
              className="text-[13px] border border-[#e6ebf5] rounded outline-0 px-3 py-1 focus:outline-0 focus:ring-0 focus:border-[#e6ebf5]"
            />
          </Form.Item>
          <div className="mt-4">
            <p className="text-gray-700 font-base text-[15px]">
              By registering you agree to the Moot{" "}
              <span className="text-primary font-bold underline cursor-pointer">
                Terms of Use
              </span>
            </p>
          </div>
          <Form.Item className="!mb-2">
            <Button
              className="w-full !border-primary !bg-primary py-2 px-6 !text-white rounded text-[14px] mt-4 flex justify-center items-center gap-4"
              htmlType="submit"
              size="large"
            >
              Register
            </Button>
          </Form.Item>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-700 font-bold text-[14px]">
              Sign up using
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-between">
            <div className="rounded bg-slate-100 w-full mr-2 h-10 flex justify-center items-center">
              <FacebookIcon className="h-3" fill="#4267B2" />
            </div>
            <div className="rounded bg-slate-100 w-full mx-2 h-10 flex justify-center items-center">
              <GoogleIcon className="h-3" fill="#db3236" />
            </div>
            <div className="rounded bg-slate-100 w-full ml-2 h-10 flex justify-center items-center">
              <TwitterIcon className="h-3" fill="#1DA1F2" />
            </div>
          </div>
          <div className="mt-12">
            <p className="text-center text-gray-700 font-thin">
              Already have an account ?{" "}
              <Link
                href="/login"
                className="text-primary font-bold underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
      <div className="p-8 text-[#797C8C] text-[15px] font-thin">
        © 2023 Moot. Crafted with
        <span className="inline-block whitespace-nowrap px-2 align-[-15%]">
          <HeartIcon className="h-4" fill="rgb(239, 71, 111)" />
        </span>
        by @thile1211
      </div>
    </div>
  );
};
