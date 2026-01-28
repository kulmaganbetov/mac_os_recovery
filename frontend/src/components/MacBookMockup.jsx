import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * MacBook Mockup Component
 * Displays a stylized MacBook with content inside the screen
 */
export default function MacBookMockup({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('relative', className)}
    >
      {/* MacBook Body */}
      <div className="relative mx-auto max-w-5xl">
        {/* Screen */}
        <div className="relative rounded-t-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 shadow-2xl">
          {/* Camera notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl flex items-start justify-center pt-1">
            <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
          </div>

          {/* Screen content */}
          <div className="relative bg-black rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
            {children}
          </div>
        </div>

        {/* Bottom of screen bezel */}
        <div className="h-2 bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-t-sm"></div>

        {/* Keyboard base */}
        <div className="relative h-4 bg-gradient-to-b from-zinc-800 to-zinc-700"
             style={{
               clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
             }}>
          {/* Keyboard detail line */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-zinc-600 rounded-full"></div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
      </div>
    </motion.div>
  );
}
