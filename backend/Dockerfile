# Use the official Node.js 18 image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of your backend application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD [ "node", "index.js" ]