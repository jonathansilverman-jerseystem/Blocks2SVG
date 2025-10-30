# LEGO SPIKE Block Extractor

A client-side web app that extracts individual coding blocks from LEGO SPIKE Prime program files (.llsp3).

## Features

- 🎯 Drag-and-drop interface
- 🚀 100% client-side (no server needed, files never leave your computer)
- 📦 Automatically extracts all coding blocks
- 💾 Downloads as organized ZIP file
- 📱 Works on desktop and mobile
- 🆓 Free to use and host

## How It Works

1. User uploads a .llsp3 file
2. App unzips the file in the browser
3. Extracts the icon.svg containing all coding blocks
4. Splits SVG into individual block files
5. Packages them into a downloadable ZIP

## Local Testing

Just open `index.html` in your web browser. That's it!

```bash
# Open in your browser
open index.html

# Or on Windows
start index.html
```

## Deployment Options

### Option 1: GitHub Pages (Recommended - FREE)

1. Create a new GitHub repository
2. Upload these three files:
   - `index.html`
   - `style.css`
   - `app.js`
3. Go to Settings → Pages
4. Select "Deploy from main branch"
5. Your app will be live at: `https://yourusername.github.io/repo-name`

### Option 2: Netlify (FREE)

1. Sign up at netlify.com
2. Drag and drop this folder onto Netlify
3. Done! You get a live URL instantly

### Option 3: Vercel (FREE)

1. Sign up at vercel.com
2. Import from GitHub or drag-and-drop
3. Deploy in seconds

### Option 4: Any Web Server

Just upload the three files to any web hosting. They're static files - no backend needed!

## Files

- `index.html` - Main webpage structure
- `style.css` - Visual styling
- `app.js` - All the processing logic
- `README.md` - This file

## Browser Compatibility

Works on all modern browsers:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## Technical Details

- Uses JSZip library (loaded from CDN) to handle ZIP files
- Pure JavaScript - no frameworks required
- No data sent to servers - everything happens in your browser
- No dependencies to install

## Customization

Want to change the look? Edit `style.css`
Want to change functionality? Edit `app.js`

## License

Free to use, modify, and share!

## Support

For issues or questions, open an issue on GitHub.

---

Built with ❤️ for LEGO SPIKE educators
