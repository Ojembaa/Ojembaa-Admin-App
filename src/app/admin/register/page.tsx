"use client";
import { ISignUpUser } from "@/common/interfaces";
import NoAuthHeader from "@/components/Admin/NoAuthHeader";
import Button from "@/components/Admin/button";
import { Spinner } from "@/components/Common/Spinner";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignUpUser>();
  const confirmPasswordValue = watch("confirmPassword");
  const passwordValue = watch("password");
  const { setRegisterUser, loading } = useRegisterUser();
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "password" | "text"
  >("password");

  const togglePasswordVisibility = () => {
    if (inputType === "text") {
      setInputType("password");
      return;
    }
    setInputType("text");
  };

  const toggleConfirmPasswordVisibility = () => {
    if (confirmPasswordType === "text") {
      setConfirmPasswordType("password");
      return;
    }
    setConfirmPasswordType("text");
  };

  const registerUser = (data: ISignUpUser) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Password does not match");
    }
    setRegisterUser(data);
  };

  return (
    <>
      <NoAuthHeader />
      <div className="min-h-screen w-auto flex justify-center items-center bg-[#304D30] text-white">
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="border border-slate-200 shadow-md p-10 rounded-2xl">
            <div className="text-center">
              <p className="text-orange-400 font-mono text-sm">Ojembaa Admin</p>
            </div>
            <div className="flex justify-center font-bold text-orange-500">
              Register
            </div>
            <div className="">
              <label className="pb-10 text-sm font-medium">Firstname</label>
              <input
                {...register("firstName", { required: true })}
                id="firstName"
                type="text"
                className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
              />
            </div>
            {errors?.firstName && (
              <p className=" text-red-500 text-sm italic ">
                Firstname is required
              </p>
            )}
            <div className="pt-5">
              <label className="pb-10 text-sm font-medium">Lastname</label>
              <input
                {...register("lastName", { required: true })}
                id="lastname"
                type="text"
                className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
              />
            </div>
            {errors?.lastName && (
              <p className=" text-red-500 text-sm italic ">
                Lastname is required
              </p>
            )}
            <div className="pt-5">
              <label className="pb-10 text-sm font-medium">Username</label>
              <input
                {...register("userName", { required: true })}
                id="username"
                type="text"
                className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
              />
            </div>
            {errors?.userName && (
              <p className=" text-red-500 text-sm italic">
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
            <div className="pt-5">
              <div className="flex justify-between items-center">
                <label className="text-xs">Confirm password</label>
                <span
                  className="text-xs text-orange-400 cursor-pointer italic"
                  onClick={() => {
                    toggleConfirmPasswordVisibility();
                  }}
                >
                  {confirmPasswordType !== "password"
                    ? "Hide password"
                    : "Show password"}
                </span>
              </div>
              <input
                {...register("confirmPassword", { required: true })}
                id="confirmPassword"
                type={confirmPasswordType}
                className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
              />
            </div>
            {confirmPasswordValue && confirmPasswordValue !== passwordValue ? (
              <p className=" text-red-500 text-sm italic ">
                Password does not match
              </p>
            ) : errors?.confirmPassword ? (
              <p className=" text-red-500 text-sm italic ">
                Confirm Password is required
              </p>
            ) : (
              ""
            )}
            <div className="pt-5">
              {" "}
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-400"
                disabled={loading}
              >
                {loading ? <Spinner height={15} width={15} /> : "Register"}
              </Button>
            </div>

            <div className="text-center mt-0 pt-1">
              <p className="text-sm">
                Already have an account?
                <Link href="/">
                  <span className="text-orange-500 hover:underline cursor-pointer px-1">
                    Signin
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

export default Register;
