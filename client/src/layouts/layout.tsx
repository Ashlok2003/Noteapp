import { Navbar } from '@/components/common/navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store';

export function ApplicationLayout() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
      <Navbar />
      <div className="min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
}
