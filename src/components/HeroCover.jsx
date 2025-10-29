import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroCover() {
  return (
    <header className="relative h-[60vh] w-full sm:h-[70vh]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
            <Rocket className="h-3.5 w-3.5" />
            Fintech • Daily Tracker
          </span>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Track your money daily with clarity and control
          </h1>
          <p className="mt-3 text-white/70">
            A sleek, mobile-first finance tracker to log expenses and income, view summaries, and stay on budget.
          </p>
        </div>
      </div>
    </header>
  );
}
