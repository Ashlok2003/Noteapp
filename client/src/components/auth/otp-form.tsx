/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useTransition } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  email: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
};

export function OTPForm({
  email,
  onVerify,
  onBack,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    if (value.length === 6) {
      startTransition(async () => {
        try {
          await new Promise((resolve) =>
            setTimeout(resolve, 1000),
          );
          onVerify(value);
        } catch (error) {
          toast.error('Invalid OTP, please try again');
        }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 flex flex-col items-center justify-between"
    >
      <p className="text-sm text-muted-foreground text-center">
        Enter the 6-digit OTP sent to {email}
      </p>
      <InputOTP
        maxLength={6}
        onChange={handleChange}
        disabled={isPending}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {isPending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader className="size-5 animate-spin mx-auto" />
        </motion.div>
      )}
      <Button
        variant="outline"
        onClick={onBack}
        className="w-full border-input hover:bg-accent rounded-lg"
        disabled={isPending}
      >
        Back
      </Button>
    </motion.div>
  );
}
