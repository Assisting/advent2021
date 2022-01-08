import is_number from "is-number";

export function challenge(inputLines: Array<string>) {
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

        // In the base challenge, we discard diagnomal lines.
        if (ventLine.isHorizontal() || ventLine.isVertical()) {
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
                if (oceanFloor[ventLine.maximumXPos()][i] == undefined) {
                    oceanFloor[ventLine.maximumXPos()][i] = 0;
                }
                oceanFloor[ventLine.maximumXPos()][i] += 1;
            }
        } else if (ventLine.isHorizontal()) {
            for (var i: number = ventLine.minimumXPos(); i <= ventLine.maximumXPos(); i++) {
                if (oceanFloor[i][ventLine.maximumYPos()] == undefined) {
                    oceanFloor[i][ventLine.maximumYPos()] = 0;
                }
                oceanFloor[i][ventLine.maximumYPos()] += 1;
            }
        } else {
            throw `Diagonal line snuck into vent array`;
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
}