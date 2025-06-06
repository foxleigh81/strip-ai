# Strip AI

A simple React application to replace em-dash (—), en-dash (–), and smart quotes (" ") with simple characters (-, ").

## Features

- Clean, accessible interface with light green and blue colour scheme
- Real-time text processing for multiple character types
- Copy to clipboard functionality
- Built with React, TypeScript, Tailwind CSS, and shadcn/ui components
- Fully responsive design
- Performance optimized for mobile devices

## Character Replacements

- **Em-dash (—)** → **Hyphen (-)**
- **En-dash (–)** → **Hyphen (-)**
- **Smart quotes (" ")** → **Regular quotes (")**
- **Smart apostrophes (' ')** → **Regular apostrophes (')**

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

1. Paste your text containing em-dashes (—), en-dashes (–), or smart quotes (" ") into the input textarea
2. Click "Process Text" to normalize all characters
3. Copy the processed text from the output area
4. Use the clear button to reset both inputs

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
