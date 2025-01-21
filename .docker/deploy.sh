#!/bin/bash

set -e

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check required tools
if ! command_exists gcloud; then
    echo "Error: Google Cloud SDK is not installed"
    echo "Please install gcloud CLI: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# GCP Configuration
PROJECT_ID=${PROJECT_ID:-solderland}
IMAGE_NAME=${IMAGE_NAME:-isanore-store}
REGION=${REGION:-europe-west1}
SERVICE_ACCOUNT=${SERVICE_ACCOUNT:-meteora-worker@solderland.iam.gserviceaccount.com}

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Environment specific configurations
if [ "$1" == "prod" ]; then
    INSTANCE_NAME=isanore-store-prod
    export ENV=prod
elif [ "$1" == "test" ]; then
    INSTANCE_NAME=isanore-store-test
    export ENV=test
else
    echo "Please specify environment: prod or test"
    echo "Usage: ./deploy.sh [prod|test]"
    exit 1
fi

# Set full image name for GCR
FULL_IMAGE_NAME="gcr.io/$PROJECT_ID/$IMAGE_NAME:$ENV"

echo "Building and pushing to Google Cloud..."
if ! gcloud builds submit --tag $FULL_IMAGE_NAME; then
    echo "Error: Cloud Build failed"
    exit 1
fi

echo "Deploying to Google Cloud Run..."
if ! gcloud run deploy $INSTANCE_NAME \
    --image $FULL_IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --service-account $SERVICE_ACCOUNT \
    --env-vars-file "$SCRIPT_DIR/.env.$ENV" \
    --quiet; then
    echo "Error: Deployment to Cloud Run failed"
    exit 1
fi

echo "Deployment complete for $ENV environment!" 