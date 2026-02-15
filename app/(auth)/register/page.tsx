"use client";
import { useAuth } from "@/hooks/useAuth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignUpForm from "@/components/signUpForm/sign-up-form.component";

const RegisterPage = () => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <Card className="p-8">
        <CardHeader>
          <CardTitle className="text-2xl mb-4 text-center">
            Register Page
          </CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
