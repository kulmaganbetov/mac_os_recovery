import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '@/context/SimulatorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Apple,
  Shield,
  HardDrive,
  Clock,
  Check,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

/**
 * Settings Page (Dashboard version)
 * Configure basic recovery scenario and system options
 */
export default function Settings() {
  const { config, updateConfig, getConfigurationWarnings } = useSimulator();
  const navigate = useNavigate();
  const [showSaved, setShowSaved] = useState(false);

  const warnings = getConfigurationWarnings();

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const macosVersions = [
    { id: 'Mojave', name: 'macOS Mojave', year: '2018' },
    { id: 'Catalina', name: 'macOS Catalina', year: '2019' },
    { id: 'Big Sur', name: 'macOS Big Sur', year: '2020' },
    { id: 'Monterey', name: 'macOS Monterey', year: '2021' },
    { id: 'Ventura', name: 'macOS Ventura', year: '2022' },
    { id: 'Sonoma', name: 'macOS Sonoma', year: '2023' }
  ];

  const scenarios = [
    {
      id: 'forgotten_password',
      title: 'Forgotten User Password',
      description: 'User cannot remember their login password',
      icon: Shield
    },
    {
      id: 'lost_admin',
      title: 'Lost Admin Access',
      description: 'No administrator accounts are accessible',
      icon: Apple
    },
    {
      id: 'account_corruption',
      title: 'Account Corruption',
      description: 'User account data is corrupted or damaged',
      icon: HardDrive
    },
    {
      id: 'post_update',
      title: 'Post-Update Login Failure',
      description: 'Login issues after macOS update',
      icon: Clock
    }
  ];

  const systemOptions = [
    {
      key: 'appleId',
      label: 'Apple ID Linked',
      description: 'User account is linked to an Apple ID',
      icon: Apple
    },
    {
      key: 'fileVault',
      label: 'FileVault Enabled',
      description: 'Disk encryption is active',
      icon: Shield
    },
    {
      key: 'recoveryMode',
      label: 'Recovery Mode Available',
      description: 'System can boot into Recovery Mode',
      icon: HardDrive
    },
    {
      key: 'timeMachine',
      label: 'Time Machine Backup',
      description: 'Backup data is available',
      icon: Clock
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Recovery Settings</h1>
          <p className="text-zinc-400">Configure recovery scenario and system options</p>
        </div>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30"
          >
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Settings Saved</span>
          </motion.div>
        )}
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {warnings.map((warning, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                warning.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-yellow-500/10 border-yellow-500/30'
              }`}
            >
              <div className="flex gap-3">
                <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                  warning.type === 'error' ? 'text-red-400' : 'text-yellow-400'
                }`} />
                <div className="flex-1">
                  <div className={`font-medium mb-1 ${
                    warning.type === 'error' ? 'text-red-300' : 'text-yellow-300'
                  }`}>
                    {warning.message}
                  </div>
                  <div className={`text-sm ${
                    warning.type === 'error' ? 'text-red-400/80' : 'text-yellow-400/80'
                  }`}>
                    💡 {warning.suggestion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* macOS Version Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="w-5 h-5" />
            Select macOS Version
          </CardTitle>
          <CardDescription>
            Different versions may have varying recovery procedures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {macosVersions.map((version) => (
              <button
                key={version.id}
                onClick={() => updateConfig({ macosVersion: version.id })}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  config.macosVersion === version.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">{version.id}</span>
                  {config.macosVersion === version.id && (
                    <Check className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <span className="text-xs text-zinc-400">{version.year}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scenario Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery Scenario</CardTitle>
          <CardDescription>
            Choose the type of recovery issue to simulate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => updateConfig({ scenario: scenario.id })}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  config.scenario === scenario.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    config.scenario === scenario.id
                      ? 'bg-blue-500/20'
                      : 'bg-white/5'
                  }`}>
                    <scenario.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white">{scenario.title}</h3>
                      {config.scenario === scenario.id && (
                        <Check className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-400">{scenario.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Options */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>
            Select available system features and backups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemOptions.map((option) => (
              <label
                key={option.key}
                className="flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={config.options[option.key]}
                  onChange={(e) =>
                    updateConfig({
                      options: {
                        [option.key]: e.target.checked
                      }
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <option.icon className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-white">{option.label}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard/advanced')}
        >
          Advanced Settings
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSave}>
            Save Settings
          </Button>
          <Button onClick={() => navigate('/dashboard/simulation')}>
            Continue to Simulation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
