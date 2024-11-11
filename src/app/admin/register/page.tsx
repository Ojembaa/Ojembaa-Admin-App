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

  const types = ["COURIER", "SENDER", "RECEIVER", "ADMIN"];

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
    // return console.log("data", data);
    setRegisterUser(data);
  };

  return (
    <>
      <NoAuthHeader />
      <div className="min-h-screen w-auto flex justify-center items-center text-black bg-[#F8A62D]">
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="border-2 border-black shadow-md p-10 rounded-2xl">
            <div className="text-center">
              <p className="font-bold">Ojembaa Admin</p>
            </div>
            <div className="flex justify-center font-bold text-sm">
              Register
            </div>
            <div className="flex gap-3">
              <div className="w-56">
                <label className="text-xs">Name</label>
                <input
                  {...register("name", { required: true })}
                  id="name"
                  type="text"
                  className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-black rounded-lg"
                />
                {errors?.name && (
                  <p className=" text-red-500 text-sm italic ">
                    Name is required
                  </p>
                )}
              </div>
              <div className="w-56">
                <label className="text-xs">Firstname</label>
                <input
                  {...register("firstName", { required: true })}
                  id="firstName"
                  type="text"
                  className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-black rounded-lg"
                />
                {errors?.firstName && (
                  <p className=" text-red-500 text-sm italic ">
                    First name is required
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="pt-3 w-56">
                <label className="text-xs">Lastname</label>
                <input
                  {...register("lastName", { required: true })}
                  id="lastname"
                  type="text"
                  className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-black rounded-lg"
                />
                {errors?.lastName && (
                  <p className=" text-red-500 text-sm italic ">
                    Lastname is required
                  </p>
                )}
              </div>

              <div className="pt-3 w-56">
                <label className="text-xs">Phone</label>
                <input
                  {...register("phone", { required: true })}
                  id="phone"
                  type="number"
                  className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-black rounded-lg"
                />
                {errors?.phone && (
                  <p className=" text-red-500 text-sm italic ">
                    phone is required
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-start items-center gap-3">
              <div className="pt-3 w-56">
                <label className="text-xs">Email</label>
                <input
                  {...register("email", { required: true })}
                  id="email"
                  type="text"
                  className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-black rounded-lg"
                />
                {errors?.email && (
                  <p className=" text-red-500 text-sm italic">
                    email is required
                  </p>
                )}
              </div>

              <div className="pt-3 w-56">
                <label className="text-xs">Type</label>
                <select
                  {...register("type", { required: true })}
                  id="type"
                  className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-black rounded-lg h-10"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors?.type && (
                  <p className=" text-red-500 text-sm italic ">
                    type is required
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="pt-3 w-56">
                <div className="flex justify-between items-center">
                  <label className="text-xs">Confirm password</label>
                  <span
                    className="text-xs text-white cursor-pointer italic"
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
                  className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-black rounded-lg"
                />
                {confirmPasswordValue &&
                confirmPasswordValue !== passwordValue ? (
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
              </div>

              <div className="pt-3 w-56">
                <div className="flex justify-between items-center">
                  <label className="text-xs">Password</label>
                  <span
                    className="text-xs text-white cursor-pointer italic"
                    onClick={togglePasswordVisibility}
                  >
                    {inputType !== "password"
                      ? "Hide password"
                      : "Show password"}
                  </span>
                </div>
                <input
                  {...register("password", { required: true })}
                  id="password"
                  type={inputType}
                  className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-black rounded-lg"
                />
                {errors?.password && (
                  <p className=" text-red-500 text-sm italic ">
                    Password is required
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3">
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
                  <span className="text-white hover:underline cursor-pointer px-1">
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
