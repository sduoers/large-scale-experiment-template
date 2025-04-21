/**
 * Author: Igibek
 * Description: We are using bullmq as a job queue for running experiments. 
 * Due to rate limiting in GitHub, we define rate limiting for all workers. 
 * When workers hit rate limit, Bullmq will move all the jobs to "delayed" queue. 
 * To restart the jobs from "delayed" queue, QeueScheduler must run in the background.
 * more here: https://docs.bullmq.io/guide/jobs/delayed 
 */
import { Queue } from "bullmq";
import { ArgumentParser, BooleanOptionalAction } from "argparse";

const parser = new ArgumentParser({
    description: "Script to pause/resume jobs inside the queue"
});

parser.add_argument("-q", "--queue", {
    required: true,
    type: "str",
    help: "Name of the queue you are about to pause"
});

parser.add_argument("-r", "--resume", {
    help: "Resume the active queue",
    action: "store_true"
});

parser.add_argument("-p", "--pause", {
    help: "Pause the active queue",
    action: "store_true"
});

const {queue, resume, pause} = parser.parse_args();

const bullmq = new Queue(queue);

 if (resume && await bullmq.isPaused()) {
     console.log(`resuming the ${queue} queue`);
     await bullmq.resume();
 } 
 
 if (pause && await bullmq.isPaused() === false){
     console.log(`pausing the ${queue} queue`);
     await bullmq.pause();
 }

console.log(await bullmq.count());
await bullmq.close();
