/** Command-line tool to generate Markov text. */


const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


/* Make markov machine from text and generate */

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

/* read file and generate text */

function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

/* read URL and make text */

async function makeURLText(url) {
    let resp;

    try {
        resp = await axios.getAdapter(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data)
}

/* cmdline */

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
}

else if (method === "url") {
    makeURLText(path);
}

else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}

