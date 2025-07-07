import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { cn } from '@/lib/utils';

export function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden bg-background p-20 text-center">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
        )}
      />

      <h1 className="text-4xl md:text-6xl  font-extrabold tracking-tight mb-4 leading-tight">
        Welcome to{' '}
        <span className="text-primary">Noteapp</span>
      </h1>

      <p className="max-w-xl text-base italic md:text-lg text-muted-foreground mb-8">
        Capture your thoughts, organize your ideas, and keep
        everything in one secure place.
      </p>

      <InteractiveHoverButton>
        Get Started
      </InteractiveHoverButton>
    </div>
  );
}
