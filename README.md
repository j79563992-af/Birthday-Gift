# Romantic Midnight Birthday Surprise for Sidra ❤️

A romantic, static midnight birthday countdown and celebration website created for Sidra.

## ✨ Features

- **Fixed Pakistan Standard Time (UTC+5) Countdown**: Precisely timed for August 28, 2026 at 12:00:00 AM PKT (19:00:00 UTC on Aug 27). Operates on absolute UTC epoch timestamps, independent of visitor client timezones.
- **Automatic Live Midnight Reveal**: Automatically transitions into the full birthday celebration screen the second midnight strikes without requiring a page refresh.
- **Post-Midnight Instant View**: If visited after midnight PKT, the site immediately displays the full birthday celebration.
- **Ambient Romantic Canvas**: Falling rose petals, floating golden stardust particles, and warm flickering candlelight.
- **Polished Memory Gallery**: Polaroid-styled memory cards with interactive lightbox viewer.
- **Romantic Audio Experience**: Built-in Web Audio API synthesizer music box with piano melodies and soft ambient chords.
- **Interactive Love Letters & Wish Candle**: Interactive sealed love notes and candle wishing ceremony with particle burst effects.
- **100% Static & Free Hosting**: No backend servers, no databases, no API keys, and no cloud billing required. Runs entirely client-side in the browser.

---

## 🚀 Free Hosting on GitHub Pages

You can host this website on **GitHub Pages** using either of the two standard methods:

### Method 1: Deploy with GitHub Actions (Recommended)
1. Go to your repository on GitHub: `Settings` > `Pages`.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` workflow will automatically build and deploy the website.

### Method 2: Deploy from `/docs` folder
1. Go to your repository on GitHub: `Settings` > `Pages`.
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Select branch **`main`** and folder **`/docs`**, then click **Save**.

Your website will be live immediately at:
`https://<your-username>.github.io/<repo-name>/` (e.g. `https://j79563992-af.github.io/Birthday-Gift/`)

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for static production (outputs to /dist)
npm run build

# Preview static production build
npm run preview
```
