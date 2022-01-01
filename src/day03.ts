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

    console.log(`Gamma: ${gammaValue}\tEpsilon: ${epsilonValue}\tProduct: ${gammaValue * epsilonValue}`);
}