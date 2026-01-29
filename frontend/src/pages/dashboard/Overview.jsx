import { motion } from 'framer-motion';
import { useSimulator } from '@/context/SimulatorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Apple,
  Cpu,
  Shield,
  HardDrive,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Key,
  User
} from 'lucide-react';

/**
 * System Overview Page
 * Displays current simulated system state with color-coded indicators
 */
export default function Overview() {
  const { config, getSystemStatus } = useSimulator();
  const systemStatus = getSystemStatus();

  // Status indicator component
  const StatusIndicator = ({ status, label }) => {
    const statusConfig = {
      active: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', icon: CheckCircle2 },
      inactive: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: XCircle },
      warning: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: AlertTriangle },
      info: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: CheckCircle2 }
    };

    const currentStatus = statusConfig[status] || statusConfig.info;
    const Icon = currentStatus.icon;

    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${currentStatus.bg} ${currentStatus.border}`}>
        <Icon className={`w-4 h-4 ${currentStatus.color}`} />
        <span className={`text-sm font-medium ${currentStatus.color}`}>{label}</span>
      </div>
    );
  };

  // System stats
  const stats = [
    {
      label: 'macOS Version',
      value: config.macosVersion,
      icon: Apple,
      color: 'text-blue-400'
    },
    {
      label: 'CPU Architecture',
      value: config.advanced.cpuArchitecture === 'apple_silicon' ? 'Apple Silicon' : 'Intel',
      icon: Cpu,
      color: 'text-purple-400'
    },
    {
      label: 'Security Level',
      value: config.advanced.securityLevel.toUpperCase(),
      icon: Shield,
      color: systemStatus.securityStatus === 'high' ? 'text-red-400' : systemStatus.securityStatus === 'low' ? 'text-green-400' : 'text-yellow-400'
    },
    {
      label: 'User Role',
      value: config.advanced.userRole === 'administrator' ? 'Administrator' : 'Standard User',
      icon: User,
      color: 'text-cyan-400'
    }
  ];

  // System features status
  const features = [
    {
      name: 'Recovery Mode',
      enabled: config.options.recoveryMode,
      description: 'System can boot into Recovery Mode'
    },
    {
      name: 'FileVault Encryption',
      enabled: config.options.fileVault,
      description: 'Full disk encryption is active'
    },
    {
      name: 'Apple ID Linked',
      enabled: config.options.appleId,
      description: 'User account linked to Apple ID'
    },
    {
      name: 'Time Machine Backup',
      enabled: config.options.timeMachine,
      description: 'Backup data available'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">System Overview</h1>
        <p className="text-zinc-400">Current simulated system configuration and status</p>
      </div>

      {/* Overall Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>System Status</span>
            <StatusIndicator
              status={systemStatus.isReady ? 'active' : 'warning'}
              label={systemStatus.isReady ? 'Ready for Recovery' : 'Configuration Needed'}
            />
          </CardTitle>
          <CardDescription>
            Overall readiness for password recovery simulation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white/5">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-xs text-zinc-400">{stat.label}</div>
                </div>
                <div className={`text-lg font-semibold ${stat.color}`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            System Features
          </CardTitle>
          <CardDescription>
            Enabled features and capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5"
              >
                <div className="flex items-center gap-3">
                  {feature.enabled ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <div>
                    <div className="font-medium text-white">{feature.name}</div>
                    <div className="text-sm text-zinc-400">{feature.description}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${feature.enabled ? 'text-green-400' : 'text-red-400'}`}>
                  {feature.enabled ? 'Enabled' : 'Disabled'}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Authentication Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Authentication Configuration
          </CardTitle>
          <CardDescription>
            How the system will authenticate during recovery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
              <div>
                <div className="font-medium text-white mb-1">Authentication Method</div>
                <div className="text-sm text-zinc-400">
                  {config.advanced.authMethod === 'apple_id' && 'Apple ID credentials'}
                  {config.advanced.authMethod === 'local_account' && 'Local account password'}
                  {config.advanced.authMethod === 'recovery_key' && 'FileVault recovery key'}
                </div>
              </div>
              <div className="text-blue-400 font-semibold">
                {config.advanced.authMethod.replace('_', ' ').toUpperCase()}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                <div className="text-sm text-zinc-400 mb-1">Recovery Scenario</div>
                <div className="font-medium text-white">
                  {config.scenario.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                <div className="text-sm text-zinc-400 mb-1">Security Clearance</div>
                <div className={`font-medium ${
                  systemStatus.securityStatus === 'high' ? 'text-red-400' :
                  systemStatus.securityStatus === 'low' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {systemStatus.securityStatus.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Navigate to key sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <a
              href="/dashboard/settings"
              className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all"
            >
              Modify Settings
            </a>
            <a
              href="/dashboard/advanced"
              className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-all"
            >
              Advanced Config
            </a>
            <a
              href="/dashboard/algorithm"
              className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all"
            >
              View Algorithm
            </a>
            <a
              href="/dashboard/simulation"
              className="px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 transition-all"
            >
              Run Simulation
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
