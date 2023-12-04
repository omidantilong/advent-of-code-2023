import { it, expect } from "vitest"
import { parseInput, parseCard, getTotalPoints, getTotalCards, extractCardNumbers } from "./day04"

const testData = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`

const lines = testData.trim().split("\n")

const parsedCard1 = {
    id: 1,
    copies: 1,
    wins: 4,
    sum: 8,
}

const parsedCard2 = {
    id: 2,
    copies: 1,
    wins: 2,
    sum: 2,
}

it("extracts numbers from string", () => {
    expect(extractCardNumbers(" 41 48 83 86 17 ")).toStrictEqual([41, 48, 83, 86, 17])
    expect(extractCardNumbers(" 83 86  6 31 17  9 48 53 ")).toStrictEqual([
        83, 86, 6, 31, 17, 9, 48, 53,
    ])
})

it("parses a single card", () => {
    expect(parseCard(lines[0], 0)).toStrictEqual(parsedCard1)
})

it("parses multiple cards", () => {
    expect(parseInput(lines.slice(0, 2).join("\n"))).toStrictEqual([parsedCard1, parsedCard2])
})

it("finds total winning points", () => {
    expect(getTotalPoints(testData)).toBe(13)
})

it("finds total number of cards", () => {
    expect(getTotalCards(testData)).toBe(30)
})
