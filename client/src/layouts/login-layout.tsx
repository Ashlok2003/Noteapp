import { NavbarLogo } from '@/components/ui/resizable-navbar';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

export function LoginLayout() {
  return (
    <div className="min-h-screen min-w-screen w-full bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center lg:flex-row w-full h-full"
      >
        <div className="flex flex-col items-center justify-center w-full lg:w-1/3 p-4">
          <div className="w-full flex justify-center lg:justify-start">
            <NavbarLogo />
          </div>
          <div className="-mt-8 lg:mt-20">
            <Outlet />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block lg:w-2/3 relative min-h-screen"
        >
          <img
            src="/right-column.png"
            alt="Decorative background with soft hues"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover dark:brightness-50 dark:grayscale"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
