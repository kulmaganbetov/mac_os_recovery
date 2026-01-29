import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '@/context/SimulatorContext';
import Terminal from '@/components/Terminal';
import WarningDialog from '@/components/WarningDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Loader2,
  CheckCircle2,
  Clock,
  Play,
  Info,
  X,
  TrendingUp
} from 'lucide-react';
import { fetchAPI } from '@/lib/utils';

/**
 * Dashboard Simulation Page
 * Enhanced simulation with log explorer and dependency warnings
 */
export default function DashboardSimulation() {
  const navigate = useNavigate();
  const { config, getConfigurationWarnings, addToHistory, setCurrentSimulation } = useSimulator();

  const [simulationData, setSimulationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showWarnings, setShowWarnings] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  const warnings = getConfigurationWarnings();
  const hasErrors = warnings.some(w => w.type === 'error');

  // Check for warnings on mount
  useEffect(() => {
    if (warnings.length > 0 && !hasErrors) {
      setShowWarnings(true);
    } else if (hasErrors) {
      setShowWarnings(true);
    }
  }, []);

  const handleStartSimulation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchAPI('/api/simulate', {
        method: 'POST',
        body: JSON.stringify(config),
      });

      setSimulationData(data);
      setCurrentSimulation(data);
      setIsLoading(false);

      // Start simulation after a short delay
      setTimeout(() => setIsSimulating(true), 1000);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(stepIndex);
  };

  const handleSimulationComplete = () => {
    if (simulationData) {
      // Add to history
      addToHistory(simulationData, simulationData.result);

      // Navigate to results after a short delay
      setTimeout(() => {
        navigate('/dashboard/results');
      }, 2000);
    }
  };

  const handleStepClick = (step) => {
    setSelectedStep(selectedStep?.id === step.id ? null : step);
  };

  const getStepTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-blue-400';
    }
  };

  // Initial view with warnings
  if (!simulationData && !isLoading) {
    return (
      <>
        {showWarnings && (
          <WarningDialog
            warnings={warnings}
            onContinue={() => {
              setShowWarnings(false);
              if (!hasErrors) {
                handleStartSimulation();
              }
            }}
            onGoBack={() => navigate('/dashboard/settings')}
            onClose={() => {
              if (hasErrors) {
                navigate('/dashboard/settings');
              } else {
                setShowWarnings(false);
              }
            }}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Run Simulation</h1>
            <p className="text-zinc-400">Execute password recovery process with current configuration</p>
          </div>

          {/* Configuration Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Current Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">macOS Version</div>
                    <div className="text-white font-medium">{config.macosVersion}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">Scenario</div>
                    <div className="text-white font-medium">
                      {config.scenario.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">Security Level</div>
                    <div className="text-white font-medium capitalize">{config.advanced.securityLevel}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">User Role</div>
                    <div className="text-white font-medium capitalize">{config.advanced.userRole}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">Authentication</div>
                    <div className="text-white font-medium capitalize">
                      {config.advanced.authMethod.replace('_', ' ')}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">CPU Architecture</div>
                    <div className="text-white font-medium">
                      {config.advanced.cpuArchitecture === 'apple_silicon' ? 'Apple Silicon' : 'Intel'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-sm text-zinc-400 mb-2">System Options</div>
                <div className="flex flex-wrap gap-2">
                  {config.options.appleId && (
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      Apple ID
                    </span>
                  )}
                  {config.options.fileVault && (
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      FileVault
                    </span>
                  )}
                  {config.options.recoveryMode && (
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      Recovery Mode
                    </span>
                  )}
                  {config.options.timeMachine && (
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      Time Machine
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => setShowWarnings(true)}
              className="group"
            >
              <Play className="mr-2 w-5 h-5" />
              Start Simulation
            </Button>
          </div>
        </motion.div>
      </>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Preparing simulation...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Simulation Error</h3>
            <p className="text-zinc-400 mb-6">{error}</p>
            <Button onClick={() => navigate('/dashboard/settings')}>
              Back to Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Simulation view
  const progress = simulationData ? (completedSteps / simulationData.steps.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Recovery in Progress</h1>
        <p className="text-zinc-400">
          {config.macosVersion} • {config.scenario.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Terminal - Main Section */}
        <div className="lg:col-span-2 h-[600px]">
          <Terminal
            steps={simulationData?.steps || []}
            isActive={isSimulating}
            onComplete={handleSimulationComplete}
            onStepComplete={handleStepComplete}
          />
        </div>

        {/* Progress Panel - Right Section */}
        <div className="space-y-4">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Completion</span>
                    <span className="text-white font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Steps</span>
                  <span className="text-white font-mono">
                    {completedSteps} / {simulationData?.steps.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Status</span>
                  {isSimulating ? (
                    <span className="flex items-center gap-1 text-blue-400">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      Running
                    </span>
                  ) : completedSteps === simulationData?.steps.length ? (
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Complete
                    </span>
                  ) : (
                    <span className="text-zinc-500">Ready</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Recent Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {simulationData?.steps.slice(Math.max(0, completedSteps - 3), completedSteps).map((step) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step)}
                    className={`w-full text-left p-2 rounded-lg transition-all ${
                      selectedStep?.id === step.id
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`text-xs font-mono mt-0.5 ${getStepTypeColor(step.type)}`}>
                        #{step.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium truncate">{step.command}</div>
                        {selectedStep?.id === step.id && step.explanation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 pt-2 border-t border-white/10"
                          >
                            <p className="text-xs text-zinc-400">{step.explanation}</p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-200">
                    Click on any step to see what it does and why it's needed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
