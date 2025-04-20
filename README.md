# experiment-template
As researchers we often need to set up large scale experiments that need to process thousands of jobs. This repository provides helpful tips and scripts to set up such experiments.

There are two main folders inside this repository, which are: (1) `node/` and (2) `python/`. Each folder contains scripts to set up experiment in specific ecosystem/language (node and python). The scripts goal is almost identical, which is to help create queue of jobs, and help to process them. You can use either of them. More details about each set up can be found inside dedicated folder. 

## Single script (do NOT use this for complicated jobs)
When asked to process jobs stored inside single input file, we tend to start coding single python/javascript/bash script that will read the file line-by-line and perform some actions. This approach is illustrated in below Figure-1. 

![Single](https://github.com/sduoers/large-scale-experiment-template/blob/main/single-worker.png?raw=true)

While it is OK for simple cases, such as renaming/copying/removing bunch of files, this approach is not suited for complicated tasks, such as visit the website and perform some analysis on the web page. There are some difficulties that we need to take into account when dealing with complicated tasks. For example:

1. What will happen if all of sudden power goes out and our experiment stops. How can we restart it from where we left? That is right if we use the single script approach we will not be able to restart from where we left last time (at least without some shenanigans). We will need to start from the beginning of our input file.
2. How can we parallelize our jobs, aka increase number of workers? Well, We can't because all of our workers will be reading the same file from the start. Unless we again customize each worker to start reading from different places of the file or communicate with each other and etc. 
3. What if even if we can parallelize the workers after a lot of shenanigans, our machine can not handle multiple workers, and we need to use different machines for different workers?
4. and etc...

Instead of trying to solve all of these complicated scenarious, we can just use already well-known approach that is used by industry to run our large-scale experiments, which is using message-queue system.  

## Using queue (use this for complicated jobs)

![Redis-queue](https://github.com/sduoers/large-scale-experiment-template/blob/main/redis-queue.png?raw=true)
