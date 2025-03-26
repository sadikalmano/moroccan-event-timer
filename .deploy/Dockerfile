
# Use a Node.js base image to build the app
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package.json yarn.lock* package-lock.json* ./

RUN npm install date-fns@3.6.0

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite project for production
RUN npm run build

# Use a smaller image to serve the build files
FROM nginx:alpine AS production

# Copy the build output from the build stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that the app will run on
EXPOSE 80

# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]
