import { it, expect } from "vitest"
import { extractMapDigits, getLowestValueFromSeeds, getLocation, getValueInRange } from "./day05"

const testData = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

const testMapData = `
seed-to-soil map:
50 98 2
52 50 48
`

const parsedData = {
    seeds: [79, 14, 55, 13],
    mappings: [
        [
            { d0: 50, d1: 51, s0: 98, s1: 99 },
            { d0: 52, d1: 99, s0: 50, s1: 97 },
        ],
        [
            { d0: 0, d1: 36, s0: 15, s1: 51 },
            { d0: 37, d1: 38, s0: 52, s1: 53 },
            { d0: 39, d1: 53, s0: 0, s1: 14 },
        ],
        [
            { d0: 49, d1: 56, s0: 53, s1: 60 },
            { d0: 0, d1: 41, s0: 11, s1: 52 },
            { d0: 42, d1: 48, s0: 0, s1: 6 },
            { d0: 57, d1: 60, s0: 7, s1: 10 },
        ],
        [
            { d0: 88, d1: 94, s0: 18, s1: 24 },
            { d0: 18, d1: 87, s0: 25, s1: 94 },
        ],
        [
            { d0: 45, d1: 67, s0: 77, s1: 99 },
            { d0: 81, d1: 99, s0: 45, s1: 63 },
            { d0: 68, d1: 80, s0: 64, s1: 76 },
        ],
        [
            { d0: 0, d1: 0, s0: 69, s1: 69 },
            { d0: 1, d1: 69, s0: 0, s1: 68 },
        ],
        [
            { d0: 60, d1: 96, s0: 56, s1: 92 },
            { d0: 56, d1: 59, s0: 93, s1: 96 },
        ],
    ],
}

it("extracts map digits", () => {
    expect(extractMapDigits(testMapData)).toStrictEqual([
        { d0: 50, d1: 51, s0: 98, s1: 99 },
        { d0: 52, d1: 99, s0: 50, s1: 97 },
    ])
})

// it("parses input", () => {
//     expect(parseInput(testData)).toStrictEqual(parsedData)
// })

it("finds a number in range", () => {
    expect(getValueInRange(79, parsedData.mappings[0])).toBe(81)
    expect(getValueInRange(14, parsedData.mappings[0])).toBe(14)
    expect(getValueInRange(55, parsedData.mappings[0])).toBe(57)
    expect(getValueInRange(13, parsedData.mappings[0])).toBe(13)

    expect(getValueInRange(81, parsedData.mappings[1])).toBe(81)
    expect(getValueInRange(14, parsedData.mappings[1])).toBe(53)
    expect(getValueInRange(57, parsedData.mappings[1])).toBe(57)
    expect(getValueInRange(13, parsedData.mappings[1])).toBe(52)

    expect(getValueInRange(81, parsedData.mappings[2])).toBe(81)
    expect(getValueInRange(53, parsedData.mappings[2])).toBe(49)
    expect(getValueInRange(57, parsedData.mappings[2])).toBe(53)
    expect(getValueInRange(52, parsedData.mappings[2])).toBe(41)
})

it("finds all mapped values", () => {
    expect(getLocation(79, parsedData.mappings)).toStrictEqual(82)
    expect(getLocation(14, parsedData.mappings)).toStrictEqual(43)
})

it("finds lowest location number from given seeds", () => {
    expect(getLowestValueFromSeeds(testData)).toBe(35)
    //expect(getLowestValueFromExpandedSeeds(testData)).toBe(46)
    //expect(solution2(testData)).toBe(46)
})
