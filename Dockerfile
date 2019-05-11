FROM node:10.15-jessie
MAINTAINER Family Hope Training

###
# build
###

# working directory for app code
WORKDIR /app
COPY . /app
COPY pack*.json ./
RUN npm ci

EXPOSE 3000
CMD ["npm", "start"]
