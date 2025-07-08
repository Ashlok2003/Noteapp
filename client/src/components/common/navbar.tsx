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

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  return (
    <div className="fixed bg-background top-0 w-full z-20 px-4 sm:px-6 lg:px-8">
      <NavbarWrapper>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NavbarButton
              href="/signup"
              variant="primary"
              className="rounded-4xl font-bold"
            >
              Get Started
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-row gap-4">
              <ThemeToggle />
              <NavbarButton
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full rounded-4xl font-bold"
              >
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavbarWrapper>
    </div>
  );
}
