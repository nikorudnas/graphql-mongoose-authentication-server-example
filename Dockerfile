FROM mhart/alpine-node:11

# Create app directory
WORKDIR /usr/src/graphql-server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 4000

CMD [ "npm", "run", "docker" ]
