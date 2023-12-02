import { it, expect } from "vitest"

import { getSumAndPower, getGameData } from "./day02"

const testData = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`
const lines = testData.trim().split("\n")
const limits = { blue: 14, green: 13, red: 12 }

it("calculates game possibility and power", () => {
    expect(getGameData(lines[0], limits)).toStrictEqual({
        id: 1,
        possible: true,
        power: 48,
    })

    expect(getGameData(lines[1], limits)).toStrictEqual({
        id: 2,
        possible: true,
        power: 12,
    })

    expect(getGameData(lines[2], limits)).toStrictEqual({
        id: 3,
        possible: false,
        power: 1560,
    })
})

it("calculates game sum and power", () => {
    const limits = { blue: 14, green: 13, red: 12 }

    expect(getSumAndPower(lines, limits)).toStrictEqual({
        summed: 8,
        power: 2286,
    })
})
