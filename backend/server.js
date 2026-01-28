/**
 * macOS Recovery Simulator - Backend API
 *
 * EDUCATIONAL SIMULATION ONLY
 * This server provides simulated recovery process data.
 * No real system operations are performed.
 */

import express from 'express';
import cors from 'cors';
import { generateSimulation, getInstructions } from './simulationEngine.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Simulation-Warning', 'EDUCATIONAL-SIMULATION-ONLY');
  next();
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'macOS Recovery Simulator API',
    warning: 'SIMULATION ONLY - NO REAL SYSTEM ACCESS',
    timestamp: new Date().toISOString()
  });
});

/**
 * Main simulation endpoint
 * Generates recovery process steps based on user configuration
 */
app.post('/api/simulate', (req, res) => {
  try {
    const { macosVersion, scenario, options } = req.body;

    // Validate input
    const validVersions = ['Mojave', 'Catalina', 'Big Sur', 'Monterey', 'Ventura', 'Sonoma'];
    const validScenarios = ['forgotten_password', 'lost_admin', 'account_corruption', 'post_update'];

    if (!validVersions.includes(macosVersion)) {
      return res.status(400).json({
        error: 'Invalid macOS version',
        validVersions
      });
    }

    if (!validScenarios.includes(scenario)) {
      return res.status(400).json({
        error: 'Invalid scenario',
        validScenarios
      });
    }

    // Generate simulation
    const simulation = generateSimulation({
      macosVersion,
      scenario,
      options: options || {}
    });

    // Log for development
    console.log(`[SIMULATION] Generated for ${macosVersion} - ${scenario}`);

    res.json({
      ...simulation,
      disclaimer: 'This is a simulated process. No real system modifications were made.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({
      error: 'Simulation generation failed',
      message: error.message
    });
  }
});

/**
 * Instructions endpoint
 * Provides post-recovery instructions based on scenario
 */
app.post('/api/instructions', (req, res) => {
  try {
    const { scenario, result, macosVersion, options } = req.body;

    const instructions = getInstructions({
      scenario,
      result,
      macosVersion,
      options: options || {}
    });

    res.json({
      ...instructions,
      disclaimer: 'These instructions are for educational simulation purposes only.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Instructions error:', error);
    res.status(500).json({
      error: 'Instructions generation failed',
      message: error.message
    });
  }
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'POST /api/simulate',
      'POST /api/instructions'
    ]
  });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  macOS Recovery Simulator - Backend API                  ║');
  console.log('║  EDUCATIONAL SIMULATION ONLY                              ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('');
  console.log('📋 Available endpoints:');
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/simulate`);
  console.log(`   POST http://localhost:${PORT}/api/instructions`);
  console.log('');
  console.log('⚠️  REMINDER: This is a simulation. No real system access.');
  console.log('');
});

export default app;
