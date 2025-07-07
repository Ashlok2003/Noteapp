/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader, Send } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  dateOfBirth: z.string().regex(/^\d{2} [A-Za-z]+ \d{4}$/, {
    message: 'Enter date as DD Month YYYY',
  }),
  email: z
    .string()
    .email({ message: 'Enter a valid email' }),
});

type Props = {
  onSuccess: (email: string) => void;
};

export function SignUpForm({ onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<{
    name: string;
    dateOfBirth: string;
    email: string;
  }>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', dateOfBirth: '', email: '' },
  });

  const handleSubmit = async (data: {
    name: string;
    dateOfBirth: string;
    email: string;
  }) => {
    startTransition(async () => {
      try {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000),
        );
        onSuccess(data.email);
      } catch (error) {
        toast.error('Error sending OTP');
      }
    });
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
        <Label className="text-foreground">Your Name</Label>
        <Input
          {...form.register('name')}
          placeholder="Jonas Khanwald"
          className="bg-background border-input rounded-lg"
          disabled={isPending}
        />
        {form.formState.errors.name && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-destructive"
          >
            {form.formState.errors.name.message}
          </motion.p>
        )}
      </div>
      <div className="grid gap-4">
        <Label className="text-foreground">
          Date of Birth
        </Label>
        <Input
          {...form.register('dateOfBirth')}
          placeholder="11 December 1997"
          className="bg-background border-input rounded-lg"
          disabled={isPending}
        />
        {form.formState.errors.dateOfBirth && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-destructive"
          >
            {form.formState.errors.dateOfBirth.message}
          </motion.p>
        )}
      </div>
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
            <span>Sign Up</span>
          </>
        )}
      </Button>
    </motion.form>
  );
}
