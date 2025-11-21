import { appState } from './state.js';
import { render } from './ui.js';
import { getEventState, subscribeToEventState } from './supabase.js';
import { POLL_INTERVAL } from './config.js';
import './style.css';

/**
 * Initialize the app
 */
async function init() {
  // Subscribe to state changes
  appState.subscribe(() => {
    render();
  });

  // Initial render
  render();

  // Check event state from Supabase
  await checkEventState();

  // Set up polling for event state
  setInterval(checkEventState, POLL_INTERVAL);

  // Subscribe to real-time event state changes
  subscribeToEventState((newState) => {
    if (newState && newState.is_active !== undefined) {
      appState.setEventActive(newState.is_active);
    }
  });
}

/**
 * Check event state from Supabase
 */
async function checkEventState() {
  const state = await getEventState();
  if (state && state.is_active !== undefined) {
    appState.setEventActive(state.is_active);
  }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
