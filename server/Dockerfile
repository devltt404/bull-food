# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN pnpm install

# Copy all files from the current directory to the working directory
COPY . .

# Creates a "dist" folder with the production build
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 4000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

