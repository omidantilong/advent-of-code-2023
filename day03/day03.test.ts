import { it, expect } from "vitest"
import { parseSchematic, getSumParts, getGearRatios } from "./day03"

const testData = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

const lines = testData.trim().split("\n")

it("finds positions of numbers and symbols", () => {
    const slicedTestData = lines.slice(0, 4)
    const { numbers, symbols } = parseSchematic(slicedTestData)
    expect(numbers).toStrictEqual([
        { x0: -1, x1: 3, y0: -1, y1: 1, val: 467 },
        { x0: 4, x1: 8, y0: -1, y1: 1, val: 114 },
        { x0: 1, x1: 4, y0: 1, y1: 3, val: 35 },
        { x0: 5, x1: 9, y0: 1, y1: 3, val: 633 },
    ])

    expect(symbols).toStrictEqual([
        { x: 3, y: 1, val: "*" },
        { x: 6, y: 3, val: "#" },
    ])
})

it("sums parts with adjacent symbols", () => {
    expect(getSumParts(lines)).toBe(4361)
})

it("finds gear ratios", () => {
    expect(getGearRatios(lines)).toBe(467835)
})
