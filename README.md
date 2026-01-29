# macOS Access Recovery Simulator

## 🎓 Diploma-Level Educational Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Educational](https://img.shields.io/badge/Purpose-Educational-blue.svg)](https://github.com)

> **⚠️ IMPORTANT DISCLAIMER**
> This is a **SIMULATION ONLY** for educational and demonstration purposes.
> - NO real password recovery is performed
> - NO actual system access or modification
> - NO security bypass capabilities
> - NO connection to real macOS systems
>
> This project is designed as a diploma-level demonstration of full-stack development skills and UI/UX design principles.

## 📋 Project Overview

An interactive web application that simulates the macOS password recovery process, demonstrating:
- Modern full-stack architecture
- Apple-style UI/UX design
- Real-time simulation with animations
- Professional-grade frontend development
- RESTful API design

## 🎯 Educational Purpose

This simulator is created to:
1. Demonstrate full-stack development capabilities
2. Showcase modern web technologies integration
3. Illustrate UI/UX design principles
4. Present system process visualization concepts
5. Serve as a portfolio/diploma project

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for modern styling
- **shadcn/ui** for component library
- **Framer Motion** for smooth animations
- **Lucide Icons** for beautiful icons
- **React Router** for navigation

### Backend
- **Node.js** with Express
- RESTful API for simulation data
- JSON-based responses (no database)

## 🚀 Features

### 1. Landing Page
- Full-screen hero with MacBook mockup
- Glassmorphism effects
- Smooth animations
- Clear educational messaging

### 2. Recovery Setup
User can configure simulation parameters:
- **macOS Version**: Mojave, Catalina, Big Sur, Monterey, Ventura, Sonoma
- **Recovery Scenario**:
  - Forgotten user password
  - Lost admin access
  - Account corruption
  - Post-update login failure
- **System Options**:
  - Apple ID linked
  - FileVault enabled
  - Recovery Mode available
  - Time Machine backup available

### 3. Live Simulation
- Terminal-style output with typing animation
- Color-coded logs for different message types
- Real-time progress tracking
- Step-by-step visualization
- Dynamic responses based on selections

### 4. Results & Instructions
- Visual status indicators
- Scenario-specific recovery instructions
- Best practices for system security
- Educational security tips

## 🆕 Interactive Dashboard (v2.0)

The new dashboard provides an advanced, explorable interface with significantly increased complexity and interactivity:

### 🎛️ Dashboard Hub
- **Centralized Navigation**: Sidebar with 8 distinct sections
- **Real-time Status**: Visual indicators for configuration readiness
- **Persistent State**: Configuration saved across sessions
- **Seamless Flow**: Navigate freely between all sections

### 📊 System Overview
- **Configuration Summary**: Current settings at a glance
- **Color-Coded Status**: Green/Yellow/Red indicators for:
  - Security level assessment
  - Authentication readiness
  - Recovery Mode availability
  - System feature status
- **Quick Actions**: Jump to key sections directly

### ⚙️ Advanced Settings
New parameters that affect simulation behavior:
- **Security Level**: Low / Medium / High
  - High security requires additional authentication steps
  - Affects simulation complexity and possible failure scenarios
- **User Role**: Standard / Administrator
  - Determines available recovery options
  - Triggers role-based permission checks
- **Authentication Method**:
  - Apple ID (recommended)
  - Local Account
  - Recovery Key (FileVault required)
- **CPU Architecture**: Intel / Apple Silicon
  - Affects boot sequence simulation
  - Different firmware checks

### 🔍 Dependency & Warning System
- **Pre-Simulation Validation**: Checks for configuration issues
- **Interactive Warnings**:
  - ⛔ **Errors**: Critical issues that prevent simulation
  - ⚠️ **Warnings**: Non-critical issues with suggestions
- **Smart Suggestions**: Context-aware recommendations
- **Continue Anyway**: Option to proceed despite warnings (when safe)

Examples:
- "High security level requires Apple ID authentication"
- "Recovery Mode disabled - cannot proceed"
- "Standard user cannot recover admin access"

### 🗺️ Interactive Algorithm Map
- **Visual Flow Diagram**: 6-stage recovery process
- **Clickable Stages**: Each shows detailed steps
- **Conditional Logic**: Stages highlight based on configuration
- **Live Updates**: Reflects current settings in real-time

Stages:
1. System Check
2. Security Layer
3. Recovery Environment
4. Authentication
5. Password Reset
6. Completion

### 📝 Log Explorer
- **Clickable Terminal Logs**: Click any step to see explanation
- **Context-Aware Details**: Each command explained with:
  - What it does
  - Why it's required
  - Which settings triggered it
- **Recent Steps Panel**: Quick access to latest operations
- **Step-by-Step Learning**: Educational tooltips throughout

### 📚 Simulation History
- **Persistent Storage**: Last 5 simulations saved locally
- **Detailed Records**: Each entry shows:
  - Configuration used
  - Steps completed
  - Final result (Success/Warning/Error)
  - Timestamp
- **Re-run Capability**: Execute same configuration again
- **Load & Modify**: Import past config to modify and re-run
- **Clear History**: Privacy-friendly data management

### 🎯 Result Analysis: "Why This Result?"
- **Contributing Factors**: Lists what helped or hindered
  - ✅ Positive: Features that enabled success
  - ❌ Negative: Issues that caused problems
  - ⚠️ Neutral: Factors with mixed impact
- **Smart Suggestions**: How to achieve different outcomes
- **Configuration Impact**: See exactly how your choices affected the result

Examples:
- "Recovery Mode was available" → Positive factor
- "High security level required additional authentication" → Negative factor
- "FileVault encryption added complexity" → Neutral factor

### 🧩 Enhanced Simulation Logic

Backend now includes:
- **100+ Conditional Paths**: Based on all parameters
- **Failure Scenarios**: Realistic error conditions
  - No Recovery Mode + Lost Admin = Error
  - High Security + No Apple ID = Error
  - Standard User + Admin Recovery = Error
- **Security-Based Steps**: More checks for higher security
- **Architecture-Specific**: Intel vs Apple Silicon differences
- **Role-Based Access**: Different flows for admin vs standard users

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Setup Steps

```bash
# Clone the repository
git clone <repository-url>
cd mac_os_recovery

# Install all dependencies
npm run install:all

# Start development servers (both frontend and backend)
npm run dev

# Or run separately:
# Backend (http://localhost:3001)
npm run dev:backend

# Frontend (http://localhost:5173)
npm run dev:frontend
```

## 🌐 Accessing the Application

Once running, open your browser to `http://localhost:5173`

### Two Ways to Use the Simulator:

1. **🆕 Interactive Dashboard (Recommended)**
   - Click "Open Dashboard" on the landing page
   - Access: `http://localhost:5173/dashboard`
   - Full-featured experience with all new capabilities

2. **Quick Start (Legacy)**
   - Original linear flow: Landing → Setup → Simulation → Results
   - Access: `http://localhost:5173/setup`
   - Simpler, single-path experience

### Dashboard Routes:
```
/dashboard/overview     - System configuration summary
/dashboard/settings     - Basic recovery settings
/dashboard/advanced     - Security, auth, and advanced options
/dashboard/algorithm    - Visual recovery process map
/dashboard/simulation   - Run simulations with log explorer
/dashboard/history      - View past simulation runs
/dashboard/results      - Detailed outcome analysis
/dashboard/instructions - Post-recovery guidance
```

## 🏗️ Project Structure

```
mac_os_recovery/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── Disclaimer.jsx
│   │   │   ├── MacBookMockup.jsx
│   │   │   └── Terminal.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Setup.jsx
│   │   │   ├── Simulation.jsx
│   │   │   ├── Result.jsx
│   │   │   └── Instructions.jsx
│   │   ├── lib/            # Utilities
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
│
├── backend/                 # Express API
│   ├── server.js           # Main server file
│   ├── simulationEngine.js # Logic for generating simulations
│   └── package.json
│
├── package.json            # Root package file
└── README.md              # This file
```

## 🎨 Design Philosophy

- **Apple-Inspired**: Clean, minimal, professional
- **Dark Mode First**: Optimized for dark theme
- **Glassmorphism**: Modern blur and transparency effects
- **Smooth Animations**: Framer Motion for fluid transitions
- **Accessibility**: WCAG compliant where applicable
- **Responsive**: Works on desktop, tablet, and mobile

## 🔒 Safety & Ethics

This project adheres to strict ethical guidelines:

1. **No Real System Access**: All operations are frontend/backend simulations
2. **No Malicious Code**: No attempt to bypass any security
3. **Clear Disclaimers**: Prominent warnings on every page
4. **Educational Focus**: Designed for learning and demonstration only
5. **Open Source**: Transparent code for review

## 🎓 Academic Use

This project is suitable for:
- Computer Science diploma projects
- Web Development portfolio pieces
- UI/UX design demonstrations
- Full-stack development examples
- Interview portfolio items

## 📝 API Documentation

### `POST /api/simulate`

Generates simulation steps based on user selections.

**Request Body:**
```json
{
  "macosVersion": "Sonoma",
  "scenario": "forgotten_password",
  "options": {
    "appleId": true,
    "fileVault": true,
    "recoveryMode": true,
    "timeMachine": false
  }
}
```

**Response:**
```json
{
  "steps": [
    {
      "id": 1,
      "command": "detect_os",
      "output": "macOS Sonoma detected",
      "type": "info",
      "delay": 800
    }
    // ... more steps
  ],
  "result": "success",
  "message": "Password recovery simulation completed successfully"
}
```

## 🤝 Contributing

This is a diploma project, but suggestions are welcome:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Created as a diploma-level project demonstrating:
- Full-stack web development
- Modern JavaScript/React
- UI/UX design
- API development
- Animation and interactivity

## 🙏 Acknowledgments

- Apple Inc. for design inspiration (educational fair use)
- shadcn for the excellent UI component library
- The React and Node.js communities

---

**Remember**: This is a simulation for educational purposes only. Always follow proper security practices and use official tools for real system recovery.

For questions or issues, please open a GitHub issue.
