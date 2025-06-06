# Strip AI

A simple React application to replace em-dash (—), en-dash (–), smart quotes (" "), clean up whitespace, and optionally remove emoji.

## Features

- Clean, accessible interface with light green and blue colour scheme
- Real-time text processing for multiple character types
- **Automatic whitespace cleanup** (trims and reduces multiple spaces)
- **Optional emoji removal** with checkbox toggle
- Copy to clipboard functionality
- Built with React, TypeScript, Tailwind CSS, and shadcn/ui components
- Fully responsive design
- Performance optimized for mobile devices

## Text Processing

- **Em-dash (—)** → **Hyphen (-)**
- **En-dash (–)** → **Hyphen (-)**
- **Smart quotes (" ")** → **Regular quotes (")**
- **Smart apostrophes (' ')** → **Regular apostrophes (')**
- **Multiple spaces/tabs** → **Single space** (automatic)
- **Leading/trailing spaces** → **Trimmed** (automatic)
- **Line breaks** → **Preserved** (automatic)
- **Emoji (🎉 😊 🚀)** → **Removed** (optional)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided localhost URL

## Usage

1. Paste your text containing em-dashes (—), en-dashes (–), smart quotes (" "), extra whitespace, or emoji into the input textarea
2. **Optional**: Check the "Also remove emoji" checkbox if you want to strip emoji characters
3. Click "Process Text" to normalize all characters and clean up whitespace
4. Copy the processed text from the output area
5. Use the clear button to reset both inputs

## Build

To build for production:
```bash
npm run build
```

## Performance

The app is optimized for mobile performance with:
- Code splitting and lazy loading
- Minified JavaScript with Terser
- Service worker caching
- Optimized bundle sizes
