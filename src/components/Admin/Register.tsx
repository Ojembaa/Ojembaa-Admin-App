import React from "react";
import Button from "./button";
import { useForm } from "react-hook-form";

interface ISignUpUser {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Register = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpUser>();

  const registerUser = () => {};
  return (
    <div>
      <form onSubmit={handleSubmit(registerUser)}>
        <div className="border border-slate-200 shadow-md p-10 rounded-2xl">
          <div className="flex justify-center font-bold">Resgister</div>
          <div className="pb-5">
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
          <div className="pb-5">
            <label className="pb-10 text-sm font-medium">Lastname</label>
            <input
              {...register("lastName", { required: true })}
              id="lastname"
              type="text"
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
            />
          </div>
          {errors?.lastName && (
            <p className=" text-red-500 text-sm italic ">
              LastName is required
            </p>
          )}
          <div className="pb-5">
            <label className="pb-10 text-sm font-medium">Username</label>
            <input
              {...register("userName", { required: true })}
              id="username"
              type="text"
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
            />
          </div>
          {errors?.userName && (
            <p className=" text-red-500 text-sm italic ">
              Password is required
            </p>
          )}
          <div className="pb-5">
            <label className="pb-10 text-sm font-medium">Password</label>
            <input
              {...register("password", { required: true })}
              id="password"
              type="password"
              className="focus:invalid:border-red-500 px-3 focus:outline-none focus:border-blue-300 w-full py-2 bg-transparent border border-gray-300 rounded-lg"
            />
          </div>
          {errors?.password && (
            <p className=" text-red-500 text-sm italic ">
              Password is required
            </p>
          )}

          <Button type="submit" className="w-full hover:bg-purple-700 ">
            Register
          </Button>
          <div className="text-center mt-0 pt-0 ">
            <p className="text-sm">
              Already have an account?
              <span className="text-green-900 hover:underline cursor-pointer px-1">
                Signin
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
