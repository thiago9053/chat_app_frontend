import Link from "next/link";
import { FC } from "react";
import {
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
  HeartIcon,
  ShowPasswordIcon,
  HidePasswordIcon,
} from "@/shared/components/icons";
import { Form, Input, Checkbox, Button } from "antd";
import { useLogin } from "../hooks/useLogin";

export const Login: FC = () => {
  const { handleLogin } = useLogin();
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center w-1/2 my-auto">
        <h1 className="text-slate-800 text-[24px] font-bold mb-4">
          Welcome Back!
        </h1>
        <p className="text-[#797c8c] mb-12">Signin to continue to Moot</p>
        <Form
          className="w-3/5"
          autoComplete="off"
          layout="vertical"
          onFinish={handleLogin}
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
          <p className="text-[#797c8c] text-[15px] mt-1 mb-2">
            Forgot password ?
          </p>
          <Form.Item className="!mb-2" name="remember-me">
            <Checkbox className="[&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-primary [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-primary">
              Remember me
            </Checkbox>
          </Form.Item>
          <Form.Item className="!mb-2">
            <Button
              className="w-full !border-primary !bg-primary py-2 px-6 !text-white rounded text-[14px] mt-4 flex justify-center items-center gap-4"
              htmlType="submit"
              size="large"
            >
              Login
            </Button>
          </Form.Item>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-700 font-bold text-[14px]">
              Sign in with
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
              Don't have account ?{" "}
              <Link
                href="/signup"
                className="text-primary font-bold underline cursor-pointer"
              >
                Register
              </Link>
            </p>
          </div>
        </Form>
      </div>
      <div className="p-8 text-[#797C8C] text-[15px] font-[300]">
        © 2023 Moot. Crafted with
        <span className="inline-block whitespace-nowrap px-2 align-[-15%]">
          <HeartIcon className="h-4" fill="rgb(239, 71, 111)" />
        </span>
        by @thiago9053
      </div>
    </div>
  );
};
