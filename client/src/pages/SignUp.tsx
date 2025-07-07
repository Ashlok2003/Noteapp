import { OTPForm } from '@/components/auth/otp-form';
import { SignUpForm } from '@/components/auth/signup-form';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function SignUp() {
  const [step, setStep] = useState<'signup' | 'otp'>(
    'signup',
  );
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignUpSuccess = (email: string) => {
    setEmail(email);
    setStep('otp');
    toast.success('Verification OTP sent to your email');
  };

  const handleOtpVerify = (otp: string) => {
    console.log({ email, otp });
    toast.success('Sign-up successful, redirecting...');
    navigate('/dashboard');
  };

  const goBack = () => {
    setStep('signup');
  };

  return (
    <div className="min-h-screen min-w-screen bg-background flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-between lg:flex-row w-full h-full ml-4"
      >
        <Card className="w-full max-w-[400px] lg:border-none lg:shadow-none bg-background">
          <CardHeader className="flex justify-between items-center p-6">
            <div className="text-2xl font-bold text-primary">
              HD
            </div>
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
                <CardTitle className="text-2xl font-bold">
                  {step === 'signup'
                    ? 'Sign Up'
                    : 'Verify OTP'}
                </CardTitle>
                <CardDescription>
                  {step === 'signup'
                    ? 'Sign up to enjoy the features of HD'
                    : 'Enter the OTP sent to your email'}
                </CardDescription>
              </div>

              <AnimatePresence mode="wait">
                {step === 'signup' && (
                  <motion.div
                    key="signup-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SignUpForm
                      onSuccess={handleSignUpSuccess}
                    />
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Already have an account?{' '}
                      <Button
                        asChild
                        variant="link"
                        className="p-0 h-auto text-primary hover:underline"
                      >
                        <a href="/login">Sign in</a>
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
                    <OTPForm
                      email={email}
                      onVerify={handleOtpVerify}
                      onBack={goBack}
                    />
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
