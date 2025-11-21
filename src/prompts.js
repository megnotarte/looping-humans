// AI-focused conversation prompts for networking
export const PROMPTS = [
  "Share one AI tool you used recently and what you thought about it.",
  "What's a silly AI myth you hear all the time?",
  "Talk about one workflow you've improved with AI.",
  "Describe a time AI saved you time this month.",
  "What AI topic are you curious about but haven't explored yet?",
  "What's the most surprising thing you've learned about AI recently?",
  "Share a creative use of AI you've seen or tried.",
  "What's one AI limitation that frustrates you?",
  "How do you think AI will change your industry in the next year?",
  "What's your favorite AI-generated thing you've seen?",
  "Share an AI experiment or project you're working on or want to start.",
  "What ethical consideration about AI matters most to you?",
  "Describe your ideal AI assistant. What would it do?",
  "What's a mundane task you wish AI could handle for you?",
  "Share a mistake you made while using AI and what you learned.",
  "What AI application excites you most for the future?",
  "How has AI changed how you learn new things?",
  "What's one thing about AI that still feels like magic to you?",
  "Share your most controversial AI opinion.",
  "What would you build if you had unlimited AI resources?",
  "How do you evaluate if an AI tool is actually useful?",
  "What's the most overhyped vs underhyped thing in AI right now?",
  "Share a time when AI gave you an unexpectedly good result.",
  "What's your approach to prompting/working with AI?",
  "How do you stay updated on AI developments?",
  "What's an AI use case in your daily life that others might not know about?",
  "Share something AI can't do (yet) that you wish it could.",
  "What's your favorite non-obvious AI application?",
  "How has your relationship with AI tools evolved over time?",
  "What's one AI skill you want to develop this year?"
];

/**
 * Get a prompt by index
 * @param {number} index
 * @returns {string} The prompt text
 */
export function getPromptByIndex(index) {
  return PROMPTS[index % PROMPTS.length];
}

/**
 * Get a random prompt
 * @returns {string} Random prompt text
 */
export function getRandomPrompt() {
  const index = Math.floor(Math.random() * PROMPTS.length);
  return PROMPTS[index];
}

/**
 * Get prompt for a specific token (deterministic)
 * @param {string} emoji
 * @returns {string} Prompt text
 */
export function getPromptForToken(emoji) {
  // Use emoji code point to generate deterministic index
  const codePoint = emoji.codePointAt(0);
  const index = codePoint % PROMPTS.length;
  return PROMPTS[index];
}
