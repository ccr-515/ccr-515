import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type StepShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function StepShell({ eyebrow, title, subtitle, children }: StepShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-200/80">{eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">{title}</h1>
        <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}
