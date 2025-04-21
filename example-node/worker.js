/**
 * You can update this files as much as you want.
 * For example:
 * 1. add extra dependencies such as mongodb, @octokit/rest
 * 2. add extra options 
 * 3. update the name of the log filenames
 */
import { Worker } from "bullmq";
import { ArgumentParser } from "argparse";
import * as winston from "winston";

const parser = new ArgumentParser({
    description: "Worker to process the jobs"
});

parser.add_argument("-q", "--queue", {
    type: "str",
    required: true,
    default: "myqueue",
    help: "Name of the queue that contains jobs"
});

const { queue } = parser.parse_args();

// creating the looger
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            level: 'debug'
        }),
        new winston.transports.File({
            level: 'warn',
            filename: `jobs.errors.log` // feel free to update the log filename
        }),
        new winston.transports.File({
            level: 'info',
            filename: `jobs.info.log` // feel free to update the log filename
        })
    ]
})

const worker = new Worker(queue, async job => {

    logger.debug(`${job.name} started`);
    
    // let response = await fetch(job.name);
    // let response = await fetch(job.name.split(',')[1]);
    let url = job.name.split(',')[1];
    let response = await fetch(`https://${url}`);


    if (!response.ok) {
        throw new Error(`Failed to fetch ${job.name}. Status: ${response.status}`)
    }

    let content = await response.text();

    return content.split(' ').length;
})

worker.on("completed", (job, result) => {
    logger.info(`${job.name}: ${result}`);
})

worker.on("failed", async (job, err) => {
    logger.error(`${job.name} ${err.name} ${err.message}`);
    // NOTHING TO DO HERE
})

// https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
