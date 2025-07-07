import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const emailSchema = z.object({
  email: z
    .string()
    .email({ message: 'Enter a valid email' }),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: 'Enter the 6-digit OTP' }),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export function LoginForm() {
  const [step, setStep] = useState<'email' | 'otp'>(
    'email',
  );

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const handleEmailSubmit = async (
    data: EmailFormValues,
  ) => {
    console.log('Email submitted:', data);
    toast.success(`OTP sent to ${data.email}`);
    setStep('otp');
    // Simulate API request
    await new Promise((r) => setTimeout(r, 1000));
  };

  const handleOtpSubmit = async (data: OtpFormValues) => {
    console.log('OTP submitted:', data);
    toast.success(`Logged in successfully`);
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <div className="space-y-6">
      {step === 'email' && (
        <form
          onSubmit={emailForm.handleSubmit(
            handleEmailSubmit,
          )}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              {...emailForm.register('email')}
            />
            {emailForm.formState.errors.email && (
              <p className="text-sm text-red-500">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={emailForm.formState.isSubmitting}
            className="w-full"
          >
            {emailForm.formState.isSubmitting
              ? 'Sending…'
              : 'Send OTP'}
          </Button>
        </form>
      )}

      {step === 'otp' && (
        <form
          onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              placeholder="Enter OTP"
              {...otpForm.register('otp')}
            />
            {otpForm.formState.errors.otp && (
              <p className="text-sm text-red-500">
                {otpForm.formState.errors.otp.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={otpForm.formState.isSubmitting}
            className="w-full"
          >
            {otpForm.formState.isSubmitting
              ? 'Verifying…'
              : 'Verify OTP'}
          </Button>

          <Button
            variant="ghost"
            type="button"
            onClick={() => setStep('email')}
            className="w-full"
          >
            Back
          </Button>
        </form>
      )}
    </div>
  );
}
