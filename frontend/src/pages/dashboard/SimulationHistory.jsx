import { motion } from 'framer-motion';
import { useSimulator } from '@/context/SimulatorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  History,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  RotateCcw,
  Trash2,
  Calendar,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Simulation History Page
 * View and manage past simulation runs
 */
export default function SimulationHistory() {
  const { history, loadFromHistory, clearHistory, updateConfig } = useSimulator();
  const navigate = useNavigate();

  const handleRerun = (historyEntry) => {
    loadFromHistory(historyEntry);
    navigate('/dashboard/simulation');
  };

  const handleLoadConfig = (historyEntry) => {
    loadFromHistory(historyEntry);
    navigate('/dashboard/settings');
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getResultIcon = (success) => {
    return success ? CheckCircle2 : XCircle;
  };

  const getResultColor = (success) => {
    return success ? 'green' : 'red';
  };

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Simulation History</h1>
          <p className="text-zinc-400">View and re-run previous simulations</p>
        </div>

        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <History className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Simulation History</h3>
              <p className="text-zinc-400 mb-6">
                Run your first simulation to see it appear here
              </p>
              <Button onClick={() => navigate('/dashboard/simulation')}>
                Run First Simulation
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Simulation History</h1>
          <p className="text-zinc-400">Last {history.length} simulation runs</p>
        </div>
        {history.length > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('Are you sure you want to clear all simulation history?')) {
                clearHistory();
              }
            }}
            className="group"
          >
            <Trash2 className="w-4 h-4 mr-2 group-hover:text-red-400 transition-colors" />
            Clear History
          </Button>
        )}
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.map((entry, index) => {
          const ResultIcon = getResultIcon(entry.success);
          const resultColor = getResultColor(entry.success);

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:border-white/20 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    {/* Result Indicator */}
                    <div className={`p-3 rounded-lg bg-${resultColor}-500/10 border border-${resultColor}-500/30`}>
                      <ResultIcon className={`w-6 h-6 text-${resultColor}-400`} />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">
                              {entry.config.scenario.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h3>
                            <span className={`px-2 py-0.5 text-xs rounded-full bg-${resultColor}-500/20 text-${resultColor}-400 border border-${resultColor}-500/30`}>
                              {entry.result.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-zinc-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(entry.timestamp)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {entry.stepsCount} steps
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Configuration Summary */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-zinc-500">macOS:</span>{' '}
                            <span className="text-white">{entry.config.macosVersion}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-zinc-500">Security:</span>{' '}
                            <span className="text-white capitalize">{entry.config.advanced?.securityLevel || 'Medium'}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-zinc-500">User Role:</span>{' '}
                            <span className="text-white capitalize">{entry.config.advanced?.userRole || 'Standard'}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-zinc-500">CPU:</span>{' '}
                            <span className="text-white">
                              {entry.config.advanced?.cpuArchitecture === 'apple_silicon' ? 'Apple Silicon' : 'Intel'}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-zinc-500">Auth:</span>{' '}
                            <span className="text-white capitalize">
                              {(entry.config.advanced?.authMethod || 'apple_id').replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* System Options */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {entry.config.options.appleId && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            Apple ID
                          </span>
                        )}
                        {entry.config.options.fileVault && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            FileVault
                          </span>
                        )}
                        {entry.config.options.recoveryMode && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            Recovery Mode
                          </span>
                        )}
                        {entry.config.options.timeMachine && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            Time Machine
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleRerun(entry)}
                          className="group"
                        >
                          <RotateCcw className="w-4 h-4 mr-1 group-hover:rotate-180 transition-transform duration-500" />
                          Re-run
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLoadConfig(entry)}
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Load Config
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Info */}
      <div className="glass rounded-lg p-4 border border-blue-500/30">
        <p className="text-blue-200 text-sm">
          💡 History is stored locally and limited to the last 5 simulations.
          Click "Re-run" to execute the same configuration again, or "Load Config" to modify settings before running.
        </p>
      </div>
    </motion.div>
  );
}
