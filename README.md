# AI Portland Interactive Networking App

A lightweight, mobile-friendly web application designed to facilitate networking during AI Portland events.

## Overview

This app helps attendees connect during the pre-event mingling period through:
- 📱 QR code entry (no login required)
- 🤖 Emoji-based matching
- 💬 AI-focused conversation prompts
- ⚡ Lightning-fast performance
- ♿ WCAG AA accessible design

## Features

- **Zero friction**: No accounts, no PII collection
- **Mobile-first**: Optimized for smartphones
- **Accessible**: WCAG AA compliant, screen reader friendly
- **Lightweight**: <150kb bundle size
- **Real-time**: Admin controls update all users instantly
- **Offline-ready**: Works on spotty event WiFi

## Tech Stack

- **Frontend**: Vanilla JavaScript + Vite
- **Backend**: Supabase (real-time database)
- **Styling**: Pure CSS (no frameworks)
- **Deployment**: Ready for Vercel/Netlify

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Create a new project at [supabase.com](https://supabase.com)

3. Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Set up the database:
   - Go to Supabase SQL Editor
   - Run the SQL commands to create the `event_state` table and policies

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## Usage

### For Attendees

1. Scan QR code at event entrance
2. Tap "Start" to get your emoji token
3. Find someone with the same emoji
4. Tap "I found them!" to get a conversation prompt
5. Enjoy your conversation!
6. Tap "New Match" to connect with someone else

### For Event Organizers

1. Navigate to `/admin.html`
2. Click "Start Event" when ready to begin networking
3. Click "End Event" when it's time to start the main event
4. All attendees will see the update in real-time

## File Structure

```
├── index.html              # Main app entry
├── admin.html              # Admin controls
├── src/
│   ├── main.js            # App initialization
│   ├── config.js          # Configuration
│   ├── state.js           # State management
│   ├── ui.js              # UI rendering
│   ├── tokens.js          # Emoji tokens
│   ├── prompts.js         # Conversation prompts
│   ├── supabase.js        # Database client
│   └── style.css          # Styling
├── database-setup.sql     # Supabase schema
└── package.json           # Dependencies
```

## Customization

### Adding New Prompts

Edit `src/prompts.js` and add to the `PROMPTS` array.

### Changing Emoji Tokens

Edit `src/tokens.js` and modify the `TOKENS` array.

### Updating Colors/Branding

Edit CSS custom properties in `src/style.css` under `:root`.

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Performance

- **Bundle size**: ~45kb (gzipped)
- **Load time**: <1s on 3G
- **Lighthouse score**: 95+

## Accessibility

- WCAG AA color contrast
- Keyboard navigable
- Screen reader compatible
- 44px minimum touch targets
- Respects reduced motion preferences

## Browser Support

- iOS Safari (latest 2 versions)
- Chrome on Android (latest)
- Chrome & Safari on desktop

## License

MIT

---

Built with ❤️ for the AI Portland community
