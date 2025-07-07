/* eslint-disable @typescript-eslint/no-unused-vars */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { Loader } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function GoogleButton() {
  const [isPending, startTransition] = useTransition();

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      try {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
        toast.success('Redirecting to Google sign-in...');
      } catch (error) {
        toast.error('Error initiating Google sign-in');
      }
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full flex gap-2 border-input bg-background hover:bg-accent transition-colors"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader className="size-4 animate-spin mr-2" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <FcGoogle className="text-xl" />
            Sign in with Google
          </>
        )}
      </Button>
    </motion.div>
  );
}
