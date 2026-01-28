import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Apple, HardDrive, Shield, Clock, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Disclaimer from '@/components/Disclaimer';

/**
 * Setup Page
 * User configures simulation parameters
 */
export default function Setup() {
  const navigate = useNavigate();

  const [config, setConfig] = useState({
    macosVersion: 'Sonoma',
    scenario: 'forgotten_password',
    options: {
      appleId: true,
      fileVault: true,
      recoveryMode: true,
      timeMachine: false
    }
  });

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

  const handleStartSimulation = () => {
    // Pass config to simulation page
    navigate('/simulation', { state: { config } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <Disclaimer />

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto pt-16"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Configure Recovery Scenario
            </motion.h1>
            <p className="text-zinc-400 text-lg">
              Customize the simulation parameters to match your learning needs
            </p>
          </div>

          {/* macOS Version Selection */}
          <Card className="mb-8">
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
                    onClick={() => setConfig({ ...config, macosVersion: version.id })}
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
          <Card className="mb-8">
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
                    onClick={() => setConfig({ ...config, scenario: scenario.id })}
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
          <Card className="mb-8">
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
                        setConfig({
                          ...config,
                          options: {
                            ...config.options,
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
              variant="ghost"
              onClick={() => navigate('/')}
              className="group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>

            <Button
              size="lg"
              onClick={handleStartSimulation}
              className="group"
            >
              Start Simulation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
