FROM node:8.5.0

ENV HOME /opt/qix-graphql
RUN mkdir -p $HOME
WORKDIR $HOME

COPY index.js package.json ./

RUN npm install -g nodemon && npm install

COPY /src ./src/

EXPOSE 3001

CMD ["npm", "run", "start"]
