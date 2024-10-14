'use server'

import { z } from 'zod';
import bcrypt from 'bcrypt';



const host = "http://localhost:3000";

type SignUpResponse = {
  message: string;
  id?: number;
  email?: string;
  role?: string;
};

type SignUpData = {
  name: string;
  email: string;
  password: string;
  // role: string;
};

type SignInResponse = {
  message: string;
  id?: number;
  email?: string;
  role?: string;
};

type SignInData = {
  email: string;
  password: string;
  // role: string;
};

  const signUpSchema = z.object({
    name: z.string().min(10, "Name is too short"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export async function handleSignup(formData: SignUpData): Promise<SignUpResponse> {
  try {
    const validatedFields = signUpSchema.safeParse({...formData, role: "RESEARCHER"});

    if (!validatedFields.success) {
      return { message: validatedFields.error.errors[0]?.message ?? "An unknown error occurred" };
    }

    console.log('Sending data:', validatedFields.data);
    validatedFields.data.password = await bcrypt.hash(validatedFields.data.password, 10);
    validatedFields.data.confirmPassword = "";

    const response = await fetch(`${host}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (data.message === "User created") {
      return {
        message: 'User creation successful',
        id: data.id,
        email: data.email,
        role: data.role
      };
    }

    return { message: data.message };
  } catch (error) {
    console.error('Error in handleSignup:', error);
    return { 
      message: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

export async function handleSignIn(formData: SignInData): Promise<SignInResponse> {
  try {
    const validatedFields = signInSchema.safeParse(formData);

    if (!validatedFields.success) {
      return { message: validatedFields.error.errors[0]?.message ?? "An unknown error occurred" };
    }

    const userResponse = await fetch(`${host}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!userResponse.ok) {
      throw new Error(`HTTP error! status: ${userResponse.status}`);
    }
    
    const userData = await userResponse.json();
  
    if (userData.message === "Login successful") {
      return {
        message: 'Login successful',
        id: userData.id,
        email: userData.email,
        role: userData.role,
      };
    }

    return { message: userData.message };

  } catch (error) {
    console.error('Error in handleSignin:', error);
    return { message: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}