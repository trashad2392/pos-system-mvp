FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# The command to run the development server
CMD ["npm", "run", "dev"]