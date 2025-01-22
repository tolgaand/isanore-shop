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
IMAGE_NAME=gcr.io/$PROJECT_ID/isanore-store
REGION=${REGION:-europe-west1}

# Get script directory and root directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

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

# Export variables for docker-compose
export IMAGE_NAME

# Build phase
echo "Building for $ENV environment..."
docker compose --file "$SCRIPT_DIR/Dockerfile.compose.yml" --env-file "$SCRIPT_DIR/.env.$ENV" config
docker compose --file "$SCRIPT_DIR/Dockerfile.compose.yml" --env-file "$SCRIPT_DIR/.env.$ENV" build

# Push phase
echo "Pushing to Google Container Registry..."
docker compose --file "$SCRIPT_DIR/Dockerfile.compose.yml" --env-file "$SCRIPT_DIR/.env.$ENV" push

echo "Deploying to Google Cloud Run..."
if ! gcloud run deploy $INSTANCE_NAME \
    --image $IMAGE_NAME:$ENV \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --quiet; then
    echo "Error: Deployment to Cloud Run failed"
    exit 1
fi

echo "Deployment complete for $ENV environment!" 