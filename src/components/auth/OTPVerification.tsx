import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface OTPVerificationProps {
  onVerify: (otp: string) => Promise<void>;
  email: string;
  isLoading?: boolean;
}

export function OTPVerification({ onVerify, email, isLoading }: OTPVerificationProps) {
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      await onVerify(otp);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="glass-panel border-0">
        <CardHeader className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center"
          >
            <Shield className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <div>
            <CardTitle className="text-2xl font-space gradient-text">Verify Your Email</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              We've sent a 4-digit code to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={otp}
                onChange={setOtp}
                className="gap-2"
              >
                <InputOTPGroup>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="glass border-border/30 focus:ring-primary text-lg font-mono"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-medium"
              disabled={isLoading || otp.length !== 4}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button className="text-primary hover:text-primary-glow transition-colors font-medium">
                Resend
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}