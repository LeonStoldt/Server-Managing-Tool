# base image
FROM node:11

# set working directory
RUN mkdir /app
WORKDIR /app

# clone content
RUN apt-get update
RUN apt-get install -y git
RUN git clone https://github.com/LeonStoldt/Server-Managing-Tool.git .

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies using yarn
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile

# Copy all frontend stuff to new "app" folder
COPY . /app/

CMD ["./run.sh"]

EXPOSE 9000