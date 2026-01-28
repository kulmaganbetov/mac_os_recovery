/**
 * Simulation Engine
 *
 * This module generates simulated recovery process steps based on user selections.
 * All data is FICTIONAL and for EDUCATIONAL purposes only.
 * No real system operations are performed.
 */

/**
 * Generate simulation steps based on configuration
 * Different macOS versions and scenarios produce different step sequences
 */
export function generateSimulation({ macosVersion, scenario, options }) {
  const steps = [];
  let stepId = 1;

  // Helper function to add a step
  const addStep = (command, output, type = 'info', delay = 800) => {
    steps.push({
      id: stepId++,
      command,
      output,
      type, // 'info', 'success', 'warning', 'error'
      delay
    });
  };

  // 1. Initial system detection
  addStep('detect_os', `macOS ${macosVersion} detected`, 'info', 1000);
  addStep('system_info', `Architecture: arm64 (Apple Silicon)`, 'info', 600);
  addStep('firmware_version', `Firmware: iBoot-8422.141.2`, 'info', 600);

  // 2. Check system options
  if (options.recoveryMode) {
    addStep('check_recovery', 'Recovery Mode: Available ✓', 'success', 800);
  } else {
    addStep('check_recovery', 'Recovery Mode: Not Available', 'warning', 800);
  }

  if (options.fileVault) {
    addStep('security_scan', 'FileVault Encryption: Enabled ✓', 'info', 700);
    addStep('keychain_check', 'Secure storage detected', 'info', 600);
  }

  if (options.appleId) {
    addStep('apple_id_check', 'Apple ID linked to system', 'success', 800);
  }

  if (options.timeMachine) {
    addStep('backup_scan', 'Time Machine backups found (3 available)', 'success', 900);
  }

  // 3. Scenario-specific steps
  switch (scenario) {
    case 'forgotten_password':
      addStep('scenario_init', 'Initiating forgotten password recovery', 'info', 1000);

      if (options.appleId) {
        addStep('apple_id_auth', 'Attempting Apple ID authentication...', 'info', 1500);
        addStep('icloud_verify', 'iCloud credentials verified ✓', 'success', 1200);
        addStep('unlock_method', 'Apple ID unlock method available', 'success', 800);
      }

      if (options.recoveryMode) {
        addStep('boot_recovery', 'Booting into Recovery Mode...', 'info', 1800);
        addStep('recovery_tools', 'Recovery utilities loaded', 'success', 1000);
      }

      addStep('user_list', 'Scanning user accounts...', 'info', 1000);
      addStep('user_found', 'Found: User "johnappleseed"', 'info', 800);
      addStep('password_reset', 'Generating password reset token...', 'info', 1500);
      addStep('reset_confirm', 'Password reset simulation successful ✓', 'success', 1000);
      break;

    case 'lost_admin':
      addStep('scenario_init', 'Initiating admin access recovery', 'info', 1000);
      addStep('admin_check', 'Scanning for administrator accounts...', 'info', 1200);
      addStep('admin_found', 'Found 0 accessible admin accounts', 'warning', 1000);

      if (options.recoveryMode) {
        addStep('recovery_boot', 'Entering Recovery Mode...', 'info', 1800);
        addStep('resetpassword_util', 'Loading Reset Password utility', 'info', 1200);
        addStep('account_scan', 'Detecting all user accounts', 'info', 1000);
        addStep('promote_user', 'Simulating admin privilege grant', 'success', 1500);
      }

      addStep('verify_admin', 'Admin access restored ✓', 'success', 1000);
      break;

    case 'account_corruption':
      addStep('scenario_init', 'Analyzing account corruption', 'info', 1000);
      addStep('directory_check', 'Checking Directory Services...', 'info', 1200);
      addStep('corruption_found', 'User database inconsistency detected', 'warning', 1000);

      if (options.timeMachine) {
        addStep('backup_restore', 'Preparing Time Machine restoration...', 'info', 1500);
        addStep('restore_progress', 'Restoring user data (simulated)', 'info', 2000);
        addStep('restore_complete', 'Account data restored ✓', 'success', 1200);
      } else {
        addStep('rebuild_account', 'Rebuilding account structure...', 'info', 1800);
        addStep('permissions_fix', 'Repairing permissions database', 'info', 1500);
        addStep('rebuild_complete', 'Account rebuilt successfully ✓', 'success', 1200);
      }
      break;

    case 'post_update':
      addStep('scenario_init', 'Post-update login failure analysis', 'info', 1000);
      addStep('update_check', `Previous: macOS ${getPreviousVersion(macosVersion)}`, 'info', 800);
      addStep('update_current', `Current: macOS ${macosVersion}`, 'info', 800);
      addStep('cache_check', 'Checking system caches...', 'info', 1000);
      addStep('cache_issue', 'Login keychain cache corruption detected', 'warning', 1000);
      addStep('cache_clear', 'Clearing authentication caches...', 'info', 1500);

      if (options.fileVault) {
        addStep('filevault_repair', 'Resyncing FileVault authentication', 'info', 1800);
      }

      addStep('login_reset', 'Resetting login subsystem...', 'info', 1500);
      addStep('verification', 'Login system restored ✓', 'success', 1000);
      break;

    default:
      addStep('scenario_init', 'Starting generic recovery process', 'info', 1000);
  }

  // 4. Version-specific quirks
  if (macosVersion === 'Sonoma' || macosVersion === 'Ventura') {
    addStep('passkey_check', 'Checking for Passkey support...', 'info', 800);
    addStep('passkey_status', 'Passkeys not configured', 'info', 600);
  }

  // 5. Final verification steps
  addStep('security_verify', 'Running security verification...', 'info', 1200);
  addStep('integrity_check', 'System integrity: OK ✓', 'success', 1000);
  addStep('session_close', 'Recovery session completed', 'success', 800);

  // 6. Determine result based on available options
  let result = 'success';
  let message = 'Password recovery simulation completed successfully';

  if (!options.recoveryMode && scenario === 'lost_admin') {
    result = 'partial';
    message = 'Recovery possible but requires Recovery Mode for full access';
  }

  if (!options.appleId && !options.recoveryMode && scenario === 'forgotten_password') {
    result = 'warning';
    message = 'Limited recovery options - Apple ID or Recovery Mode recommended';
  }

  return {
    steps,
    result, // 'success', 'partial', 'warning', 'error'
    message,
    metadata: {
      macosVersion,
      scenario,
      totalSteps: steps.length,
      estimatedTime: steps.reduce((sum, step) => sum + step.delay, 0)
    }
  };
}

/**
 * Get the previous macOS version for update scenarios
 */
function getPreviousVersion(currentVersion) {
  const versions = ['Mojave', 'Catalina', 'Big Sur', 'Monterey', 'Ventura', 'Sonoma'];
  const index = versions.indexOf(currentVersion);
  return index > 0 ? versions[index - 1] : 'Previous Version';
}

/**
 * Get recovery instructions based on scenario and result
 */
export function getInstructions({ scenario, result, macosVersion, options }) {
  const instructions = {
    title: '',
    steps: [],
    warnings: [],
    tips: []
  };

  // Set title based on result
  if (result === 'success') {
    instructions.title = 'Recovery Completed Successfully';
  } else if (result === 'partial') {
    instructions.title = 'Partial Recovery Completed';
  } else {
    instructions.title = 'Recovery Completed with Warnings';
  }

  // Common first steps
  instructions.steps.push('Restart your Mac by clicking Apple menu > Restart');
  instructions.steps.push('Wait for the system to boot normally');

  // Scenario-specific instructions
  switch (scenario) {
    case 'forgotten_password':
      instructions.steps.push('At the login screen, enter your NEW password');
      instructions.steps.push('Once logged in, open System Settings');
      instructions.steps.push('Navigate to Users & Groups');
      instructions.steps.push('Verify your account settings are correct');
      instructions.steps.push('Consider enabling Touch ID or creating a Passkey');

      if (options.appleId) {
        instructions.steps.push('Verify your Apple ID is still properly linked');
      }
      break;

    case 'lost_admin':
      instructions.steps.push('Log in with the restored administrator account');
      instructions.steps.push('Open System Settings > Users & Groups');
      instructions.steps.push('Verify admin privileges are active (you should see "Admin" under your name)');
      instructions.steps.push('Create a backup admin account for future emergencies');
      instructions.steps.push('Update all user account passwords');
      break;

    case 'account_corruption':
      instructions.steps.push('Log in to your restored account');
      instructions.steps.push('Open System Settings and verify all settings');
      instructions.steps.push('Check Applications folder to ensure all apps are accessible');
      instructions.steps.push('Open a few apps to verify functionality');
      instructions.steps.push('Check Documents folder for file integrity');

      if (options.timeMachine) {
        instructions.steps.push('Consider setting up automatic Time Machine backups');
      }
      break;

    case 'post_update':
      instructions.steps.push('Log in with your existing password (should now work)');
      instructions.steps.push('Allow any pending system updates to complete');
      instructions.steps.push('Check System Settings > General > Software Update');
      instructions.steps.push('Verify all applications work correctly on new macOS version');
      break;
  }

  // Common final steps
  instructions.steps.push('Create a new backup (Time Machine recommended)');
  instructions.steps.push('Document your new password securely');

  // Warnings
  if (!options.timeMachine) {
    instructions.warnings.push('⚠️ No Time Machine backup detected - strongly recommend setting up backups');
  }

  if (!options.appleId) {
    instructions.warnings.push('⚠️ Link your Apple ID for easier recovery in the future');
  }

  if (!options.fileVault) {
    instructions.warnings.push('⚠️ Consider enabling FileVault encryption for enhanced security');
  }

  // Security tips
  instructions.tips.push('💡 Use a password manager to securely store passwords');
  instructions.tips.push('💡 Enable two-factor authentication on your Apple ID');
  instructions.tips.push('💡 Keep macOS updated to the latest version');
  instructions.tips.push('💡 Regularly test your backup and recovery processes');

  if (macosVersion === 'Sonoma' || macosVersion === 'Ventura') {
    instructions.tips.push('💡 Consider using Passkeys instead of passwords for supported services');
  }

  return instructions;
}
