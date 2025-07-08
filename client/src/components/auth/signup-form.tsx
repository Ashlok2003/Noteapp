import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { AppDispatch, RootState } from '@/store';
import { signup, verifyOtp } from '@/store/slices/auth-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Loader, Send, ShieldCheck } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Separator } from '../ui/separator';
import GoogleAuth from './google-button';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  dateOfBirth: z.date({ required_error: 'Date of Birth is required' }),
  otp: z.string().optional(),
});

type FormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, token, error } = useSelector((s: RootState) => s.auth);

  const [dobOpen, setDobOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', dateOfBirth: undefined, otp: '' },
  });

  const otpPending = !!user && !token;

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    } else if (error && otpPending) {
      form.setError('otp', { message: error });
    }
  }, [token, error, navigate, otpPending, form]);

  const handleSubmit = (data: FormData) => {
    startTransition(() => {
      if (otpPending) {
        dispatch(verifyOtp({ email: user!.email, otp: data.otp! }));
      } else {
        dispatch(
          signup({
            name: data.name,
            email: data.email,
            dob: format(data.dateOfBirth, 'dd MMMM yyyy'),
          }),
        );
      }
    });
  };

  const disableFields = loading || otpPending;

  return (
    <motion.form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!otpPending && (
        <>
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              {...form.register('name')}
              placeholder="Jonas Kahnwald"
              disabled={disableFields}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Date of Birth</Label>
            <Popover open={dobOpen} onOpenChange={setDobOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left',
                    !form.watch('dateOfBirth') && 'text-muted-foreground',
                  )}
                  disabled={disableFields}
                >
                  {form.watch('dateOfBirth')
                    ? format(form.watch('dateOfBirth')!, 'dd MMMM yyyy')
                    : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={form.watch('dateOfBirth')}
                  onSelect={(date) => {
                    form.setValue('dateOfBirth', date!);
                    setDobOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {form.formState.errors.dateOfBirth && (
              <p className="text-sm text-destructive">
                {form.formState.errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              {...form.register('email')}
              placeholder="jonas@example.com"
              disabled={disableFields}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
        </>
      )}

      {otpPending && (
        <div className="grid gap-2">
          <Label>OTP</Label>
          <Input {...form.register('otp')} placeholder="Enter OTP" disabled={loading} />
          {form.formState.errors.otp && (
            <p className="text-sm text-destructive">{form.formState.errors.otp.message}</p>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
        disabled={loading}
      >
        {loading || isPending ? (
          <>
            <Loader className="w-4 h-4 animate-spin mr-2" />
            Processing...
          </>
        ) : otpPending ? (
          <>
            <ShieldCheck className="w-4 h-4 mr-2" />
            Verify OTP
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send OTP
          </>
        )}
      </Button>
      <Separator />
      <div className="w-full">
        <GoogleAuth context="signup" />
      </div>
    </motion.form>
  );
}
