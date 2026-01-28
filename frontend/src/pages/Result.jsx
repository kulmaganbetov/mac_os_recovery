import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Disclaimer from '@/components/Disclaimer';
import { useEffect } from 'react';

/**
 * Result Page
 * Displays simulation outcome with status indicators
 */
export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { config, simulationData } = location.state || {};

  // Redirect if no data
  useEffect(() => {
    if (!config || !simulationData) {
      navigate('/setup');
    }
  }, [config, simulationData, navigate]);

  if (!config || !simulationData) {
    return null;
  }

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

  const currentResult = resultConfig[simulationData.result] || resultConfig.success;
  const ResultIcon = currentResult.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <Disclaimer />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto pt-16">
          {/* Result Status */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={`w-24 h-24 mx-auto mb-6 rounded-full ${currentResult.bgColor} ${currentResult.borderColor} border-2 flex items-center justify-center`}
            >
              <ResultIcon className={`w-12 h-12 ${currentResult.iconColor}`} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white mb-3"
            >
              {currentResult.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-400 mb-2"
            >
              {currentResult.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-zinc-500"
            >
              {simulationData.message}
            </motion.p>
          </motion.div>

          {/* Simulation Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Simulation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
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
                    <p className="text-sm text-zinc-400 mb-1">Status</p>
                    <p className={`font-medium ${currentResult.iconColor}`}>
                      {simulationData.result.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* System Options Used */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-zinc-400 mb-3">System Configuration</p>
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
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <div className="glass rounded-lg p-6 border border-yellow-500/30">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-200 mb-2">Simulation Reminder</h3>
                  <p className="text-sm text-yellow-200/80 mb-2">
                    This was a simulated recovery process for educational purposes.
                  </p>
                  <ul className="text-sm text-yellow-200/70 space-y-1 list-disc list-inside">
                    <li>No real system modifications were made</li>
                    <li>No actual passwords were reset</li>
                    <li>All processes were simulated by the backend API</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate('/instructions', { state: { config, simulationData } })}
              className="flex-1 group"
            >
              View Recovery Instructions
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/setup')}
              className="group"
            >
              <RotateCcw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              New Simulation
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
