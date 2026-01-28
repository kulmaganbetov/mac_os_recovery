import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  RotateCcw,
  Loader2
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Disclaimer from '@/components/Disclaimer';
import { fetchAPI } from '@/lib/utils';

/**
 * Instructions Page
 * Post-recovery instructions based on scenario
 */
export default function Instructions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { config, simulationData } = location.state || {};

  const [instructions, setInstructions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if no data
  useEffect(() => {
    if (!config || !simulationData) {
      navigate('/setup');
    }
  }, [config, simulationData, navigate]);

  // Fetch instructions
  useEffect(() => {
    if (!config || !simulationData) return;

    const fetchInstructions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAPI('/api/instructions', {
          method: 'POST',
          body: JSON.stringify({
            scenario: config.scenario,
            result: simulationData.result,
            macosVersion: config.macosVersion,
            options: config.options
          }),
        });
        setInstructions(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching instructions:', err);
        setIsLoading(false);
      }
    };

    fetchInstructions();
  }, [config, simulationData]);

  if (!config || !simulationData) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black flex items-center justify-center">
        <Disclaimer />
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading instructions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <Disclaimer />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto pt-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Post-Recovery Instructions
            </h1>
            <p className="text-lg text-zinc-400">
              Follow these steps to complete the recovery process
            </p>
          </motion.div>

          {/* Main Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  {instructions?.title || 'Recovery Steps'}
                </CardTitle>
                <CardDescription>
                  Complete these steps in order for {config.macosVersion}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {instructions?.steps?.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex gap-4 p-4 rounded-lg glass hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-white leading-relaxed">{step}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-1.5" />
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>

          {/* Warnings */}
          {instructions?.warnings && instructions.warnings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <AlertTriangle className="w-5 h-5" />
                    Important Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {instructions.warnings.map((warning, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="flex gap-3 text-yellow-200/90"
                      >
                        <span className="text-yellow-400 flex-shrink-0">•</span>
                        <span>{warning}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Security Tips */}
          {instructions?.tips && instructions.tips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <Card className="border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Lightbulb className="w-5 h-5" />
                    Security Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {instructions.tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="flex gap-3 text-blue-200/90"
                      >
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Educational Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <div className="glass rounded-lg p-6 border border-purple-500/30">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-purple-200 mb-2">For Real Recovery</h3>
                  <p className="text-sm text-purple-200/80 mb-3">
                    These instructions are based on the simulation. For actual macOS recovery:
                  </p>
                  <ul className="text-sm text-purple-200/70 space-y-1 list-disc list-inside">
                    <li>Always use official Apple Support resources</li>
                    <li>Visit support.apple.com for authorized guidance</li>
                    <li>Contact Apple Support for critical issues</li>
                    <li>Never use unauthorized third-party tools</li>
                    <li>Back up your data regularly with Time Machine</li>
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
              onClick={() => navigate('/')}
              className="flex-1 group"
            >
              <Home className="mr-2 w-5 h-5" />
              Back to Home
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

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-zinc-500 mb-2">Official Apple Resources</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <a
                href="https://support.apple.com/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Mac Support
              </a>
              <a
                href="https://support.apple.com/mac-backup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Backup Guide
              </a>
              <a
                href="https://support.apple.com/recovery-mode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Recovery Mode
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
