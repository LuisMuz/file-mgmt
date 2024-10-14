'use client'

import { useState } from "react";
import { handleSignup } from "../db/actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); 

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = {
      name,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await handleSignup(formData);
      console.log(response);
      if (response.message === "User creation successful") {
        setMessage("Registro exitoso!");

        setTimeout(() => {
          console.log("Redirect to main page");
          router.replace('/');
        }, 1500);
        
      } else {
        console.log("activo")
        setMessage(response.message);
      }
    } catch (error) {
      setMessage("Error en el registro");
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-extralight text-4xl">
        Sign Up 🦈
      </h1>

      <form className=" flex flex-col gap-5 border-2 p-10 rounded-lg border-gray-500" onSubmit={handleSubmit}>
        {message && (
          <div className={`p-3 rounded-md ${message.includes('exitoso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <div className="flex flex-col gap-5 pb-7">
          <label htmlFor="name">Name</label>
          <input 
            className="rounded-md text-black p-2" 
            type="text" 
            id="name" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
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
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            className="rounded-md text-black p-2" 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </div>

        <button type="submit" className="bg-fuchsia-700 text-white p-2 rounded-md hover:bg-fuchsia-800 transition-colors">
          Sign Up
        </button>
      </form>
    </div>
  );
}