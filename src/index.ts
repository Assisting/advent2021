import * as readline from "node:readline";
import { challenge } from "./daytwo";

var rl = readline.createInterface({
	input: process.stdin,
});

var lines: Array<string> = [];

rl.on("line", (line) => {
	if (!isBlankString(line)) {
		lines.push(line);
	} else {
		rl.close();
		challenge(lines);
	}
});

function isBlankString(inputString: string) {
	return inputString === null || inputString.match(/^ *$/) !== null;
}
