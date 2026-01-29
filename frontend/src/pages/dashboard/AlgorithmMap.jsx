import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSimulator } from '@/context/SimulatorContext';
import {
  Search,
  Shield,
  HardDrive,
  Key,
  RotateCw,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';

/**
 * Algorithm Map Page
 * Visual representation of the recovery process flow
 */
export default function AlgorithmMap() {
  const { config } = useSimulator();
  const [selectedStage, setSelectedStage] = useState(null);

  // Recovery stages with conditions
  const stages = [
    {
      id: 'system_check',
      name: 'System Check',
      icon: Search,
      color: 'blue',
      description: 'Initial system detection and validation',
      steps: [
        'Detect macOS version',
        'Identify CPU architecture',
        'Check system integrity',
        'Verify boot capabilities'
      ],
      triggers: ['Always executed first'],
      conditions: []
    },
    {
      id: 'security_layer',
      name: 'Security Layer',
      icon: Shield,
      color: 'yellow',
      description: 'Security evaluation and encryption checks',
      steps: [
        'Check FileVault status',
        'Evaluate security level',
        'Verify user permissions',
        'Assess encryption requirements'
      ],
      triggers: [
        config.options.fileVault && 'FileVault enabled',
        config.advanced.securityLevel !== 'low' && 'Medium/High security'
      ].filter(Boolean),
      conditions: [
        { met: config.options.fileVault, label: 'FileVault Check' },
        { met: config.advanced.securityLevel === 'high', label: 'High Security Mode' }
      ]
    },
    {
      id: 'recovery_env',
      name: 'Recovery Environment',
      icon: HardDrive,
      color: 'purple',
      description: 'Boot into recovery mode and load tools',
      steps: [
        'Boot into Recovery Mode',
        'Load recovery utilities',
        'Mount system volume',
        'Initialize recovery tools'
      ],
      triggers: [
        config.options.recoveryMode && 'Recovery Mode available'
      ].filter(Boolean),
      conditions: [
        { met: config.options.recoveryMode, label: 'Recovery Mode Available' }
      ]
    },
    {
      id: 'authentication',
      name: 'Authentication',
      icon: Key,
      color: 'green',
      description: 'User verification and credential validation',
      steps: [
        config.advanced.authMethod === 'apple_id' && 'Verify Apple ID',
        config.advanced.authMethod === 'local_account' && 'Check local credentials',
        config.advanced.authMethod === 'recovery_key' && 'Validate recovery key',
        'Authenticate user identity',
        'Verify account ownership'
      ].filter(Boolean),
      triggers: [
        config.options.appleId && config.advanced.authMethod === 'apple_id' && 'Apple ID authentication',
        config.advanced.authMethod === 'recovery_key' && 'Recovery key method'
      ].filter(Boolean),
      conditions: [
        { met: config.options.appleId, label: 'Apple ID Linked' },
        { met: config.advanced.authMethod !== 'local_account', label: 'Advanced Auth' }
      ]
    },
    {
      id: 'password_reset',
      name: 'Password Reset',
      icon: RotateCw,
      color: 'orange',
      description: 'Reset user password and update credentials',
      steps: [
        'Unlock user account',
        'Generate new password',
        'Update keychain',
        'Sync credentials',
        'Verify password change'
      ],
      triggers: [
        config.scenario === 'forgotten_password' && 'Forgotten password scenario',
        config.scenario === 'lost_admin' && 'Admin recovery needed'
      ].filter(Boolean),
      conditions: [
        { met: config.advanced.userRole === 'administrator', label: 'Admin Privileges' }
      ]
    },
    {
      id: 'completion',
      name: 'Completion',
      icon: CheckCircle2,
      color: 'green',
      description: 'Finalize recovery and prepare system restart',
      steps: [
        'Verify password reset',
        'Update system logs',
        'Clear recovery flags',
        'Prepare for reboot',
        'Generate recovery report'
      ],
      triggers: ['Always executed last'],
      conditions: []
    }
  ];

  const getStageStatus = (stage) => {
    // Check if stage conditions are met
    if (stage.conditions.length === 0) return 'active';
    const allMet = stage.conditions.every(c => c.met);
    return allMet ? 'active' : 'conditional';
  };

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      hover: 'hover:bg-blue-500/20'
    },
    yellow: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      hover: 'hover:bg-yellow-500/20'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      hover: 'hover:bg-purple-500/20'
    },
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      hover: 'hover:bg-green-500/20'
    },
    orange: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      hover: 'hover:bg-orange-500/20'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Algorithm Overview</h1>
        <p className="text-zinc-400">Interactive visualization of the recovery process flow</p>
      </div>

      {/* Info Banner */}
      <div className="glass rounded-lg p-4 border border-blue-500/30">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-200 text-sm">
              Click on any stage to see detailed steps. Stages are color-coded based on your current configuration.
              Conditional stages may be skipped based on system settings.
            </p>
          </div>
        </div>
      </div>

      {/* Recovery Flow Diagram */}
      <div className="relative">
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const colors = colorClasses[stage.color];
            const status = getStageStatus(stage);
            const isSelected = selectedStage?.id === stage.id;

            return (
              <div key={stage.id}>
                <motion.button
                  onClick={() => setSelectedStage(isSelected ? null : stage)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-6 rounded-xl border-2 transition-all ${colors.bg} ${colors.border} ${colors.hover} ${
                    isSelected ? 'ring-2 ring-offset-2 ring-offset-zinc-900' : ''
                  } ${
                    status === 'conditional' ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Stage Number */}
                    <div className={`w-10 h-10 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                      <span className={`font-bold ${colors.text}`}>{index + 1}</span>
                    </div>

                    {/* Icon */}
                    <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    {/* Stage Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold text-lg ${colors.text}`}>{stage.name}</h3>
                        {status === 'conditional' && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            Conditional
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400">{stage.description}</p>
                      {stage.triggers.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {stage.triggers.map((trigger, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-zinc-500">
                              ⚡ {trigger}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Expand Indicator */}
                    <motion.div
                      animate={{ rotate: isSelected ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className={`w-5 h-5 ${colors.text}`} />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Expanded Details */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 ml-14 glass rounded-lg p-6 border border-white/10"
                  >
                    <h4 className="font-semibold text-white mb-3">Process Steps:</h4>
                    <ul className="space-y-2">
                      {stage.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>

                    {stage.conditions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h4 className="font-semibold text-white mb-2 text-sm">Conditions:</h4>
                        <div className="space-y-1">
                          {stage.conditions.map((condition, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              {condition.met ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-zinc-600" />
                              )}
                              <span className={condition.met ? 'text-green-400' : 'text-zinc-500'}>
                                {condition.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Connector Arrow */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="glass rounded-lg p-6 border border-white/10">
        <h3 className="font-semibold text-white mb-4">Legend</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-sm text-zinc-400">Always executed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-sm text-zinc-400">Conditional (may be skipped)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-zinc-600" />
            <span className="text-sm text-zinc-400">Condition not met</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
