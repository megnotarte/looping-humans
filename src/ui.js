import { STATES, appState } from './state.js';
import { getPromptForToken } from './prompts.js';

/**
 * Render the welcome screen
 */
function renderWelcome() {
  return `
    <div class="screen welcome-screen">
      <div class="logo">
        <h1>AI Portland<br>Networking</h1>
      </div>
      <div class="content">
        <p class="intro">
          Connect with fellow AI enthusiasts during tonight's event!
        </p>
        <p class="description">
          Get matched with someone new and enjoy a fun conversation starter.
        </p>
      </div>
      <button id="start-btn" class="btn btn-primary" aria-label="Start networking">
        Start
      </button>
    </div>
  `;
}

/**
 * Render the token screen
 * @param {Object} token - Token object
 */
function renderToken(token) {
  return `
    <div class="screen token-screen">
      <div class="content">
        <h2>Your Match Token</h2>
        <div class="token-display" role="img" aria-label="Your token is ${token.name}">
          ${token.emoji}
        </div>
        <p class="token-name">${token.name}</p>
        <p class="instruction">
          Find someone with the same emoji!
        </p>
      </div>
      <button id="found-match-btn" class="btn btn-primary" aria-label="I found my match">
        I found them!
      </button>
      <button id="new-token-btn" class="btn btn-secondary" aria-label="Get a new token">
        New Token
      </button>
    </div>
  `;
}

/**
 * Render the prompt screen
 * @param {Object} token - Token object
 */
function renderPrompt(token) {
  const prompt = getPromptForToken(token.emoji);

  return `
    <div class="screen prompt-screen">
      <div class="content">
        <div class="token-indicator" role="img" aria-label="Your token is ${token.name}">
          ${token.emoji}
        </div>
        <h2>Your Conversation Prompt</h2>
        <div class="prompt-box">
          <p class="prompt-text">"${prompt}"</p>
        </div>
        <p class="hint">
          Take turns sharing your answers with your match!
        </p>
      </div>
      <div class="button-group">
        <button id="new-match-btn" class="btn btn-primary" aria-label="Find a new match">
          New Match
        </button>
        <button id="done-btn" class="btn btn-secondary" aria-label="Done networking">
          Done
        </button>
      </div>
    </div>
  `;
}

/**
 * Render the ended screen
 */
function renderEnded() {
  return `
    <div class="screen ended-screen">
      <div class="content">
        <h2>Thanks for Connecting!</h2>
        <p class="message">
          The networking session has ended.<br>
          Enjoy the event!
        </p>
        <div class="emoji-decoration" aria-hidden="true">
          🤖 💡 🚀
        </div>
      </div>
    </div>
  `;
}

/**
 * Main render function
 */
export function render() {
  const app = document.getElementById('app');
  const state = appState.getState();

  // Check if event has ended
  if (!state.isEventActive) {
    app.innerHTML = renderEnded();
    return;
  }

  // Render based on current state
  switch (state.currentState) {
    case STATES.WELCOME:
      app.innerHTML = renderWelcome();
      attachWelcomeListeners();
      break;

    case STATES.TOKEN:
      if (!state.token) {
        appState.assignNewToken();
        return;
      }
      app.innerHTML = renderToken(state.token);
      attachTokenListeners();
      break;

    case STATES.PROMPT:
      if (!state.token) {
        appState.setState(STATES.WELCOME);
        return;
      }
      app.innerHTML = renderPrompt(state.token);
      attachPromptListeners();
      break;

    case STATES.ENDED:
      app.innerHTML = renderEnded();
      break;

    default:
      app.innerHTML = renderWelcome();
      attachWelcomeListeners();
  }
}

/**
 * Attach event listeners for welcome screen
 */
function attachWelcomeListeners() {
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      appState.assignNewToken();
      appState.setState(STATES.TOKEN);
    });
  }
}

/**
 * Attach event listeners for token screen
 */
function attachTokenListeners() {
  const foundMatchBtn = document.getElementById('found-match-btn');
  const newTokenBtn = document.getElementById('new-token-btn');

  if (foundMatchBtn) {
    foundMatchBtn.addEventListener('click', () => {
      appState.setState(STATES.PROMPT);
    });
  }

  if (newTokenBtn) {
    newTokenBtn.addEventListener('click', () => {
      appState.assignNewToken();
    });
  }
}

/**
 * Attach event listeners for prompt screen
 */
function attachPromptListeners() {
  const newMatchBtn = document.getElementById('new-match-btn');
  const doneBtn = document.getElementById('done-btn');

  if (newMatchBtn) {
    newMatchBtn.addEventListener('click', () => {
      appState.assignNewToken();
      appState.setState(STATES.TOKEN);
    });
  }

  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      appState.reset();
    });
  }
}
