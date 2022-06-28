FROM node:lts-slim
WORKDIR home/node/meaer
COPY package.json .
RUN npm install
COPY . .
# RUN npm run teste
RUN npm run build
CMD npm run start