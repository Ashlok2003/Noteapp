import { SignInForm } from '@/components/auth/signin-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function SignIn() {
  return (
    <Card className="w-full flex items-center justify-between max-w-[400px] border-none shadow-none bg-background">
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="text-start">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Please login to continue to your account.</CardDescription>
          </div>

          <SignInForm />

          <div className="text-center text-sm text-muted-foreground mt-4">
            Need an account?{' '}
            <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
              <Link to="/signup">Create one</Link>
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
