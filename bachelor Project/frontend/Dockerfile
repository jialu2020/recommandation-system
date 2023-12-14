# Use a specific version of node as the base image
FROM node:16-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all frontend code to the working directory
COPY . .

# Build the application
RUN npm install react@latest react-dom@latest
RUN npm run build

# Use nginx to deploy the React application
FROM nginx:alpine

# Copy the built files from the build stage to the nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Use the default start command for nginx
CMD ["nginx", "-g", "daemon off;"]
