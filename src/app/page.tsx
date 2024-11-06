"use client";
import { ISignIn } from "@/common/interfaces";
import NoAuthHeader from "@/components/Admin/NoAuthHeader";
import Button from "@/components/Admin/button";
import { Spinner } from "@/components/Common/Spinner";
import { useLoginUser } from "@/hooks/useUserLogin";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>();

  const { loginUser, loading } = useLoginUser();
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const handleLoginUser = (data: ISignIn) => {
    data.platform = "admin";
    loginUser(data);
  };

  const togglePasswordVisibility = () => {
    if (inputType === "text") {
      setInputType("password");
      return;
    }
    setInputType("text");
  };
  return (
    <>
      <NoAuthHeader />
      <div className="min-h-screen w-auto flex justify-center items-center bg-[#304D30] text-white">
        <form onSubmit={handleSubmit(handleLoginUser)}>
          <div className="border border-slate-200 shadow-md p-10 rounded-2xl">
            <div className="text-center">
              <p className="text-orange-400 font-mono text-sm">Ojembaa Admin</p>
            </div>
            <div className="flex justify-center font-bold text-orange-500">
              Signin
            </div>

            <div className="">
              <label className="pb-10 text-xs">Username</label>
              <input
                {...register("userName", { required: true })}
                id="userName"
                type="userName"
                className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
              />
            </div>
            {errors?.userName && (
              <p className="text-sm italic text-red-500">
                Username is required
              </p>
            )}
            <div className="pt-5">
              <div className="flex justify-between items-center">
                <label className="text-xs">Password</label>
                <span
                  className="text-xs text-orange-400 cursor-pointer italic"
                  onClick={togglePasswordVisibility}
                >
                  {inputType !== "password" ? "Hide password" : "Show password"}
                </span>
              </div>
              <input
                {...register("password", { required: true })}
                id="password"
                type={inputType}
                className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
              />
            </div>
            {errors?.password && (
              <p className=" text-red-500 text-sm italic ">
                Password is required
              </p>
            )}

            <div className="text-right mt-0 pt-0 pb-5 cursor-pointer hover:underline">
              <p className="text-xs text-orange-400 italic">Forget password</p>
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400"
              disabled={loading}
            >
              {loading ? <Spinner height={15} width={15} /> : "Login"}
            </Button>
            <div className="text-center mt-0 pt-1">
              <p className="text-sm">
                Don't have an account yet?
                <Link href="/admin/register">
                  <span className="text-orange-500 hover:underline cursor-pointer px-1">
                    Register
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
