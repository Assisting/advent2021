import * as readline from 'node:readline';
import { bonus } from './day03';

var rl = readline.createInterface({
	input: process.stdin,
});

var lines: Array<string> = [];

rl.on('line', (line) => {
	if (!isBlankString(line)) {
		lines.push(line);
	} else {
		rl.close();
		bonus(lines);
	}
});

function isBlankString(inputString: string) {
	return inputString === null || inputString.match(/^ *$/) !== null;
}
