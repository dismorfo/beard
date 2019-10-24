# Usage example
#
# 1) Build container image
# $ docker build -t dismorfo/beard:latest .
# 2) Run container
# $ docker run -t --name=dismorfo-beard -p 8080:80 dismorfo/beard:latest

<<<<<<< HEAD
FROM node:8

=======
>>>>>>> 1030f5231108025d8c1e3792e8e29f543e7a0ee6
# Set the working directory to /app
WORKDIR /app

ADD package.json .

# Copy the current directory contents into the container at /app
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install && npm cache clean --force && npm rebuild node-sass

ADD . .

CMD [ "npm", "start" ]

