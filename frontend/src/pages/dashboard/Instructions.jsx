import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '@/context/SimulatorContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Home,
  ExternalLink
} from 'lucide-react';
import { fetchAPI } from '@/lib/utils';

/**
 * Instructions Page (Dashboard version)
 * Dynamic post-recovery instructions based on simulation outcome
 */
export default function Instructions() {
  const navigate = useNavigate();
  const { config, latestResult } = useSimulator();
  const [instructions, setInstructions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructions = async () => {
      if (!latestResult) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchAPI('/api/instructions', {
          method: 'POST',
          body: JSON.stringify({
            scenario: config.scenario,
            result: latestResult.result,
            macosVersion: config.macosVersion,
            options: config.options
          }),
        });
        setInstructions(data);
      } catch (err) {
        console.error('Failed to fetch instructions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructions();
  }, [latestResult, config]);

  if (!latestResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Post-Recovery Instructions</h1>
          <p className="text-zinc-400">No simulation results available</p>
        </div>
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-zinc-400 mb-6">Run a simulation to see instructions here</p>
            <Button onClick={() => navigate('/dashboard/simulation')}>
              Run Simulation
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-zinc-400">Loading instructions...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Post-Recovery Instructions</h1>
        <p className="text-zinc-400">Follow these steps after completing the simulated recovery</p>
      </div>

      {/* Important Notice */}
      <div className="glass rounded-lg p-6 border border-blue-500/30">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-200 mb-2">Simulation Reminder</h3>
            <p className="text-sm text-blue-200/80 mb-2">
              These instructions describe what WOULD happen in a real recovery scenario.
            </p>
            <ul className="text-sm text-blue-200/70 space-y-1 list-disc list-inside">
              <li>No actual system modifications were made</li>
              <li>No passwords were reset</li>
              <li>This is for educational purposes only</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>{instructions?.title || 'Recovery Steps'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {instructions?.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-blue-400">{index + 1}</span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-white">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {instructions?.warnings && instructions.warnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <AlertTriangle className="w-5 h-5" />
              Important Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {instructions.warnings.map((warning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
                >
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-200 text-sm">{warning}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Tips */}
      {instructions?.tips && instructions.tips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Security Tips & Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {instructions.tips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-zinc-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Need Real Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-zinc-300">
              This simulator is for educational purposes only. If you need real password recovery assistance:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <a
                href="https://support.apple.com/en-us/HT202860"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div>
                  <div className="font-medium text-white mb-1">Apple Support</div>
                  <div className="text-sm text-zinc-400">Official password reset guide</div>
                </div>
                <ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </a>
              <a
                href="https://support.apple.com/en-us/HT201314"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div>
                  <div className="font-medium text-white mb-1">Recovery Mode</div>
                  <div className="text-sm text-zinc-400">How to use Recovery Mode</div>
                </div>
                <ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => navigate('/dashboard/overview')}
          className="group"
        >
          <Home className="mr-2 w-5 h-5" />
          Return to Dashboard
        </Button>
      </div>
    </motion.div>
  );
}
