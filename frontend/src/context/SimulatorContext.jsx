import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Simulator Context
 * Global state management for simulator configuration and history
 */
const SimulatorContext = createContext();

export function useSimulator() {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within SimulatorProvider');
  }
  return context;
}

export function SimulatorProvider({ children }) {
  // Basic Configuration
  const [config, setConfig] = useState({
    macosVersion: 'Sonoma',
    scenario: 'forgotten_password',
    options: {
      appleId: true,
      fileVault: true,
      recoveryMode: true,
      timeMachine: false
    },
    // Advanced Configuration
    advanced: {
      securityLevel: 'medium', // low, medium, high
      userRole: 'standard', // standard, administrator
      authMethod: 'apple_id', // apple_id, local_account, recovery_key
      cpuArchitecture: 'apple_silicon' // intel, apple_silicon
    }
  });

  // Simulation History (last 5 runs)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('simulator_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Current Simulation Data
  const [currentSimulation, setCurrentSimulation] = useState(null);

  // Latest Result
  const [latestResult, setLatestResult] = useState(null);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('simulator_history', JSON.stringify(history));
  }, [history]);

  // Update configuration (partial updates)
  const updateConfig = (updates) => {
    setConfig(prev => ({
      ...prev,
      ...updates,
      options: { ...prev.options, ...updates.options },
      advanced: { ...prev.advanced, ...updates.advanced }
    }));
  };

  // Add simulation to history
  const addToHistory = (simulationData, result) => {
    const historyEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      config: { ...config },
      result,
      stepsCount: simulationData?.steps?.length || 0,
      success: result === 'success'
    };

    setHistory(prev => [historyEntry, ...prev].slice(0, 5)); // Keep last 5
    setLatestResult({ simulationData, result, config });
  };

  // Load configuration from history
  const loadFromHistory = (historyEntry) => {
    setConfig(historyEntry.config);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('simulator_history');
  };

  // Derive system status from config
  const getSystemStatus = () => {
    const { advanced, options } = config;

    // Calculate security status
    let securityStatus = 'medium';
    if (advanced.securityLevel === 'high' && options.fileVault) {
      securityStatus = 'high';
    } else if (advanced.securityLevel === 'low' && !options.fileVault) {
      securityStatus = 'low';
    }

    // Calculate readiness
    const isReady = options.recoveryMode && (
      options.appleId || advanced.authMethod === 'local_account'
    );

    return {
      securityStatus,
      isReady,
      hasBackup: options.timeMachine,
      isEncrypted: options.fileVault,
      authConfigured: options.appleId || advanced.authMethod !== 'apple_id'
    };
  };

  // Validate configuration and get warnings
  const getConfigurationWarnings = () => {
    const warnings = [];
    const { advanced, options } = config;

    // High security without Apple ID
    if (advanced.securityLevel === 'high' && !options.appleId && advanced.authMethod === 'apple_id') {
      warnings.push({
        type: 'error',
        message: 'High security level requires Apple ID authentication',
        suggestion: 'Enable Apple ID or change authentication method'
      });
    }

    // FileVault without recovery key
    if (options.fileVault && advanced.authMethod === 'recovery_key' && !options.appleId) {
      warnings.push({
        type: 'warning',
        message: 'FileVault enabled with recovery key only',
        suggestion: 'Ensure recovery key is available'
      });
    }

    // No recovery mode
    if (!options.recoveryMode) {
      warnings.push({
        type: 'error',
        message: 'Recovery Mode is disabled',
        suggestion: 'Enable Recovery Mode to proceed'
      });
    }

    // Admin operations on standard user
    if (advanced.userRole === 'standard' && config.scenario === 'lost_admin') {
      warnings.push({
        type: 'error',
        message: 'Cannot recover admin access from standard user',
        suggestion: 'Change scenario or user role'
      });
    }

    // No backup for corruption scenario
    if (config.scenario === 'account_corruption' && !options.timeMachine) {
      warnings.push({
        type: 'warning',
        message: 'No Time Machine backup available for account corruption',
        suggestion: 'Consider enabling Time Machine backup'
      });
    }

    return warnings;
  };

  const value = {
    config,
    setConfig,
    updateConfig,
    history,
    addToHistory,
    loadFromHistory,
    clearHistory,
    currentSimulation,
    setCurrentSimulation,
    latestResult,
    setLatestResult,
    getSystemStatus,
    getConfigurationWarnings
  };

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
}
