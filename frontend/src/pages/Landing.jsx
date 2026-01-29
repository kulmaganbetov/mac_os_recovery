import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, GraduationCap } from 'lucide-react';
import Button from '@/components/ui/Button';
import MacBookMockup from '@/components/MacBookMockup';
import Disclaimer from '@/components/Disclaimer';

/**
 * Landing Page
 * Hero section with MacBook mockup and call-to-action
 */
export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Safe Simulation',
      description: 'No real system access or modifications'
    },
    {
      icon: Zap,
      title: 'Interactive Experience',
      description: 'Real-time terminal simulation with animations'
    },
    {
      icon: GraduationCap,
      title: 'Educational Purpose',
      description: 'Diploma-level demonstration project'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <Disclaimer />

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pt-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-400 text-sm font-medium">
              Educational Simulation Project
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            macOS Access Recovery
            <br />
            Simulator
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            An interactive, diploma-level web application demonstrating macOS password recovery processes through safe simulation
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="group"
            >
              Open Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/setup')}
              className="group"
            >
              Quick Start (Legacy)
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-sm text-zinc-500"
          >
            🆕 Try the new interactive dashboard for full features
          </motion.p>
        </motion.div>

        {/* MacBook Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <MacBookMockup>
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-8">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center"
                >
                  <Shield className="w-12 h-12 text-blue-400" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-2xl font-semibold text-white mb-3"
                >
                  Recovery Mode
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-zinc-400"
                >
                  Simulated macOS recovery environment
                </motion.p>
              </div>
            </div>
          </MacBookMockup>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="glass-strong rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-zinc-500 mb-3">Built with modern technologies</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-zinc-600">
            <span className="px-3 py-1 rounded-full bg-zinc-800/50">React</span>
            <span className="px-3 py-1 rounded-full bg-zinc-800/50">Vite</span>
            <span className="px-3 py-1 rounded-full bg-zinc-800/50">Tailwind CSS</span>
            <span className="px-3 py-1 rounded-full bg-zinc-800/50">Framer Motion</span>
            <span className="px-3 py-1 rounded-full bg-zinc-800/50">Node.js</span>
            <span className="px-3 py-1 rounded-full bg-zinc-800/50">Express</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
