import is_number from "is-number";

export function challenge(inputLines: Array<string>) {
    // In the base challenge, we discard diagnomal lines.
    plotDangerousAreas(inputLines, false);
}

export function bonus(inputLines: Array<string>) {
    // In the bonus challenge, we include diagnomal lines.
    plotDangerousAreas(inputLines, true);
}

function plotDangerousAreas(inputLines: Array<string>, includeDiagonals: boolean) {
    var ventLines: Array<ThermalVentLine> = [];
    var [maxX, maxY]: [number, number] = [0, 0];

    inputLines.forEach((inputLine: string) => {
        var startAndEnd: Array<string> = inputLine.split(' -> ');
        var startPoint: Array<number> = startAndEnd[0].split(',').map((start: string) => {
            if (!is_number(start))
                throw `Found non-numeric entry ${start}`;
            return Number(start);
        });
        var endPoint: Array<number> = startAndEnd[1].split(',').map((end: string) => {
            if (!is_number(end))
                throw `Found non-numeric entry ${end}`;
            return Number(end);
        });
        var ventLine = new ThermalVentLine(startPoint, endPoint)

        if (ventLine.isHorizontal() || ventLine.isVertical() || includeDiagonals) {
            ventLines.push(ventLine);
            maxX = Math.max(maxX, ventLine.maximumXPos());
            maxY = Math.max(maxY, ventLine.maximumYPos());
        }
    });

    var oceanFloor: Array<Array<number>> = populateOceanFloor(ventLines, maxX, maxY);

    var dangerousAreas: number = 0;
    for (var yPos = 0; yPos <= maxY; yPos++) {
        for (var xPos = 0; xPos <= maxY; xPos++) {
            if (oceanFloor[xPos][yPos] > 1) {
                dangerousAreas++;
            }
        }
    }

    console.log(dangerousAreas);
}

function populateOceanFloor(ventLines: Array<ThermalVentLine>, maxX: number, maxY: number): Array<Array<number>> {
    var oceanFloor: Array<Array<number>> = [];
    for (var xPos = 0; xPos <= maxX; xPos++) {
        var yEntry: Array<number> = [];
        for (var yPos = 0; yPos <= maxY; yPos++) {
            yEntry.push(0);
        }
        oceanFloor.push(yEntry);
    }
    ventLines.forEach((ventLine: ThermalVentLine) => {
        if (ventLine.isVertical()) {
            for (var i: number = ventLine.minimumYPos(); i <= ventLine.maximumYPos(); i++) {
                oceanFloor[ventLine.maximumXPos()][i] += 1;
            }
        } else {
            var slope: number = ventLine.slope();
            var yPos: number = ventLine.start[1];
            for (var xPos: number = ventLine.start[0]; xPos <= ventLine.end[0]; xPos++) {
                oceanFloor[xPos][yPos] += 1;
                yPos += slope;
            }
        }
    })

    return oceanFloor;
}

class ThermalVentLine {
    start: Array<number> = [0, 0];
    end: Array<number> = [0, 0];

    constructor(start: Array<number>, end: Array<number>) {
        this.start = start;
        this.end = end;
    }

    public maximumXPos(): number {
        return Math.max(this.start[0], this.end[0]);
    }

    public maximumYPos(): number {
        return Math.max(this.start[1], this.end[1]);
    }

    public minimumXPos(): number {
        return Math.min(this.start[0], this.end[0]);
    }

    public minimumYPos(): number {
        return Math.min(this.start[1], this.end[1]);
    }

    /** Returns true if this ThermalVentLine is vertical; the y coordinate is the same at both ends. */
    public isHorizontal(): boolean {
        return (this.start[1] == this.end[1]);
    }

    /** Returns true if this ThermalVentLine is horizontal; the x coordinate is the same at both ends. */
    public isVertical(): boolean {
        return (this.start[0] == this.end[0]);
    }

    /**
     * Returns the slope, indicating the direction of the line (positive if line is moving up as X increases).
     * Will swap start and end points if end is behind start. 
    */
    public slope(): number {
        if (this.end[0] < this.start[0]) {
            var swap: Array<number> = this.start;
            this.start = this.end;
            this.end = swap;
        }
        return (this.end[1] - this.start[1]) / (this.end[0] - this.start[0]);
    }
}