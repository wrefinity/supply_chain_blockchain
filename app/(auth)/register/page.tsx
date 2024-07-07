"use client"

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginIF } from "@/types";
import { signUp } from "@/app/authenticate/auth.actions";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  async function onSubmit(values: any) {
    console.log(values);
    const res = await signUp(values);
    if (res.success) {
      alert("Account created successfuly");
      router.push("/");
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-5 mt-10"
      >
        <div className="bg-neutral-100 p-5 w-full max-w-lg">
          <h2 className="text-2xl my-4 font-bold text-center">Register</h2>
        </div>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="enter name"
          className="input input-bordered w-full max-w-lg"
        />
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
        <input
          {...register("phone", { required: true })}
          type="text"
          placeholder="Phone"
          className="input input-bordered w-full max-w-lg"
        />


        <button type="submit" className="btn btn-primary w-full max-w-lg">
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
