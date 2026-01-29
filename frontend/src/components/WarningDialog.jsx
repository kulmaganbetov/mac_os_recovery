import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

/**
 * Warning Dialog Component
 * Shows configuration warnings before starting simulation
 */
export default function WarningDialog({ warnings, onContinue, onGoBack, onClose }) {
  if (!warnings || warnings.length === 0) return null;

  const hasErrors = warnings.some(w => w.type === 'error');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-strong rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border-b border-white/10 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Configuration {hasErrors ? 'Errors' : 'Warnings'}
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    {hasErrors
                      ? 'Critical issues detected - cannot proceed'
                      : 'Potential issues detected with your configuration'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {warnings.map((warning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    warning.type === 'error'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-yellow-500/10 border-yellow-500/30'
                  }`}
                >
                  <div className="flex gap-3">
                    <AlertTriangle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        warning.type === 'error' ? 'text-red-400' : 'text-yellow-400'
                      }`}
                    />
                    <div className="flex-1">
                      <div
                        className={`font-semibold mb-2 ${
                          warning.type === 'error' ? 'text-red-300' : 'text-yellow-300'
                        }`}
                      >
                        {warning.message}
                      </div>
                      <div
                        className={`text-sm ${
                          warning.type === 'error' ? 'text-red-400/80' : 'text-yellow-400/80'
                        }`}
                      >
                        <span className="font-medium">Suggestion:</span> {warning.suggestion}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {!hasErrors && (
              <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-200 text-sm">
                  ℹ️ You can continue anyway, but the simulation may not complete successfully or may show limited results.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-6 flex justify-between items-center bg-black/20">
            <Button
              variant="ghost"
              onClick={onGoBack}
              className="group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back to Settings
            </Button>

            {!hasErrors && (
              <Button
                onClick={onContinue}
                variant="outline"
                className="group border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20"
              >
                Continue Anyway
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}

            {hasErrors && (
              <div className="text-red-400 text-sm font-medium">
                Fix errors to continue
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
