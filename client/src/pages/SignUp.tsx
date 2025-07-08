import { SignUpForm } from '@/components/auth/signup-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function SignUp() {
  return (
    <Card className="w-full flex items-center justify-between max-w-[400px] border-none shadow-none bg-background">
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="text-center">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>Sign up to enjoy the features of HD</CardDescription>
          </div>

          <SignUpForm />

          <div className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
              <Link to="/signin">Sign in</Link>
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
