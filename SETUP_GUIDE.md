# Setup Guide - macOS Recovery Simulator

Complete step-by-step installation and setup instructions for the macOS Recovery Simulator diploma project.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Git** (optional, for cloning)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

- **Modern Web Browser**
  - Chrome, Firefox, Safari, or Edge (latest version)

## 🚀 Installation Steps

### Step 1: Get the Project

**Option A: Clone from Git**
```bash
git clone <repository-url>
cd mac_os_recovery
```

**Option B: Download ZIP**
1. Download the project ZIP file
2. Extract to your desired location
3. Open terminal/command prompt in the extracted folder

### Step 2: Install All Dependencies

From the project root directory, run:

```bash
npm run install:all
```

This command will:
1. Install root workspace dependencies
2. Install backend dependencies
3. Install frontend dependencies

**Note:** This may take 2-5 minutes depending on your internet connection.

### Step 3: Verify Installation

Check that dependencies were installed correctly:

```bash
# Check backend
cd backend
ls node_modules
cd ..

# Check frontend
cd frontend
ls node_modules
cd ..
```

You should see `node_modules` directories in both locations.

## ▶️ Running the Application

### Option 1: Run Both Servers Together (Recommended)

From the project root:

```bash
npm run dev
```

This will start:
- Backend API on: http://localhost:3001
- Frontend on: http://localhost:5173

### Option 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```
Backend will start on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```
Frontend will start on http://localhost:5173

### Accessing the Application

Once both servers are running:

1. Open your browser
2. Navigate to: **http://localhost:5173**
3. You should see the landing page

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Landing Page**
   - [ ] Page loads with MacBook mockup
   - [ ] "Start Recovery Simulation" button visible
   - [ ] Disclaimer banner appears at top
   - [ ] Animations play smoothly

2. **Setup Page**
   - [ ] Can select different macOS versions
   - [ ] Can choose recovery scenarios
   - [ ] Can toggle system options (checkboxes)
   - [ ] "Start Simulation" button works

3. **Simulation Page**
   - [ ] Terminal displays with typing animation
   - [ ] Progress bar updates
   - [ ] Steps complete one by one
   - [ ] Redirects to results when done

4. **Result Page**
   - [ ] Shows success/warning/error status
   - [ ] Displays simulation summary
   - [ ] "View Recovery Instructions" button works

5. **Instructions Page**
   - [ ] Shows numbered recovery steps
   - [ ] Displays warnings if applicable
   - [ ] Shows security tips
   - [ ] "Back to Home" button works

### API Testing

Test the backend API directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Test simulation endpoint
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "macosVersion": "Sonoma",
    "scenario": "forgotten_password",
    "options": {
      "appleId": true,
      "fileVault": true,
      "recoveryMode": true,
      "timeMachine": false
    }
  }'
```

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in `frontend/dist/`

To preview the production build:

```bash
cd frontend
npm run preview
```

## 🛠️ Troubleshooting

### Port Already in Use

If you see "Port 3001 already in use" or "Port 5173 already in use":

**Find and kill the process:**

**On macOS/Linux:**
```bash
# For port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# For port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

**On Windows:**
```bash
# For port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# For port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Dependencies Installation Failed

If `npm run install:all` fails:

1. Delete all `node_modules` folders:
   ```bash
   rm -rf node_modules backend/node_modules frontend/node_modules
   ```

2. Delete all lock files:
   ```bash
   rm -rf package-lock.json backend/package-lock.json frontend/package-lock.json
   ```

3. Try again:
   ```bash
   npm run install:all
   ```

### Backend API Not Responding

1. Check if backend is running:
   ```bash
   curl http://localhost:3001/api/health
   ```

2. Check backend logs in the terminal

3. Restart backend:
   ```bash
   cd backend
   npm run dev
   ```

### Frontend Not Loading

1. Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)

2. Check browser console for errors (F12)

3. Verify backend is running first

4. Restart frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Styling Issues

If styles don't load properly:

1. Ensure Tailwind CSS is properly configured
2. Clear Vite cache:
   ```bash
   cd frontend
   rm -rf node_modules/.vite
   npm run dev
   ```

## 📁 Project Structure Reference

```
mac_os_recovery/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities
│   │   ├── App.jsx       # Main app
│   │   └── main.jsx      # Entry point
│   └── package.json
│
├── backend/               # Express API
│   ├── server.js         # Server
│   ├── simulationEngine.js  # Logic
│   └── package.json
│
├── package.json          # Root config
├── README.md            # Main documentation
└── SETUP_GUIDE.md       # This file
```

## 🎓 Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Changes to `.jsx`, `.css` files reload automatically
- **Backend**: Using `--watch` flag, changes to `.js` files reload automatically

### Debugging

**Frontend:**
1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for API call issues

**Backend:**
1. Add `console.log()` statements in code
2. Check terminal output
3. Use Node.js debugging:
   ```bash
   node --inspect server.js
   ```

### Code Formatting

Consider installing:
- **ESLint** for code linting
- **Prettier** for code formatting

### VS Code Extensions (Recommended)

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier

## 🔒 Security Reminders

⚠️ **IMPORTANT:**

- This is a SIMULATION for educational purposes
- NO real system access or password recovery
- All processes are simulated
- For real recovery, use official Apple Support

## 📞 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review README.md
3. Check browser/terminal console for errors
4. Verify all dependencies are installed
5. Ensure both servers are running

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Node.js and npm are installed and working
- [ ] All dependencies installed without errors
- [ ] Backend starts successfully on port 3001
- [ ] Frontend starts successfully on port 5173
- [ ] Can access landing page in browser
- [ ] Can navigate through all pages
- [ ] Terminal animation works in simulation
- [ ] API calls complete successfully

## 🎉 Success!

If all steps completed successfully, you now have a fully functional macOS Recovery Simulator running locally!

Access the application at: **http://localhost:5173**

---

**Next Steps:**
- Explore all features of the simulator
- Try different macOS versions and scenarios
- Customize the code for your diploma presentation
- Build for production when ready to demo

Happy simulating! 🚀
