import is_number from 'is-number';

export function challenge(moves: Array<string>) {
	var [xPos, yPos]: [number, number] = [0, 0];
	moves.forEach((move: string, index: number) => {
		var directionAndMagnitude: Array<string> = move.split(' ');
		if (is_number(directionAndMagnitude[1])) {
			var direction: string = directionAndMagnitude[0];
			var magnitude: number = Number(directionAndMagnitude[1]);

			switch (direction) {
				case 'forward':
					xPos += magnitude;
					break;
				case 'up': // We're interested in depth, so up is negative
					yPos -= magnitude;
					break;
				case 'down':
					yPos += magnitude;
					break;
				default:
					console.error(
						`Move #${index}: Invalid direction ${direction}`
					);
			}
		} else {
			console.error(
				`Move #${index}: Non-numeric magnitude ${directionAndMagnitude[1]}`
			);
		}
	});

	console.log(`Horizonal position: ${xPos}\tDepth: ${yPos}\tProduct: ${xPos * yPos}`);
}

export function bonus(moves: Array<string>) {
	var [xPos, yPos]: [number, number] = [0, 0];
	var aim: number = 0;
	moves.forEach((move: string, index: number) => {
		var directionAndMagnitude: Array<string> = move.split(' ');
		if (is_number(directionAndMagnitude[1])) {
			var direction: string = directionAndMagnitude[0];
			var magnitude: number = Number(directionAndMagnitude[1]);

			switch (direction) {
				case 'forward':
					xPos += magnitude;
					yPos += (aim * magnitude);
					break;
				case 'up': // Up still negative
					aim -= magnitude;
					break;
				case 'down':
					aim += magnitude;
					break;
				default:
					console.error(
						`Move #${index}: Invalid direction ${direction}`
					);
			}
		} else {
			console.error(
				`Move #${index}: Non-numeric magnitude ${directionAndMagnitude[1]}`
			);
		}
	});

	console.log(`Horizonal position: ${xPos}\tDepth: ${yPos}\tProduct: ${xPos * yPos}`);
}