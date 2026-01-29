import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Shield,
  User,
  Key,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';

/**
 * Advanced Settings Page
 * Configure security level, user role, authentication method, and CPU architecture
 */
export default function AdvancedSettings() {
  const { config, updateConfig, getConfigurationWarnings } = useSimulator();
  const [showSaved, setShowSaved] = useState(false);

  const warnings = getConfigurationWarnings();

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const securityLevels = [
    {
      id: 'low',
      name: 'Low Security',
      description: 'Minimal security checks, faster recovery',
      color: 'green',
      icon: '🟢'
    },
    {
      id: 'medium',
      name: 'Medium Security',
      description: 'Balanced security and recovery speed',
      color: 'yellow',
      icon: '🟡'
    },
    {
      id: 'high',
      name: 'High Security',
      description: 'Maximum security, may require additional authentication',
      color: 'red',
      icon: '🔴'
    }
  ];

  const userRoles = [
    {
      id: 'standard',
      name: 'Standard User',
      description: 'Limited system privileges',
      icon: User
    },
    {
      id: 'administrator',
      name: 'Administrator',
      description: 'Full system access and privileges',
      icon: Shield
    }
  ];

  const authMethods = [
    {
      id: 'apple_id',
      name: 'Apple ID',
      description: 'Authenticate using Apple ID credentials',
      recommended: true
    },
    {
      id: 'local_account',
      name: 'Local Account',
      description: 'Use local account password',
      recommended: false
    },
    {
      id: 'recovery_key',
      name: 'Recovery Key',
      description: 'FileVault recovery key (if available)',
      recommended: false
    }
  ];

  const cpuArchitectures = [
    {
      id: 'intel',
      name: 'Intel x86',
      description: 'Intel-based Mac (pre-2020)',
      icon: '💻'
    },
    {
      id: 'apple_silicon',
      name: 'Apple Silicon',
      description: 'M1, M2, M3 chips (2020+)',
      icon: '🔷'
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
          <h1 className="text-3xl font-bold text-white mb-2">Advanced Settings</h1>
          <p className="text-zinc-400">Configure security, authentication, and system parameters</p>
        </div>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400" />
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

      {/* Security Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Level
          </CardTitle>
          <CardDescription>
            Affects recovery complexity and required authentication steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {securityLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => updateConfig({ advanced: { securityLevel: level.id } })}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  config.advanced.securityLevel === level.id
                    ? `border-${level.color}-500 bg-${level.color}-500/10`
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">{level.icon}</div>
                <div className="font-semibold text-white mb-1">{level.name}</div>
                <div className="text-sm text-zinc-400">{level.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Role
          </CardTitle>
          <CardDescription>
            System privileges of the user account being recovered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {userRoles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => updateConfig({ advanced: { userRole: role.id } })}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    config.advanced.userRole === role.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      config.advanced.userRole === role.id ? 'bg-blue-500/20' : 'bg-white/5'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        config.advanced.userRole === role.id ? 'text-blue-400' : 'text-zinc-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{role.name}</div>
                      <div className="text-sm text-zinc-400">{role.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Authentication Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Authentication Method
          </CardTitle>
          <CardDescription>
            How to authenticate during the recovery process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {authMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  config.advanced.authMethod === method.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="authMethod"
                    checked={config.advanced.authMethod === method.id}
                    onChange={() => updateConfig({ advanced: { authMethod: method.id } })}
                    className="w-4 h-4 text-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{method.name}</span>
                      {method.recommended && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-zinc-400 mt-0.5">{method.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CPU Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            CPU Architecture
          </CardTitle>
          <CardDescription>
            Processor type affects recovery boot process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {cpuArchitectures.map((arch) => (
              <button
                key={arch.id}
                onClick={() => updateConfig({ advanced: { cpuArchitecture: arch.id } })}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  config.advanced.cpuArchitecture === arch.id
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">{arch.icon}</div>
                <div className="font-semibold text-white mb-1">{arch.name}</div>
                <div className="text-sm text-zinc-400">{arch.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="glass rounded-lg p-6 border border-blue-500/30">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-200 mb-2">About Advanced Settings</h3>
            <p className="text-sm text-blue-200/80 mb-3">
              These settings affect how the recovery simulation behaves:
            </p>
            <ul className="text-sm text-blue-200/70 space-y-1 list-disc list-inside">
              <li>Higher security levels add more authentication steps</li>
              <li>Administrator role enables more recovery options</li>
              <li>Authentication method determines credential requirements</li>
              <li>CPU architecture affects boot sequence simulation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave}>
          <CheckCircle2 className="mr-2 w-5 h-5" />
          Save Advanced Settings
        </Button>
      </div>
    </motion.div>
  );
}
