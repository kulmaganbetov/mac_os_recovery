import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Disclaimer Component
 * Displays educational warning on every page
 */
export default function Disclaimer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full px-4"
    >
      <div className="glass-strong rounded-lg px-4 py-2 flex items-center gap-3 border border-yellow-500/30">
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
        <p className="text-sm text-yellow-200/90">
          <span className="font-semibold">Educational Simulation:</span> No real system data is accessed or modified.
        </p>
      </div>
    </motion.div>
  );
}
