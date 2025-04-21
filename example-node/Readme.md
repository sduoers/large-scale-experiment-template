# Top-1M Websites Wordcount

Imagine that we are writing a paper to submit into TheWeb conferences. After a lot of thought we come up with an interesting research question that we believe will be interesting to others. 

RQ: Is there any correlation between number of words on main page and popularity of the website?

For that we need to run an experiment to run a large-scale experiment to analyze the main pages of Top-1M websites.


## Instructions:
1. Run docker instance: `docker run -v /home/thehack/Documents/database/redis:/data --name myredis -p 6379:6379 -d redis redis-server --save 60 1 --loglevel warning`
2. Add jobs into queue: `node create-queueu.js --queue top1m --limit 10 --file tranco_W8K39.csv`
3. Start the workers: `node worker.js --queue top1m`
