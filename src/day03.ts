export function challenge(entries: Array<string>) {
	var counters: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	entries.forEach((entry: string) => {
		entry.split('').forEach((bit: string, index: number) => {
			if (bit == '1') {
				counters[index] += 1;
			}
		});
	});

	var [gamma, epsilon]: [string, string] = ['', ''];
	counters.forEach((counter: number, index: number) => {
		if (counter / entries.length >= 0.5) {
			gamma = gamma += '1';
			epsilon = epsilon += '0';
		} else {
			gamma = gamma += '0';
			epsilon = epsilon += '1';
		}
	});

	var gammaValue: number = parseInt(gamma, 2);
	var epsilonValue: number = parseInt(epsilon, 2);

	console.log(
		`Gamma: ${gammaValue}\tEpsilon: ${epsilonValue}\tProduct: ${
			gammaValue * epsilonValue
		}`
	);
}

export function bonus(entries: Array<string>) {
	var counters: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var [gammaList, epsilonList]: [Array<string>, Array<string>] = [[], []];
	entries.forEach((entry: string) => {
		gammaList.push(entry);
		epsilonList.push(entry);
	});

	for (var i = 0; i < counters.length; i++) {
		if (gammaList.length > 1) {
			var gammaCounter: number = 0;
			gammaList.forEach((gamma: string) => {
				if (gamma.charAt(i) == '1') {
					gammaCounter++;
				}
			});
			gammaList = gammaList.filter(
				(gamma) =>
					Number(gamma.charAt(i)) ==
					Math.round(gammaCounter / gammaList.length)
			);
		}

		if (epsilonList.length > 1) {
			var epsilonCounter: number = 0;
			epsilonList.forEach((epsilon) => {
				if (epsilon.charAt(i) == '1') {
					epsilonCounter++;
				}
			});
			epsilonList = epsilonList.filter(
				(epsilon) =>
					Number(epsilon.charAt(i)) !=
					Math.round(epsilonCounter / epsilonList.length)
			);
		}
	}

	// Each list should now only have 1 item each
	var gammaValue: number = parseInt(gammaList[0], 2);
	var epsilonValue: number = parseInt(epsilonList[0], 2);

	console.log(
		`Gamma: ${gammaValue}\tEpsilon: ${epsilonValue}\tProduct: ${
			gammaValue * epsilonValue
		}`
	);
}
