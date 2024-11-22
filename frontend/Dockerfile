# Step 1: Use an official Node.js image to build the frontend
FROM node:20-alpine As builder

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of your React files and build the app
COPY . .
RUN npm run build

# Step 5: Use NGINX to serve the static files
FROM nginx:alpine

# Step 6: Copy the build folder to the NGINX container
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

