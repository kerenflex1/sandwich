# Messaging MVP

This repository contains a minimal instant messaging MVP with a Node.js backend and a SwiftUI iOS client. The app supports basic text messaging and a sample miniapp (shared counter) that runs in real time inside a chat.

## Backend

The backend uses Express and Socket.IO. It can be run locally or deployed to Google Cloud Run.

### Local development

```bash
cd backend
npm install
npm start
```

### Deployment

The `deploy.sh` script builds and deploys the backend to Google Cloud Run. It expects the `gcloud` CLI to be installed and `GOOGLE_CLOUD_PROJECT` to be set.

```bash
cd backend
./deploy.sh
```

## iOS App

The iOS client is written in SwiftUI. Open the `ios` directory in Xcode and run on an iOS device or simulator. The app connects to the backend at `ws://localhost:3000` for local development.

## Miniapp Example

The bundled miniapp is a collaborative counter. Any participant can increment or decrement the counter and updates are broadcast to all users in the chat.
