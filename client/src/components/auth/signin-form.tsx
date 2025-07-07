/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { motion } from 'framer-motion';
import { Loader, Send } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
});

type Props = {
  onSuccess: (email: string) => void;
};

export function SignInForm({ onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const form = useForm<{ email: string }>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit = async (data: { email: string }) => {
    startTransition(async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSuccess(data.email);
      } catch (error) {
        toast.error('Error sending OTP');
      }
    });
  };

  const handleResendOTP = async () => {
    startTransition(async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('OTP resent to your email');
      } catch (error) {
        toast.error('Error resending OTP');
      }
    });
  };

  const handleCheckboxChange = (checked: CheckedState) => {
    setKeepLoggedIn(checked === 'indeterminate' ? false : checked);
  };

  return (
    <motion.form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid gap-4">
        <Label className="text-foreground">Email</Label>
        <Input
          {...form.register('email')}
          placeholder="jonas_kahnwald@gmail.com"
          className="bg-background border-input rounded-lg"
          disabled={isPending}
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
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-2"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader className="size-4 animate-spin mr-2" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="size-4 mr-2" />
            <span>Sign In</span>
          </>
        )}
      </Button>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="keepLoggedIn"
          checked={keepLoggedIn}
          onCheckedChange={handleCheckboxChange}
          disabled={isPending}
        />
        <Label htmlFor="keepLoggedIn" className="text-foreground text-sm">
          Keep me logged in
        </Label>
      </div>
      <Button
        variant="link"
        onClick={handleResendOTP}
        className="w-full text-center text-primary hover:underline p-0 h-auto"
        disabled={isPending}
      >
        Resend OTP
      </Button>
    </motion.form>
  );
}
