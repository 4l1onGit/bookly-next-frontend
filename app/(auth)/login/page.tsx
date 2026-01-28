import SignInForm from "@/components/signInForm/sign-in-form.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <Card className="p-8">
        <CardHeader>
          <CardTitle className="text-2xl mb-4 text-center">
            Login Page
          </CardTitle>
          <CardDescription>
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
