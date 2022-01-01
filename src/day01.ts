import is_number from "is-number";

export function challenge(readings: Array<string>) {
	var i: number = 0;
	var lastReading: number = Number.NaN;
	readings.forEach((reading: string) => {
		if (is_number(reading)) {
			var numericReading: number = Number(reading);
			if (numericReading > lastReading && lastReading != Number.NaN) {
				i++;
			}
			lastReading = numericReading;
		}
	});

	console.log(i);
}

export function bonus(readings: Array<string>) {
	var i: number = 0;
	var lastWindow: number = Number.NaN;
	var lastReading: number = Number.NaN;
	var secondLastReading: number = Number.NaN;

	readings.forEach((reading: string) => {
		if (is_number(reading)) {
			var numericReading: number = Number(reading);
			if(lastReading != Number.NaN && secondLastReading != Number.NaN && (lastReading + secondLastReading + numericReading) > lastWindow)
			{
				i++;
			}
			lastWindow = lastReading + secondLastReading + numericReading;
			secondLastReading = lastReading;
			lastReading = numericReading;
		}
	});

	console.log(i);
}
