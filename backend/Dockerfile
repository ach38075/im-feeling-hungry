FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

ENV MONGODB_USERNAME=cs4050-project
ENV MONGODB_PASSWORD=LBVL3KUfVmIe8BnJ

CMD ["npm", "start"]

