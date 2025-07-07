import { OTPForm } from '@/components/auth/otp-form';
import { SignInForm } from '@/components/auth/signin-form';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function SignIn() {
  const [step, setStep] = useState<'signin' | 'otp'>('signin');
  const [email, setEmail] = useState('');
  const navigate= useNavigate();

  const handleSignInSuccess = (email: string) => {
    setEmail(email);
    setStep('otp');
    toast.success('Verification OTP sent to your email');
  };

  const handleOtpVerify = (otp: string) => {
    console.log({ email, otp });
    toast.success('Sign-in successful, redirecting...');
    navigate('/dashboard');
  };

  const goBack = () => {
    setStep('signin');
  };

  return (
    <div className="min-h-screen min-w-screen w-full bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center lg:flex-row w-full h-full"
      >
        <Card className="w-full max-w-[400px] border-none shadow-none bg-background">
          <CardHeader className="flex justify-between items-center p-6">
            <div className="text-2xl font-bold text-primary">HD</div>
            <ThemeToggle />
          </CardHeader>
          <CardContent className="p-6">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                <CardDescription>
                  Please login to continue to your account.
                </CardDescription>
              </div>

              <AnimatePresence mode="wait">
                {step === 'signin' && (
                  <motion.div
                    key="signin-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SignInForm onSuccess={handleSignInSuccess} />
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Need an account?{' '}
                      <Button
                        asChild
                        variant="link"
                        className="p-0 h-auto text-primary hover:underline"
                      >
                        <a href="/signup">Create one</a>
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 'otp' && (
                  <motion.div
                    key="otp-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <OTPForm email={email} onVerify={handleOtpVerify} onBack={goBack} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block flex-1 relative min-h-screen"
        >
          <img
            src="/right-column.png"
            alt="Decorative"
            className="absolute inset-0 w-full h-full object-cover dark:brightness-50 dark:grayscale"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
