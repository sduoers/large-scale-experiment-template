import { Queue } from "bullmq";
import { ArgumentParser } from "argparse";
import * as fs from "node:fs";
import * as readline from "node:readline";

const parser = new ArgumentParser({
    description: "Script to create a queue from input file"
});

parser.add_argument("-q", "--queue", {
    required: true,
    type: "str",
    help: "Name of the queue you are about to create"
});
parser.add_argument("-f", "--file", {
    required: true,
    type: "str",
    help: "File which contains entries to add"
});

parser.add_argument("-s", "--skip", {
    required: false,
    default: 0,
    help: "Number of lines to skip from input file before adding jobs into queue",
    type: "int"
})

parser.add_argument("-l", "--limit", {
    required: false,
    default: 0,
    help: "Number of lines to use from the input file to add jobs into queue",
    type: "int"
})

let {queue, file, skip, limit} = parser.parse_args();

// check if the input file exists
if (fs.existsSync(file) == false) {
    console.error(`${file} does not exists`);
    process.exit(1);
}

// create the queue with specific name
const q = new Queue(queue);

const input = fs.createReadStream(file, {encoding: "utf-8"});
const rl = readline.createInterface({
    input: input,
    output: process.stdout,
    terminal: false
});

let counter = 0;
rl.on("line", (line) => {
    // skipping the lines before starting to add
    if (skip > 0) {
        skip--;
        return;
    }

    if (limit !== 0 && limit === counter) {
        rl.close();
    } else {
        counter++;
        q.add(line, {counter: counter}, {
            jobId: line
        });
        console.log(counter, line);
    }
});

rl.on("close", ()=>{
    q.close();
});
