import { EmailForm } from '@/components/auth/email-form';
import { GoogleButton } from '@/components/auth/google-button';
import { OTPForm } from '@/components/auth/otp-form';
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
import { GalleryVerticalEnd } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>(
    'email',
  );
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailSuccess = (email: string) => {
    setEmail(email);
    setStep('otp');
    toast.success('Verification OTP sent to your email');
  };

  const handleOtpVerify = (otp: string) => {
    console.log({ email, otp });
    toast.success('Login successful, redirecting...');
    navigate('/dashboard');
  };

  const goBack = () => {
    setStep('email');
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-5xl h-full"
      >
        <Card className="flex-1 bg-background border-none shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <a
              href="/"
              className="flex items-center gap-2 font-medium text-foreground"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md"
              >
                <GalleryVerticalEnd className="size-5" />
              </motion.div>
              <span className="text-lg font-semibold">
                NoteApp
              </span>
            </a>
            <ThemeToggle />
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm space-y-6"
            >
              <div className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {step === 'email'
                    ? 'Welcome Back'
                    : 'Verify OTP'}
                </CardTitle>
                <CardDescription>
                  {step === 'email'
                    ? 'Login with Google or Email'
                    : 'Enter the OTP sent to your email'}
                </CardDescription>
              </div>

              <AnimatePresence mode="wait">
                {step === 'email' && (
                  <motion.div
                    key="email-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EmailForm
                      onSuccess={handleEmailSuccess}
                    />
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 bg-card px-2 text-muted-foreground text-xs">
                        OR CONTINUE WITH GOOGLE
                      </span>
                    </div>
                    <GoogleButton />
                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-4 border-input hover:bg-accent"
                    >
                      <a href="/">Back to Home</a>
                    </Button>
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
          className="hidden lg:block flex-[1.5] relative min-h-[600px]"
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
