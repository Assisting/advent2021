import is_number from 'is-number';
import leftPad from 'left-pad';

export function challenge(lines: Array<string>) {
	var numbersCalled: Array<number> = [];
	// The numbers called come in as comma-separated string values
	if (lines && lines[0]) {
		numbersCalled = lines
			.shift()!
			.split(',')
			.map((lineItem) => {
				if (is_number(lineItem)) {
					return Number(lineItem);
				} else {
					throw `Found non-number in first line ${lineItem}`;
				}
			});
	}

	// Subsequent lines represent bingo cards in groups of 5
	var bingoCards: Array<BingoCard> = [];
	if (lines.length % 5 == 0) {
		var numberOfCardsInInput: number = lines.length / 5;
		for (var i = 0; i < numberOfCardsInInput; i++) {
			var startIndex: number = 0 + i * 5;
			var numericCardArea: Array<Array<number>> = [];
			for (var row = 0; row < 5; row++) {
				var numericRow: Array<number> = [];
				numericRow.push(Number(lines[startIndex + row].slice(0, 2)));
				numericRow.push(Number(lines[startIndex + row].slice(3, 5)));
				numericRow.push(Number(lines[startIndex + row].slice(6, 8)));
				numericRow.push(Number(lines[startIndex + row].slice(9, 11)));
				numericRow.push(Number(lines[startIndex + row].slice(12, 14)));
				numericCardArea.push(numericRow);
			}

			bingoCards.push(new BingoCard(numericCardArea));
		}
	}

	numbersCalled.forEach((called: number) => {
		bingoCards.forEach((card: BingoCard, index: number) => {
			card.callNumber(called);
			if (card.isWinner()) {
				console.log(`Card #${index} won!`)
				card.printCard();
				var total: number = card.uncalledTotal();
				console.log(
					`Winning number call: ${called}\tScore: ${total}\tProduct: ${
						called * total
					}`
				);
				process.exit();
			}
		});
	});
}

class BingoCard {
	cardArea: Array<Array<number>> = [[]];

	public constructor(cardArea: Array<Array<number>>) {
		this.cardArea = cardArea;
	}

	/** A winning card is one with any complete row or column, but not diagonal */
	public isWinner(): boolean {
		return (
			this.columnWin() ||
			this.rowWin()
		);
	}

	private columnWin(): boolean {
		for (var col = 0; col < 5; col++) {
			var winner: boolean =
				Number.isNaN(this.cardArea[0][col]) &&
				Number.isNaN(this.cardArea[1][col]) &&
				Number.isNaN(this.cardArea[2][col]) &&
				Number.isNaN(this.cardArea[3][col]) &&
				Number.isNaN(this.cardArea[4][col]);
			if (winner) {
				return true;
			}
		}
		return false;
	}

	private rowWin(): boolean {
		for (var row = 0; row < 5; row ++) {
			if (
			Number.isNaN(this.cardArea[row][0]) &&
			Number.isNaN(this.cardArea[row][1]) &&
			Number.isNaN(this.cardArea[row][2]) &&
			Number.isNaN(this.cardArea[row][3]) &&
			Number.isNaN(this.cardArea[row][4])
			) {
				return true;
			}
		}
		return false;
	}

	/** Replaces the number called with NaN if it exists on the card */
	public callNumber(called: number) {
		for (var row = 0; row < 5; row++) {
			for (var col = 0; col < 5; col++) {
				if (this.cardArea[row][col] == called) {
					this.cardArea[row][col] = Number.NaN;
				}
			}
		}
	}

	/** Sums uncalled numbers on the card, returning the result */
	public uncalledTotal(): number {
		var acc: number = 0;
		this.cardArea.forEach((row: Array<number>) => {
			row.forEach((entry: number) => {
				if (!Number.isNaN(entry)) {
					acc += entry;
				}
			});
		});

		return acc;
	}

	/** Prints the card to the console */
	public printCard() {
		this.cardArea.forEach((row: Array<number>, index: number) => {
			var rowString = '';
			row.forEach((col: number) => {
				rowString += leftPad(col, 4, ' ');
				rowString += ' ';
			});
			console.log(rowString);
		});
		console.log();
	}
}
