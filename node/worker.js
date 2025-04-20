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
    default: "metadata",
    help: "Name of the queue that contains names of the repositories to clone"
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
    // ===================================
    // UPDATE HERE
    // job.name contains a single line from input file
    // ADD LOGIC TO PROCESS YOUR JOB
    // ===================================
    
})

worker.on("completed", job => {
    logger.info(`${job.name} success`);
    
    // ===================================
    // UPDATE HERE. WHAT YOU WANT TO DO IF THE JOB SUCCEEDS?
    // FOR EXAMPLE: cleaning the artifacts
    // ===================================
})

worker.on("failed", async (job, err) => {
    logger.error(`${job.name} ${err.name} ${err.message}`);
    // ===================================
    // UPDATE HERE. WHAT YOU WANT TO DO IF THE JOB FAILS?
    // FOR EXAMPLE: cleaning the artifacts
    // ===================================
})

// https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
