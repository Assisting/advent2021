export function challenge(lines: Array<string>) {
    var fish: Array<number> = lines[0].split(',').map(str => Number(str));
    simulateFish(fish, 80);
}

export function bonus(lines: Array<string>) {
    var fish: Array<number> = lines[0].split(',').map(str => Number(str));
    simulateFish(fish, 256);
}

function simulateFish(startingFish: Array<number>, numDays: number) {
    var fishStates: Array<bigint> = [];
    startingFish.forEach((f: number) => {
        fishStates[f] = (fishStates[f] ?? 0n) + 1n;
    })
    
    for (var day = 0; day < numDays; day++) {
        let newFishStates: Array<bigint> = [];
        newFishStates[8] = fishStates[0];
        newFishStates[7] = fishStates[8];
        newFishStates[6] = BigInt(fishStates[7] ?? 0) + BigInt(fishStates[0] ?? 0);
        newFishStates[5] = fishStates[6];
        newFishStates[4] = fishStates[5];
        newFishStates[3] = fishStates[4];
        newFishStates[2] = fishStates[3];
        newFishStates[1] = fishStates[2];
        newFishStates[0] = fishStates[1];

        fishStates = newFishStates;
    }

    var totalCount: bigint = 0n;
    for (var i = 0; i < fishStates.length; i++) {
        totalCount += BigInt(fishStates[i]);
    }

    console.log(totalCount.toString());
}