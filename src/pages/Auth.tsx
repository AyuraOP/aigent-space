import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { OTPVerification } from "@/components/auth/OTPVerification";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup" | "otp";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [otpEmail, setOtpEmail] = useState("");
  const { login, signup, verifyOTP, isLoading } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (fullName: string, email: string, password: string) => {
    try {
      await signup(fullName, email, password);
      setOtpEmail(email);
      // For demo purposes, we skip OTP and go directly to dashboard
      // In real implementation, uncomment the line below:
      // setMode("otp");
      toast({
        title: "Account created!",
        description: "Welcome to AI Agent Space!",
      });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      await verifyOTP(otp);
      toast({
        title: "Email verified!",
        description: "Your account has been successfully verified.",
      });
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout>
      {mode === "login" && (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToSignup={() => setMode("signup")}
          isLoading={isLoading}
        />
      )}
      
      {mode === "signup" && (
        <SignupForm
          onSignup={handleSignup}
          onSwitchToLogin={() => setMode("login")}
          isLoading={isLoading}
        />
      )}
      
      {mode === "otp" && (
        <OTPVerification
          onVerify={handleVerifyOTP}
          email={otpEmail}
          isLoading={isLoading}
        />
      )}
    </AuthLayout>
  );
}