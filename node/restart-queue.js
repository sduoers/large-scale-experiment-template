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

const {name} = parser.parse_args();

// create the queue with specific name
const queue = new Queue(name);
console.log(`retrying failed jobs in ${name}`);
await queue.retryJobs();
await queue.close();
console.log(`connection closed`);
