"use client";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const SignInForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      await login(data.email, data.password);

      toast.success("Logged in successfully!");
      router.push("/");
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
