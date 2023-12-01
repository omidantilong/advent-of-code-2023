import { loadData } from "../utils/helpers"

const dataFile = "./day01/day01.txt"

const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

export const extractDigits = (line: string): number => {
    const chars = line.match(/\d/g)
    return chars?.length ? parseInt(chars[0] + chars.at(-1)) : 0
}

export const extractDigitsWithText = (line: string): number => {
    const matcher = new RegExp(`(?=(${digits.join("|")}|[0-9]))`, "g")
    const matches = Array.from(line.matchAll(matcher))
    if (matches.length) {
        const a = matches[0][1]
        const b = matches.at(-1)?.[1] || a
        return a && b
            ? parseInt((digits.indexOf(a) + 1 || a) + "" + (digits.indexOf(b) + 1 || b))
            : 0
    }
    return 0
}

export const getValues = (data: Array<string>, withText: Boolean = false): number => {
    let acc = 0
    const extractor = withText ? extractDigitsWithText : extractDigits
    data.forEach((line) => (acc += extractor(line)))
    return acc
}

export const init = async () => {
    const data = (await loadData(dataFile)).split("\n")

    console.log("Solution 1: ", getValues(data, false))
    console.log("Solution 2: ", getValues(data, true))
}
