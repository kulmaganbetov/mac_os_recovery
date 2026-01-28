import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import Terminal from '@/components/Terminal';
import Disclaimer from '@/components/Disclaimer';
import { fetchAPI, formatDuration } from '@/lib/utils';

/**
 * Simulation Page
 * Main simulation with terminal output and progress tracking
 */
export default function Simulation() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;

  const [simulationData, setSimulationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);

  // Redirect if no config
  useEffect(() => {
    if (!config) {
      navigate('/setup');
    }
  }, [config, navigate]);

  // Fetch simulation data
  useEffect(() => {
    if (!config) return;

    const fetchSimulation = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAPI('/api/simulate', {
          method: 'POST',
          body: JSON.stringify(config),
        });
        setSimulationData(data);
        setIsLoading(false);
        // Start simulation after a short delay
        setTimeout(() => setIsSimulating(true), 1000);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchSimulation();
  }, [config]);

  const handleStepComplete = (stepCount) => {
    setCompletedSteps(stepCount);
  };

  const handleSimulationComplete = () => {
    // Navigate to results after a short delay
    setTimeout(() => {
      navigate('/result', {
        state: {
          config,
          simulationData
        }
      });
    }, 2000);
  };

  if (!config) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black flex items-center justify-center">
        <Disclaimer />
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Initializing recovery simulation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black flex items-center justify-center">
        <Disclaimer />
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Simulation Error</h2>
          <p className="text-zinc-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/setup')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = simulationData
    ? (completedSteps / simulationData.steps.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <Disclaimer />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto pt-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Recovery in Progress
            </h1>
            <p className="text-zinc-400">
              {config.macosVersion} • {config.scenario.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Terminal - Left/Main Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 h-[600px]"
            >
              <Terminal
                steps={simulationData?.steps || []}
                isActive={isSimulating}
                onComplete={handleSimulationComplete}
                onStepComplete={handleStepComplete}
              />
            </motion.div>

            {/* Progress Panel - Right Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Overall Progress */}
              <div className="glass-strong rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Overall Progress</h3>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Completion</span>
                    <span className="text-white font-medium">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Total Steps</span>
                    <span className="text-white">{simulationData?.steps.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Completed</span>
                    <span className="text-white">{completedSteps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Estimated Time</span>
                    <span className="text-white">
                      {simulationData?.metadata?.estimatedTime
                        ? formatDuration(simulationData.metadata.estimatedTime)
                        : '-'}
                    </span>
                  </div>
                </div>
              </div>

              {/* System Configuration */}
              <div className="glass-strong rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">System Config</h3>
                <div className="space-y-3">
                  {config.options.appleId && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-zinc-300">Apple ID Linked</span>
                    </div>
                  )}
                  {config.options.fileVault && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-zinc-300">FileVault Enabled</span>
                    </div>
                  )}
                  {config.options.recoveryMode && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-zinc-300">Recovery Mode</span>
                    </div>
                  )}
                  {config.options.timeMachine && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-zinc-300">Time Machine Backup</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-center gap-3">
                  {isSimulating ? (
                    <>
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                      <div>
                        <p className="text-sm font-medium text-white">Running...</p>
                        <p className="text-xs text-zinc-400">Processing recovery steps</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-white">Preparing...</p>
                        <p className="text-xs text-zinc-400">Initializing simulation</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Step Details */}
              <div className="glass-strong rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-3">Recent Steps</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {simulationData?.steps.slice(0, completedSteps).slice(-5).reverse().map((step) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs p-2 rounded bg-white/5 border border-white/10"
                    >
                      <p className="text-zinc-300 font-medium mb-1">{step.command}</p>
                      <p className="text-zinc-500 truncate">{step.output}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
