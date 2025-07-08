import { useState } from 'react';
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavbarButton,
  NavbarLogo,
  Navbar as NavbarWrapper,
} from '../ui/resizable-navbar';
import { ThemeToggle } from './theme-toggle';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/auth-slice';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '@/store';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);

  const handleLogout = () => {
    googleLogout();
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div className="fixed bg-background top-0 w-full z-20 px-4 sm:px-6 lg:px-8">
      <NavbarWrapper>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <NavbarButton
                onClick={handleLogout}
                variant="gradient"
                className="rounded-4xl font-bold"
              >
                Logout
              </NavbarButton>
            ) : (
              <NavbarButton href="/signup" variant="primary" className="rounded-4xl font-bold">
                Get Started
              </NavbarButton>
            )}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            <div className="flex w-full flex-row gap-4">
              <ThemeToggle />
              {isLoggedIn ? (
                <NavbarButton
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="gradient"
                  className="w-full rounded-4xl font-bold"
                >
                  Logout
                </NavbarButton>
              ) : (
                <NavbarButton
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full rounded-4xl font-bold"
                >
                  Get Started
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavbarWrapper>
    </div>
  );
}
