import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Settings,
  Sliders,
  Play,
  FileText,
  BookOpen,
  GitBranch,
  History,
  Apple
} from 'lucide-react';
import Disclaimer from './Disclaimer';

/**
 * Dashboard Layout Component
 * Central hub for navigating between all simulator sections
 */
export default function DashboardLayout() {
  const location = useLocation();

  const navItems = [
    {
      path: '/dashboard/overview',
      label: 'System Overview',
      icon: LayoutDashboard,
      description: 'View current configuration'
    },
    {
      path: '/dashboard/settings',
      label: 'Recovery Settings',
      icon: Settings,
      description: 'Configure recovery scenario'
    },
    {
      path: '/dashboard/advanced',
      label: 'Advanced Settings',
      icon: Sliders,
      description: 'Security & authentication'
    },
    {
      path: '/dashboard/algorithm',
      label: 'Algorithm Overview',
      icon: GitBranch,
      description: 'Visual recovery flow'
    },
    {
      path: '/dashboard/simulation',
      label: 'Run Simulation',
      icon: Play,
      description: 'Execute recovery process'
    },
    {
      path: '/dashboard/history',
      label: 'Simulation History',
      icon: History,
      description: 'View past runs'
    },
    {
      path: '/dashboard/results',
      label: 'Results & Analysis',
      icon: FileText,
      description: 'Analyze outcomes'
    },
    {
      path: '/dashboard/instructions',
      label: 'Instructions',
      icon: BookOpen,
      description: 'Post-recovery steps'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <Disclaimer />

      <div className="flex pt-12">
        {/* Sidebar Navigation */}
        <aside className="w-72 min-h-screen border-r border-white/10 bg-black/20 backdrop-blur-sm fixed left-0 top-12 overflow-y-auto">
          <div className="p-6">
            {/* Logo/Title */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Recovery Hub</h2>
                  <p className="text-xs text-zinc-500">Simulator Dashboard</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="block relative"
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-500/20 border border-blue-500/50'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          isActive ? 'text-blue-400' : 'text-zinc-400'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-medium text-sm mb-0.5 ${
                            isActive ? 'text-blue-300' : 'text-zinc-300'
                          }`}
                        >
                          {item.label}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r"
                        />
                      )}
                    </motion.div>
                  </NavLink>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-xs text-zinc-500 space-y-1">
                <p>📚 Educational Simulation</p>
                <p>🔒 No Real System Access</p>
                <p>✨ Diploma Project 2024</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72 min-h-screen">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
