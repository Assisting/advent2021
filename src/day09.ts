import is_number from "is-number";

export function challenge(lines: Array<string>) {
    var heightmap: Array<Array<number>> = lines.map(line => {
        return line.split('').map(char => {
            if (!is_number(char)) {
                throw `Found non-numeric character ${char}`;
            }
            return Number(char);
        });
    });

    console.log(sumRiskLevel(heightmap));
}

function sumRiskLevel(heights: Array<Array<number>>): number {
    var acc = 0;
    for (var row = 0; row < heights.length; row++) {
        for (var col = 0; col < heights[0].length; col++) {
            const entry = heights[row][col];
            var lowestPoint = true;
            if (row > 0 && entry >= heights[row-1][col]) {
                lowestPoint = false;
            } else if (row < heights.length-1 && entry >= heights[row+1][col]) {
                lowestPoint = false;
            } else if (col > 0 && entry >= heights[row][col-1]) {
                lowestPoint = false;
            } else if (col < heights[0].length-1 && entry >= heights[row][col+1]) {
                lowestPoint = false;
            }

            if (lowestPoint) {
                acc += entry + 1;
            }
        }
    }

    return acc;
}