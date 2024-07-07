"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginIF } from "@/types";
import { signUp } from "@/app/authenticate/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: any) {
    console.log(values);
    // const res = await signUp(values);
    // if (res.success) {
    //   alert("Account created successfuly");
    //   router.push("/login");
    // }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-5 mt-10"
      >
        <div className="bg-neutral-100 p-5 w-full max-w-lg">
          <h2 className="text-2xl my-4 font-bold text-center">Login</h2>
        </div>

        <input
          {...register("email", { required: true })}
          type="text"
          placeholder="enter email"
          className="input input-bordered w-full max-w-lg"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="password"
          className="input input-bordered w-full max-w-lg"
        />

        <button type="submit" className="btn btn-primary w-full max-w-lg">
          {" "}
          Login
        </button>
      </form>

      <h2 className="text-center self-center mt-2 text-neutral-900">Don't have an account <Link href="/register" className="text-blue-600 hover:underline">SignUp</Link> </h2>
    </div>
  );
};

export default LoginPage;
