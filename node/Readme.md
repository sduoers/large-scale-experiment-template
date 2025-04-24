# Experiment Template with NodeJS

Under this folder you will find Node.js implementation of our queue architecture for large scale experiments. This particular implementation uses [BullMQ](https://docs.bullmq.io/) queue system. You can check out the detailed documentation here: https://docs.bullmq.io/

## Instructions
Run `npm install` which will install all of the required npm dependencies. That is it!

**Note:** _You will need Redis installed on localhost. You should be able to access the Redis using host `127.0.0.1` and port `6379`. Otherwise, you will need to update connection strings in all of the files. You can achieve it buy running Redis docker image using command: `docker run -v /path/to/host/redis/data:/data --name myredis -d redis redis-server --save 60 1 --loglevel warning`_

## Files:
1. [create-queue.js](#create-queuejs)
3. [restart-queue.js](#restart-queuejs)
4. [status-queue.js](#status-queuejs)
5. [worker.js](#workerjs) (_UPDATE THIS FILE_)


### create-queue.js
This file is responsible to populate queue of jobs, that are going to be processed inside worker.js.
Options:
- `--queue`, `-q` - name of the queue that you want to create
- `--file`, `-f` - input file name
- `--limit`, `-l` - maximum number of jobs to add. While testing your `worker.js` it is good idea to push limited number of jobs
- `--skip`, `-s` - number of lines to skip from input file. You can use this flag to skip the lines from input file that were already added, or that you are not planning to add.

### restart-queue.js
Sometimes the `worker.js` will contain the bugs that you detected later. In this case, you may want to restart the failed jobs of the queue. This file is responsible for restarting the failed jobs inside the specified queue.
Options:
- `--queue`, `-q` - required. name of the queue
- `--limit`, `-l` - optional. Number of failed jobs you want to restart.

### status-queue.js
This file is responsible for **pausing**/**resuming** of the queue if necessary. Also, it shows number of jobs that are waiting to be processed.
Options:
- `--queue`, `-q` - required. Name of the job
- `--pause`, `-p` - optional. Pauses the specified job
- `--resume`, `-r` - optional. Resumes already paused job

### worker.js
You will need to **UPDATE** this file. This file is responsible for processing individual jobs. Note: `job.name` will contain the line from the input file, that was provided in `create-queue.js` file.
Options:
- `--queue`, `-q` - required. Name of the queue from which to pull the jobs. 
