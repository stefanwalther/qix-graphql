FROM node:8.6.0

ENV HOME /opt/qix-graphql
RUN mkdir -p $HOME
WORKDIR $HOME

COPY index.js package.json ./

RUN npm install -g nodemon && npm install

COPY /src ./src/

EXPOSE 3004

CMD ["npm", "run", "start"]
