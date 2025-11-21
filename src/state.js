import { getRandomToken } from './tokens.js';

// App states
export const STATES = {
  WELCOME: 'welcome',
  TOKEN: 'token',
  PROMPT: 'prompt',
  ENDED: 'ended'
};

// State management
class AppState {
  constructor() {
    this.currentState = STATES.WELCOME;
    this.token = null;
    this.isEventActive = true;
    this.listeners = [];

    // Load state from sessionStorage if available
    this.loadState();
  }

  /**
   * Set current app state
   * @param {string} state - New state
   */
  setState(state) {
    this.currentState = state;
    this.saveState();
    this.notifyListeners();
  }

  /**
   * Set user token
   * @param {Object} token - Token object
   */
  setToken(token) {
    this.token = token;
    this.saveState();
    this.notifyListeners();
  }

  /**
   * Generate and assign a new token
   */
  assignNewToken() {
    this.token = getRandomToken();
    this.saveState();
    this.notifyListeners();
  }

  /**
   * Set event active status
   * @param {boolean} isActive
   */
  setEventActive(isActive) {
    this.isEventActive = isActive;
    if (!isActive) {
      this.currentState = STATES.ENDED;
    }
    this.saveState();
    this.notifyListeners();
  }

  /**
   * Reset to initial state
   */
  reset() {
    this.currentState = STATES.WELCOME;
    this.token = null;
    this.isEventActive = true;
    sessionStorage.removeItem('appState');
    this.notifyListeners();
  }

  /**
   * Save state to sessionStorage
   */
  saveState() {
    const state = {
      currentState: this.currentState,
      token: this.token,
      isEventActive: this.isEventActive
    };
    sessionStorage.setItem('appState', JSON.stringify(state));
  }

  /**
   * Load state from sessionStorage
   */
  loadState() {
    try {
      const saved = sessionStorage.getItem('appState');
      if (saved) {
        const state = JSON.parse(saved);
        this.currentState = state.currentState || STATES.WELCOME;
        this.token = state.token || null;
        this.isEventActive = state.isEventActive !== false;
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
  }

  /**
   * Subscribe to state changes
   * @param {Function} listener - Called when state changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Unsubscribe from state changes
   * @param {Function} listener
   */
  unsubscribe(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Notify all listeners of state change
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener(this));
  }

  /**
   * Get current state snapshot
   */
  getState() {
    return {
      currentState: this.currentState,
      token: this.token,
      isEventActive: this.isEventActive
    };
  }
}

// Export singleton instance
export const appState = new AppState();
