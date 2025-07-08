import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signin, verifyOtp } from '@/store/slices/auth-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { motion } from 'framer-motion';
import { Loader, Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Separator } from '../ui/separator';
import GoogleAuth from './google-button';
import { useNavigate } from 'react-router-dom';

const signInSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  otp: z.string().optional(),
});

type FormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, step, loading } = useAppSelector((s) => s.auth);

  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', otp: '' },
  });

  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSubmit = (data: FormData) => {
    if (step === 'idle') {
      dispatch(signin({ email: data.email }))
        .unwrap()
        .then(() => {
          toast.success(`OTP sent to ${data.email}`);
        })
        .catch((err) => {
          toast.error(err || 'Failed to send OTP');
        });
    } else if (step === 'otp_pending') {
      dispatch(verifyOtp({ email: user?.email || '', otp: data.otp || '' }))
        .unwrap()
        .then(() => {
          toast.success('OTP verified successfully');
          navigate('/dashboard');
        })
        .catch((err) => {
          toast.error(err || 'Invalid OTP');
        });
    }
  };

  const handleResendOTP = () => {
    if (!user?.email) return;
    dispatch(signin({ email: user.email }))
      .unwrap()
      .then(() => toast.success('OTP resent to your email'))
      .catch((err) => toast.error(err || 'Error resending OTP'));
  };

  const handleCheckboxChange = (checked: CheckedState) => {
    setKeepLoggedIn(checked === 'indeterminate' ? false : !!checked);
  };

  return (
    <motion.form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {step === 'idle' && (
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            {...form.register('email')}
            placeholder="example@gmail.com"
            className="bg-background border-input rounded-lg"
            disabled={loading}
          />
          {form.formState.errors.email && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive"
            >
              {form.formState.errors.email.message}
            </motion.p>
          )}
        </div>
      )}

      {step === 'otp_pending' && (
        <div className="grid gap-2">
          <Label>OTP</Label>
          <Input
            {...form.register('otp')}
            placeholder="Enter OTP"
            className="bg-background border-input rounded-lg"
            disabled={loading}
          />
          {form.formState.errors.otp && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive"
            >
              {form.formState.errors.otp.message}
            </motion.p>
          )}
          <Button
            type="button"
            variant="link"
            onClick={handleResendOTP}
            className="text-primary hover:underline p-0 h-auto mt-2"
            disabled={loading}
          >
            Resend OTP
          </Button>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="keepLoggedIn"
          checked={keepLoggedIn}
          onCheckedChange={handleCheckboxChange}
          disabled={loading}
        />
        <Label htmlFor="keepLoggedIn" className="text-foreground text-sm">
          Keep me logged in
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader className="size-4 animate-spin mr-2" />
            <span>Processing...</span>
          </>
        ) : step === 'idle' ? (
          <>
            <Send className="size-4 mr-2" />
            <span>Send OTP</span>
          </>
        ) : (
          <>
            <ShieldCheck className="size-4 mr-2" />
            <span>Verify OTP</span>
          </>
        )}
      </Button>

      <Separator />
      <GoogleAuth context="signin" />
    </motion.form>
  );
}
