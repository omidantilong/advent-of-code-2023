import { loadData } from "../utils/helpers"

const dataFile = "./day04/day04.txt"

type Card = {
    id: number
    wins: number
    copies: number
    sum: number
}

export const parseInput = (raw: string): Array<Card> => {
    return raw
        .trim()
        .split("\n")
        .map((card, index) => parseCard(card, index))
}

export const extractCardNumbers = (input: string) => {
    return input
        .trim()
        .split(" ")
        .filter((n) => n)
        .map((n) => parseInt(n))
}

export const parseCard = (card: string, index: number) => {
    let wins = 0
    let sum = 0

    const numbers = card.split(": ")[1].trim().split("|")
    const winNumbers = extractCardNumbers(numbers[0])
    const ownNumbers = extractCardNumbers(numbers[1])

    winNumbers.forEach((w: number) => {
        if (ownNumbers.includes(w)) {
            wins++
            sum = sum === 0 ? 1 : sum * 2
        }
    })

    return { id: index + 1, copies: 1, wins, sum }
}

export const getTotalPoints = (raw: string) => {
    return parseInput(raw).reduce((acc, val) => (acc += val.sum), 0)
}

export const getTotalCards = (raw: string) => {
    return parseInput(raw)
        .map((card, _, cards) => {
            for (let i = 0; i < card.wins; i++) cards[card.id + i].copies += card.copies
            return card
        })
        .reduce((acc, val) => (acc += val.copies), 0)
}

export const init = async () => {
    const raw = await loadData(dataFile)

    console.log("Solution 1: ", getTotalPoints(raw))
    console.log("Solution 2: ", getTotalCards(raw))
}
