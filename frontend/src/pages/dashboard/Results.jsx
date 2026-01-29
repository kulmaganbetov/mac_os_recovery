import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '@/context/SimulatorContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Shield,
  User,
  Key
} from 'lucide-react';

/**
 * Results Page (Dashboard version)
 * Shows simulation outcome with "Why This Result?" analysis
 */
export default function Results() {
  const navigate = useNavigate();
  const { config, latestResult } = useSimulator();
  const [showAnalysis, setShowAnalysis] = useState(false);

  if (!latestResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Results & Analysis</h1>
          <p className="text-zinc-400">No simulation results available</p>
        </div>
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-zinc-400 mb-6">Run a simulation to see results here</p>
            <Button onClick={() => navigate('/dashboard/simulation')}>
              Run Simulation
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const { simulationData, result } = latestResult;

  const resultConfig = {
    success: {
      icon: CheckCircle2,
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      title: 'Recovery Successful',
      subtitle: 'The simulated recovery process completed successfully'
    },
    partial: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      title: 'Partial Recovery',
      subtitle: 'Recovery completed with some limitations'
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      title: 'Recovery with Warnings',
      subtitle: 'Recovery completed but additional steps recommended'
    },
    error: {
      icon: XCircle,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      title: 'Recovery Failed',
      subtitle: 'The simulated recovery process encountered errors'
    }
  };

  const currentResult = resultConfig[result] || resultConfig.success;
  const ResultIcon = currentResult.icon;

  // Analyze why this result occurred
  const analyzeResult = () => {
    const factors = [];
    const suggestions = [];

    // Positive factors
    if (config.options.recoveryMode) {
      factors.push({
        type: 'positive',
        text: 'Recovery Mode was available',
        icon: CheckCircle2
      });
    }

    if (config.options.appleId && config.advanced.authMethod === 'apple_id') {
      factors.push({
        type: 'positive',
        text: 'Apple ID authentication was configured',
        icon: CheckCircle2
      });
    }

    if (config.advanced.userRole === 'administrator') {
      factors.push({
        type: 'positive',
        text: 'Administrator privileges were available',
        icon: CheckCircle2
      });
    }

    // Negative factors
    if (!config.options.recoveryMode && result !== 'success') {
      factors.push({
        type: 'negative',
        text: 'Recovery Mode was disabled',
        icon: XCircle
      });
      suggestions.push('Enable Recovery Mode for better recovery options');
    }

    if (config.advanced.securityLevel === 'high' && result !== 'success') {
      factors.push({
        type: 'negative',
        text: 'High security level required additional authentication',
        icon: Shield
      });
      suggestions.push('Consider using medium security level for easier recovery');
    }

    if (!config.options.appleId && config.advanced.authMethod === 'apple_id') {
      factors.push({
        type: 'negative',
        text: 'Apple ID was required but not configured',
        icon: XCircle
      });
      suggestions.push('Link an Apple ID or change authentication method');
    }

    if (config.advanced.userRole === 'standard' && config.scenario === 'lost_admin') {
      factors.push({
        type: 'negative',
        text: 'Standard user cannot recover admin access directly',
        icon: User
      });
      suggestions.push('Use an administrator account for admin recovery');
    }

    // Neutral factors
    if (config.options.timeMachine) {
      factors.push({
        type: 'neutral',
        text: 'Time Machine backup was available',
        icon: AlertTriangle
      });
    }

    if (config.options.fileVault) {
      factors.push({
        type: 'neutral',
        text: 'FileVault encryption added security complexity',
        icon: Shield
      });
    }

    // Add suggestions to improve
    if (result === 'success') {
      suggestions.push('Configuration was optimal for this scenario');
      suggestions.push('Try different scenarios to explore other recovery paths');
    } else {
      if (!config.options.timeMachine) {
        suggestions.push('Enable Time Machine backup for additional recovery options');
      }
      if (config.advanced.securityLevel === 'low' && result !== 'error') {
        suggestions.push('Increase security level to see more authentication steps');
      }
    }

    return { factors, suggestions };
  };

  const analysis = analyzeResult();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Results & Analysis</h1>
        <p className="text-zinc-400">Simulation outcome and performance analysis</p>
      </div>

      {/* Result Status */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className={`w-24 h-24 mx-auto mb-6 rounded-full ${currentResult.bgColor} ${currentResult.borderColor} border-2 flex items-center justify-center`}
          >
            <ResultIcon className={`w-12 h-12 ${currentResult.iconColor}`} />
          </motion.div>

          <h2 className="text-4xl font-bold text-white mb-3">{currentResult.title}</h2>
          <p className="text-lg text-zinc-400 mb-2">{currentResult.subtitle}</p>
          <p className="text-zinc-500">{simulationData.message}</p>
        </motion.div>
      </div>

      {/* Simulation Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Simulation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-zinc-400 mb-1">macOS Version</p>
              <p className="text-white font-medium">{config.macosVersion}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Scenario</p>
              <p className="text-white font-medium">
                {config.scenario.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Steps Completed</p>
              <p className="text-white font-medium">{simulationData.steps.length}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Final Status</p>
              <p className={`font-medium ${currentResult.iconColor}`}>
                {result.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-zinc-400 mb-3">Configuration</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Security Level:</span>
                  <span className="text-white capitalize">{config.advanced.securityLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">User Role:</span>
                  <span className="text-white capitalize">{config.advanced.userRole}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Auth Method:</span>
                  <span className="text-white capitalize">{config.advanced.authMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">CPU:</span>
                  <span className="text-white">
                    {config.advanced.cpuArchitecture === 'apple_silicon' ? 'Apple Silicon' : 'Intel'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-3">System Options</p>
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
          </div>
        </CardContent>
      </Card>

      {/* Why This Result? Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => setShowAnalysis(!showAnalysis)}
          variant={showAnalysis ? 'outline' : 'default'}
          className="group"
        >
          <HelpCircle className="mr-2 w-5 h-5" />
          {showAnalysis ? 'Hide Analysis' : 'Why This Result?'}
        </Button>
      </div>

      {/* Analysis Panel */}
      <AnimatePresence>
        {showAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            {/* Contributing Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Contributing Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.factors.map((factor, index) => {
                    const Icon = factor.icon;
                    const colorClass = factor.type === 'positive' ? 'text-green-400' :
                                      factor.type === 'negative' ? 'text-red-400' : 'text-yellow-400';
                    const bgClass = factor.type === 'positive' ? 'bg-green-500/10' :
                                   factor.type === 'negative' ? 'bg-red-500/10' : 'bg-yellow-500/10';

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-3 rounded-lg ${bgClass}`}
                      >
                        <Icon className={`w-5 h-5 ${colorClass}`} />
                        <span className="text-white">{factor.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Suggestions for Different Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-zinc-300"
                    >
                      <span className="text-blue-400 mt-1">→</span>
                      <span>{suggestion}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          onClick={() => navigate('/dashboard/instructions')}
          className="flex-1 group"
        >
          View Recovery Instructions
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate('/dashboard/settings')}
          className="group"
        >
          <RotateCcw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          New Simulation
        </Button>
      </div>
    </motion.div>
  );
}
