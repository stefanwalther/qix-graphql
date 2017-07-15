FROM node:v8.1.4

ENV HOME /home
RUN mkdir -p $HOME
WORKDIR $HOME

COPY index.js package.json ./

RUN npm install

COPY /src ./src/

EXPOSE 3001

CMD ["npm", "run", "start"]
