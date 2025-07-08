import { Navbar } from '@/components/common/navbar';
import { Outlet } from 'react-router-dom';

export function ApplicationLayout() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
      <Navbar />
      <div className="min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
}
