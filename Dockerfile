FROM node:8

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

