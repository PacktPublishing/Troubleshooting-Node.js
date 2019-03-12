# set base image to our desired version of node
FROM node:10.15.3-alpine

# Expose the app port
EXPOSE 10040

# copy files from this directory '.' to '/var/www'
ADD . /var/www

# set cwd for RUN and CMD
WORKDIR /var/www

# install dependencies
RUN npm install --production

# start the app server
CMD npm start

# profit || throw new Error('unable to profit')
