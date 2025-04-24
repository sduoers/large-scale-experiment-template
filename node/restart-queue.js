import { Queue } from "bullmq";
import { ArgumentParser } from "argparse";

const parser = new ArgumentParser({
    description: "Script to retry failed jobs inside the queue"
});

parser.add_argument("-q", "--queue", {
    required: true,
    type: "str",
    help: "Name of the queue you are about to create"
});

const args = parser.parse_args();
console.log("parsed args:", args)
// create the queue with specific name
const queue = new Queue(args.queue);
console.log(`retrying failed jobs in ${args.queue}`);
await queue.retryJobs();
await queue.close();
console.log(`connection closed`);
