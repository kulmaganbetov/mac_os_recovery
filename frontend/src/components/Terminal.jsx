import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Terminal Component
 * Simulates a macOS Terminal with typing animation
 */
export default function Terminal({ steps = [], isActive = false, onComplete, onStepComplete }) {
  const [displayedSteps, setDisplayedSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const [cursorBlink, setCursorBlink] = useState(true);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedSteps]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Process steps with typing animation
  useEffect(() => {
    if (!isActive || currentStepIndex >= steps.length) {
      if (currentStepIndex >= steps.length && onComplete) {
        onComplete();
      }
      return;
    }

    const currentStep = steps[currentStepIndex];
    setIsTyping(true);

    const timer = setTimeout(() => {
      setDisplayedSteps(prev => [...prev, currentStep]);
      setIsTyping(false);
      setCurrentStepIndex(prev => prev + 1);
      // Notify parent component about step completion
      if (onStepComplete) {
        onStepComplete(currentStepIndex + 1);
      }
    }, currentStep.delay || 800);

    return () => clearTimeout(timer);
  }, [isActive, currentStepIndex, steps, onComplete, onStepComplete]);

  // Get color based on step type
  const getStepColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="glass-strong rounded-xl overflow-hidden shadow-2xl h-full flex flex-col">
      {/* Terminal Header */}
      <div className="bg-zinc-800/50 px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-300">Recovery Terminal</span>
        </div>
        <div className="flex gap-2">
          <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle className="w-3 h-3 fill-green-500 text-green-500" />
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto terminal-text bg-black/40 backdrop-blur-sm"
      >
        <div className="text-zinc-400 mb-4">
          macOS Recovery Simulator v1.0.0
          <br />
          Educational simulation - No real system modifications
          <br />
          <br />
        </div>

        <AnimatePresence>
          {displayedSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3"
            >
              {/* Command */}
              <div className="flex items-start gap-2 mb-1">
                <span className="text-green-400">$</span>
                <span className="text-zinc-300">{step.command}</span>
              </div>

              {/* Output */}
              <div className={cn('pl-4 mb-2', getStepColor(step.type))}>
                {step.output}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor */}
        {isActive && (
          <div className="flex items-center gap-2">
            <span className="text-green-400">$</span>
            <span
              className={cn(
                'inline-block w-2 h-4 bg-green-400',
                cursorBlink ? 'opacity-100' : 'opacity-0'
              )}
            ></span>
          </div>
        )}
      </div>
    </div>
  );
}
