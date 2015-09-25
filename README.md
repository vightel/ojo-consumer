# OJO Consumer

Install this repository

```bash
$ cd $WORKSHOP_DIR
$ git clone https://github.com/vightel/ojo-consumer.git
```

## Pre-Requisites

You will need to tell the consumer the address of the publisher

Customize your environment

```bash
$ cp envs_copy.sh envs_docker.sh
$ vi envs_docker.sh
```

## Running the Consumer

You can run it directly on your own machine if you have node installed

```bash
$ cd ojo-consumer
$ nom install
$ source envs_docker.sh
$ node server.js
```

Or build a container to run it

```bash
$ docker-machine env default
$ eval "$(docker-machine env default)"
$ docker build -t ojo-consumer .
$ docker run --name ojo-consumer -it --rm ojo-consumer
```
And start the node server.  If you use the container, remember the Virtual Machine IP address and use it instead of localhost

Start the browser
open localhost:3000

