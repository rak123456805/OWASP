# Build stage
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
# Root package.json now includes all required dependencies for gateway and chatbot

# Install dependencies
RUN npm install --include=dev

# Copy source
COPY . .

# Build the frontend
RUN npm run build

# Expose the gateway port
EXPOSE 10000

# Set production environment
ENV NODE_ENV=production

# Start the gateway server
CMD ["npm", "start"]
