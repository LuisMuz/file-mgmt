/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from "react";
import { handleSignIn } from "./db/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await handleSignIn(formData);
      console.log(response);
      if (response.message === "Login successful") {
        console.log(response);
        setMessage("Login exitoso");
        setTimeout(() => {
          console.log("Redirect to projects page");

          router.push("/files");
        }, 1500);
      } else {
        console.log("activo");
        setMessage(response.message);
      }
    } catch (error) {
      setMessage("Error al Ingresar");
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-extralight text-4xl">
        Hello there ! 🦈
      </h1>

      <form className="flex flex-col gap-5 border-2 p-10 rounded-lg border-gray-500" onSubmit={handleSubmit}>
        {message && (
          <div className={`p-3 rounded-md ${message.includes('exitoso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <div className="flex flex-col gap-5 pb-7">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md text-black p-2"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="rounded-md text-black p-2"
            type="password"
            id="password"
            name="password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="bg-fuchsia-700 w-full text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Log in
          </button>
          <hr className="my-4" />
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="w-full flex justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Google
              <Image
                src='https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'
                width={20}
                height={20}
                alt="Google logo"
              />
            </button>
          </div>
        </div>  
        <Link
          href="/register"
          // className="bg-fuchsia-500 text-white p-2 rounded-md text-center focus:ring-indigo-500"
        >
          <button type="button">
            Don&apos;t have an account? Sign up
          </button>
        </Link>
      </form>
    </div>
  );
}
