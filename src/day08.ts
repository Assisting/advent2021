export function challenge(lines: Array<string>) {
    var [_, segmentsOutput]: [Array<Array<string>>, Array<Array<string>>] = puzzleInputToSegments(lines);
    var acc: number = 0;
    segmentsOutput.forEach(segments => segments.forEach(segment => {
        if (segment.length == 2 || segment.length == 3 || segment.length == 4 || segment.length == 7) {
            acc++;
        }
    }));

    console.log(`Total 1s, 4s, 7, and 8s: ${acc}`);
}

export function bonus(lines: Array<string>) {
    var [segmentsInput, segmentsOutput]: [Array<Array<string>>, Array<Array<string>>] = puzzleInputToSegments(lines);

    var acc: number = 0;
    for (var entry: number = 0; entry < segmentsInput.length; entry++) {
        var decoder: Array<Array<string>> = []

        decoder[8] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        segmentsInput[entry].forEach((segments: string) => {
            var segmentsArray: Array<string> = segments.split('').sort();
            if (segments.length == 2) {
                decoder[1] = segmentsArray;
            } else if (segments.length == 3) {
                decoder[7] = segmentsArray;
            } else if (segments.length == 4) {
                decoder[4] = segmentsArray;
            }
        })

        var inFourButNotOne = materialNonimplication(decoder[4], decoder[1]);

        segmentsInput[entry].forEach((segments: string) => {
            var segmentsArray: Array<string> = segments.split('').sort();
            if (segments.length == 5) {
                if (isSuperset(segmentsArray, inFourButNotOne)) {
                    decoder[5] = segmentsArray;
                } else if (isSuperset(segmentsArray, decoder[7])) {
                    decoder[3] = segmentsArray;
                } else {
                    decoder[2] = segmentsArray;
                }
            } else if (segments.length == 6) {
                if (isSuperset(segmentsArray, decoder[4])) {
                    decoder[9] = segmentsArray;
                } else if (isSuperset(segmentsArray, decoder[7])) {
                    decoder[0] = segmentsArray;
                } else {
                    decoder[6] = segmentsArray;
                }
            }
        })

        acc += convertSegmentsToFourDigitNumber(segmentsOutput[entry], decoder);
    }

    console.log(`Final sum: ${acc}`);
}

function puzzleInputToSegments(input: Array<string>): [Array<Array<string>>, Array<Array<string>>] {
    var segmentsInputAndOutput: Array<Array<string>> = input.map(line => line.split(' | '));
    return [segmentsInputAndOutput.map(segments => segments[0].split(' ')), segmentsInputAndOutput.map(segments => segments[1].split(' '))];
}

/**
 * Returns the set of items in A that are not in B; notated A&(~B) or A -/-> B
 *      eg. [1, 2, 3, 4, 5] -/-> [2, 3] = [1, 4, 5]
 * @param a The first set; items that can be returned
 * @param b The second set; the items that cannot be returned
 */
function materialNonimplication(a: Array<string>, b: Array<string>): Array<string> {
    return a.filter(item => b.indexOf(item) == -1);
}

/**
 * Returns true if the set is a superset of the proposed subset
 *      eg. [1, 2, 4, 5] is a superset of [1, 4]
 * @param set The set to test
 * @param proposedSubset The items which must be contained in the set
 */
function isSuperset(set: Array<string>, proposedSubset: Array<string>): boolean {
    return proposedSubset.every(item => set.indexOf(item) != -1);
}

/**
 * Given the puzzle's output and the array to decode them, returns the final 4 digit result
 * @param outputSegments The 4 digit obfuscalted value, as an array of string values.
 * @param decoderRing An array of arrays of degments, where the value at index 0 decodes for digit 0, 1 for 1, etc.
 * @returns The 4 digit cleartext value
 */
function convertSegmentsToFourDigitNumber(outputSegments: Array<string>, decoderRing: Array<Array<string>>): number {
    var result: string = ''
    outputSegments.forEach((segments: string, inverseTensPlace: number) => {
        var digit: number = decoderRing.findIndex(decoder => {
            return decoder.length == segments.length && decoder.every(segment => segments.indexOf(segment) != -1);
        });

        result += digit;
    });
    return Number(result);
}