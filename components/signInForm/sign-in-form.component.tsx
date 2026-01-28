"use client";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const token = await res.json();

      localStorage.setItem("authToken", token);
      toast.success("Login successful!");
      window.location.href = "/books";
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <Input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
                {...field}
              />
            )}
          />
        </FieldGroup>
      </div>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <Input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
                {...field}
              />
            )}
          />
        </FieldGroup>
      </div>
      <div className="mt-6">
        <Button type="submit" className="w-full" form="login">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
