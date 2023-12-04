import { loadData } from "../utils/helpers"

const dataFile = "./day03/day03.txt"

type NumMatch = {
    x0: number
    x1: number
    y0: number
    y1: number
    val: number
}

type SymMatch = {
    x: number
    y: number
    val: string
}

export const parseSchematic = (data: Array<string>) => {
    // Return a big array of every number and symbol in the input data
    // x0 = position of first character -1
    // x1 = position of last character
    // y0 = line number -1
    // y1 = line number + 1
    // val = number or symbol

    const numbers: Array<NumMatch> = []
    const symbols: Array<SymMatch> = []

    data.forEach((line: string, y: number) => {
        // Find all numbers
        Array.from(line.matchAll(/\d+/g)).forEach(({ 0: match, index }) => {
            numbers.push({
                x0: index! - 1,
                x1: index! + match.length,
                y0: y - 1,
                y1: y + 1,
                val: parseInt(match),
            })
        })

        // Find everything that isnt a number or a full stop
        Array.from(line.matchAll(/[^\d.]/g)).forEach(({ 0: match, index }) => {
            symbols.push({ x: index!, y, val: match })
        })
    })

    return { numbers, symbols }
}

export const isAdjacent = (n: NumMatch, s: SymMatch): boolean => {
    // If symbol x pos is greater or equal to number x0
    // and symbol x pos is less or eq to number x1
    // Then symbol is either 1 char before or after the number

    // If symbol y is either 1 less, 1 more or the same as number y
    // It is either on the line before or after or the same line

    // If all conditions are true then the symbol must be adjacent
    // horizontally, verticaly or diagonally

    return s.x >= n.x0 && s.x <= n.x1 && s.y >= n.y0 && s.y <= n.y1
}

export const getSumParts = (data: Array<string>): number => {
    const { numbers, symbols } = parseSchematic(data)

    let acc = 0

    // Filter the list of numbers by finding numbers than have an adjacent symbol
    // Could also use array.some() here but find exits after first match so might be faster?
    // So the filter condition is "is there a symbol adjacent to it"
    // Brain slightly melting

    numbers.filter((n) => symbols.find((s) => isAdjacent(n, s))).forEach(({ val }) => (acc += val))

    return acc
}

export const getGearRatios = (data: Array<string>): number => {
    const { numbers, symbols } = parseSchematic(data)
    let acc = 0

    // Filter the list of symbols so we only have *'s
    // Then for each entry in that list, find numbers that are adjacent to it
    // If there are 2 adjacent numbers then we have a match
    // Sum the values and add to accumulator

    symbols
        .filter(({ val }) => val === "*")
        .forEach((s) => {
            const adj = numbers.filter((n) => isAdjacent(n, s))
            acc += adj.length === 2 ? adj[0].val * adj[1].val : 0
        })

    return acc
}

export const init = async () => {
    const data = (await loadData(dataFile)).trim().split("\n")

    console.log("Solution 1: ", getSumParts(data))
    console.log("Solution 1: ", getGearRatios(data))
}
