# ⚔️ Catan Helper

A mobile-friendly assistant for **Settlers of Catan** played on the console edition at [g.csdu.co.uk](https://g.csdu.co.uk). Supports both **Classic Catan** and **Cities & Knights**.

## 🎮 What it does

- **📦 Resources** - See all your resources (and commodities in C&K) at a glance
- **🏛️ Development Tracks** - View your Trade, Science, and Politics levels (C&K)
- **🔨 Build Guide** - Instantly see what you can afford to build
- **📜 Card Info** - Full descriptions of development cards (Classic) or progress cards (C&K)
- **🔄 Auto-detect** - Automatically detects Classic vs Cities & Knights mode
- **🌍 Multi-language** - Available in English and German

## 📱 Works on Mobile!

The helper shows a full-screen overlay optimized for smartphones. Check your resources and cards without squinting at the game board.

## 🚀 How to Use

1. **Visit the helper page** → [piravlos.github.io/catan](https://piravlos.github.io/catan)
2. **Install the tiny bookmarklet** (drag to bookmarks bar or copy the code)
3. **Open your Catan game** at `g.csdu.co.uk`
4. **Click the bookmarklet** to see your dashboard

The bookmarklet is a tiny loader (~150 bytes) that fetches the latest helper code automatically - install once, always get updates!

### Mobile Installation

**iPhone/Safari:**
1. Copy the bookmarklet code from the helper page
2. Create any bookmark
3. Edit the bookmark and paste the code as the URL

**Android/Chrome:**
1. Copy the bookmarklet code
2. Create/edit a bookmark and paste the code as the URL

## 🛠️ Technical Details

This is a lightweight bookmarklet that:
- Loads the helper script from GitHub Pages (auto-updates every use)
- Connects to the game's WebSocket for live updates
- Displays your game state in a friendly overlay
- Keeps your screen awake while viewing

100% client-side JavaScript - no server required.

## ⚠️ Disclaimer

This tool is for personal use only. Not affiliated with Catan GmbH.

## 📄 License

MIT - Do whatever you want with it!
