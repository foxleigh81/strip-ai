# Docker Hub Setup for GitHub Actions

This repository uses GitHub Actions to automatically build and push Docker images to Docker Hub when releases are created.

## Required Secrets

You need to configure the following secrets in your GitHub repository:

### 1. DOCKER_USERNAME
Your Docker Hub username (e.g., `foxleigh81`)

### 2. DOCKER_PASSWORD
A Docker Hub access token (recommended) or your Docker Hub password

## Setting Up Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings > Secrets and variables > Actions**
3. **Click "New repository secret"**
4. **Add each secret:**

### For DOCKER_USERNAME:
- Name: `DOCKER_USERNAME`
- Value: `foxleigh81` (your Docker Hub username)

### For DOCKER_PASSWORD:
- Name: `DOCKER_PASSWORD`
- Value: Your Docker Hub access token (see below)

## Creating a Docker Hub Access Token

**Recommended:** Use an access token instead of your password for better security.

1. **Log in to Docker Hub**
2. **Go to Account Settings > Security**
3. **Click "New Access Token"**
4. **Give it a name** (e.g., "GitHub Actions Strip AI")
5. **Set permissions** to "Read, Write, Delete" for your repositories
6. **Copy the generated token** and use it as the `DOCKER_PASSWORD` secret

## How It Works

The GitHub Action will:
1. **Trigger** when you create a new release
2. **Build** the Docker image for multiple platforms (AMD64, ARM64)
3. **Tag** the image with both the release version and "latest"
4. **Push** to Docker Hub at `foxleigh81/strip-ai`
5. **Update** the Docker Hub repository description with your README

## Example Release Flow

1. Update version in `package.json` to `1.1.0`
2. Create a Git tag: `git tag v1.1.0`
3. Push the tag: `git push origin v1.1.0`
4. Create a release on GitHub using tag `v1.1.0`
5. The action automatically builds and pushes:
   - `foxleigh81/strip-ai:v1.1.0`
   - `foxleigh81/strip-ai:latest`

## Multi-Platform Support

The workflow builds for both:
- **linux/amd64** (Intel/AMD processors)
- **linux/arm64** (ARM processors like Apple M1/M2, Raspberry Pi)

This ensures your Docker image works on a wide range of devices. 