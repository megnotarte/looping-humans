// Curated list of emoji tokens for matching
export const TOKENS = [
  { emoji: '🤖', name: 'Robot' },
  { emoji: '⚡', name: 'Lightning' },
  { emoji: '💡', name: 'Light Bulb' },
  { emoji: '🔍', name: 'Magnifying Glass' },
  { emoji: '🧠', name: 'Brain' },
  { emoji: '📡', name: 'Satellite' },
  { emoji: '🪄', name: 'Magic Wand' },
  { emoji: '🧩', name: 'Puzzle Piece' },
  { emoji: '🎛️', name: 'Control Knobs' },
  { emoji: '📎', name: 'Paperclip' },
  { emoji: '🛰️', name: 'Satellite' },
  { emoji: '📝', name: 'Memo' },
  { emoji: '🎯', name: 'Target' },
  { emoji: '🔬', name: 'Microscope' },
  { emoji: '🎨', name: 'Palette' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '💻', name: 'Laptop' },
  { emoji: '🔮', name: 'Crystal Ball' }
];

/**
 * Get a random token
 * @returns {Object} Token object with emoji and name
 */
export function getRandomToken() {
  const index = Math.floor(Math.random() * TOKENS.length);
  return TOKENS[index];
}

/**
 * Get token by emoji
 * @param {string} emoji
 * @returns {Object|null} Token object or null
 */
export function getTokenByEmoji(emoji) {
  return TOKENS.find(t => t.emoji === emoji) || null;
}
