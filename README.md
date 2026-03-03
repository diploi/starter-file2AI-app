<img alt="icon" src=".diploi/icon.svg" width="32">

# File2AI App Starter Kit for Diploi

[![launch with diploi badge](https://diploi.com/launch.svg)](https://diploi.com/starter-kit/file2ai)
[![component on diploi badge](https://diploi.com/component.svg)](https://diploi.com/starter-kit/file2ai)
[![latest tag badge](https://badgen.net/github/tag/diploi/starter-file2AI-app)](https://diploi.com/starter-kit/file2ai)

An AI-powered file analysis app built with **React (Vite)** and **FastAPI**.

This starter kit demonstrates:

- File upload and prompt-driven AI analysis
- Audio and video recording directly in the browser
- WebSocket-based realtime response updates
- Diploi AI Gateway integration for OpenAI-compatible models 

---

## ✨ Overview

This starter kit consists of two Diploi components:

- **`react-vite`** -- Frontend application (React + Vite)
- **`fastapi`** -- Backend API with AI processing and WebSocket updates

Everything is wired together automatically via environment variables
defined in `diploi.yaml`.

---

## 🧱 Architecture

### 1️⃣ React (Vite) Component

Based on the official Diploi [react-vite](https://github.com/diploi/component-react-vite) component.

### Environment Variables

These are automatically injected from the FastAPI component:

- `VITE_API_ROOT_ENDPOINT`

This starter kit enables Diploi's **runtime build** mode:

    - name: __VITE_RUNTIME_BUILD
      value: true

This allows environment variables to be populated correctly in
production deployments.

---

### 2️⃣ FastAPI Component

Based on the official Diploi [fastapi](https://github.com/diploi/component-fastapi) component.

The backend receives prompts and uploaded files at `POST /api/process`, then
streams status and final responses through `GET /ws` (WebSocket).

### Environment Variables

The backend is configured with Diploi AI Gateway credentials:

- `DIPLOI_AI_GATEWAY_URL`
- `DIPLOI_AI_GATEWAY_TOKEN`

---

## 🔍 Supported Inputs

You can submit a prompt with one file at a time:

- **Images** (`image/*`) are sent as multimodal image input
- **Audio** (`audio/*`) is transcribed before model inference
- **Video** (`video/*`) has audio extracted and transcribed
- **Other files** are read as text when possible

The frontend also supports recording audio/video and attaching the capture
as input.

---

## 🚀 Running on Diploi

### Start a new project

1. Create a new project in Diploi
2. Select this starter kit
3. Deploy

Diploi automatically:

- Connects FastAPI to React
- Injects environment variables
- Configures networking
- Builds production images
- Enables edge delivery via Cloudflare

---

## 🛠️ Local Development

### Frontend (`react-vite`)

```sh
cd react-vite
npm install
npm run dev
```

### Backend (`fastapi`)

```sh
cd fastapi
uv sync
uv run uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```
---

## 💡 Notes

- This starter uses OpenAI-compatible APIs through Diploi AI Gateway.
- The starter kit includes default models, gpt-4.1-nano and whisper-1, which work out of the box and are compatible with the Diploi AI Gateway proxy.
- For video processing, the backend uses `ffmpeg`/`ffprobe` to extract audio.
