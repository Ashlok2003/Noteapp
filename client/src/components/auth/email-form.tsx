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

const emailSchema = z.object({
  email: z
    .string()
    .email({ message: 'Enter a valid email' }),
});

type Props = {
  onSuccess: (email: string) => void;
};

export function EmailForm({ onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit = async (data: { email: string }) => {
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
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid gap-2">
        <Label className="text-foreground">Email</Label>
        <Input
          {...form.register('email')}
          placeholder="you@example.com"
          className="bg-background border-input"
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
        className="w-full bg-primary hover:bg-primary/90 transition-colors"
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
            <span>Send OTP</span>
          </>
        )}
      </Button>
    </motion.form>
  );
}
