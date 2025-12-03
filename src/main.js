import { appState } from './state.js';
import { render } from './ui.js';
import { getEventState, subscribeToEventState, getActiveSession, incrementParticipantCount } from './supabase.js';
import { POLL_INTERVAL } from './config.js';
import './style.css';

const PARTICIPATION_KEY = 'session_participated';

/**
 * Initialize the app
 */
async function init() {
  // Subscribe to state changes
  appState.subscribe(() => {
    render();
  });

  // Check event state from Supabase FIRST (before initial render)
  await checkEventState();

  // Initial render (after database check)
  render();

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

/**
 * Track user participation in the current session
 * Only increments once per session per user (using sessionStorage)
 */
export async function trackParticipation() {
  try {
    // Get current active session
    const session = await getActiveSession();
    if (!session) {
      console.log('No active session found');
      return;
    }

    // Check if user already participated in this session
    const participatedSessionId = sessionStorage.getItem(PARTICIPATION_KEY);
    if (participatedSessionId === String(session.id)) {
      console.log('User already counted in this session');
      return;
    }

    // Increment participant count
    const success = await incrementParticipantCount(session.id);
    if (success) {
      // Mark user as participated in this session
      sessionStorage.setItem(PARTICIPATION_KEY, String(session.id));
      console.log('Participation tracked for session', session.id);
    }
  } catch (error) {
    console.error('Error tracking participation:', error);
  }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
