#!/bin/bash
# Deploy the backend to Google Cloud Run
# Requires gcloud CLI to be installed and configured with a project
set -e

if [ -z "$GOOGLE_CLOUD_PROJECT" ]; then
  echo "GOOGLE_CLOUD_PROJECT is not set" >&2
  exit 1
fi

IMAGE=gcr.io/$GOOGLE_CLOUD_PROJECT/sandwich-backend

gcloud builds submit --tag "$IMAGE"
gcloud run deploy sandwich-backend --image "$IMAGE" --platform managed --allow-unauthenticated
