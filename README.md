<div align="center">

# Strip AI

<img src="https://strip-ai.spacenectar.io/strip-ai-logo.png" alt="Strip AI Logo" width="100" height="100">

**A simple React application to replace em-dash (—), en-dash (–), smart quotes (" "), clean up whitespace, and optionally remove emoji.**

[![Docker Hub](https://img.shields.io/docker/pulls/foxleigh81/strip-ai?style=for-the-badge&logo=docker&logoColor=white&label=Docker%20Hub&color=2496ED)](https://hub.docker.com/r/foxleigh81/strip-ai)
[![GitHub release](https://img.shields.io/github/v/release/foxleigh81/strip-ai?style=for-the-badge&logo=github&logoColor=white&color=181717)](https://github.com/foxleigh81/strip-ai/releases)
[![License](https://img.shields.io/github/license/foxleigh81/strip-ai?style=for-the-badge&color=green)](LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/foxleigh81/strip-ai/docker-release.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=Docker%20Build)](https://github.com/foxleigh81/strip-ai/actions)

[![GitHub stars](https://img.shields.io/github/stars/foxleigh81/strip-ai?style=social)](https://github.com/foxleigh81/strip-ai/stargazers)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support%20me-FF5E5B?style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/foxleigh81)

---

</div>

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

Note: The development server does not work as well as the build version as some items are injected at build time

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

## Docker Deployment

If you are using the docker image to self-host the application and you like it. I'd really appreciate you giving this repo a star 😘

> **Note:** Docker images are automatically built and published to Docker Hub whenever a new release is created on GitHub. Images are available for both AMD64 and ARM64 architectures.

### Using Docker Hub Image

The easiest way to self-host Strip AI is using the pre-built Docker image:

```bash
# Pull and run the image directly
docker run -d --name strip-ai -p 3000:80 foxleigh81/strip-ai:latest

# Or use docker-compose (recommended)
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Building Your Own Image

To build the Docker image locally:

```bash
# Build the image
docker build -t strip-ai .

# Run the container
docker run -d --name strip-ai -p 3000:80 strip-ai
```

### Docker Compose

The included `docker-compose.yml` file provides the easiest deployment method:

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Performance

The app is optimized for mobile performance with:

- Code splitting and lazy loading
- Minified JavaScript with Terser
- Service worker caching
- Optimized bundle sizes
- Efficient Docker image with nginx serving static assets
