FROM node:12 as develop
LABEL maintainer 'Vinicius Marques <vncsmrqs@gmail.com'
COPY ./src /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
