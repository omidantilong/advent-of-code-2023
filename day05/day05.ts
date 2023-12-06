import { loadData } from "../utils/helpers"

const dataFile = "./day05/day05.txt"

type AlmanacValues = {
    d0: number
    d1: number
    s0: number
    s1: number
}

export const extractMapDigits = (line: string) => {
    return line
        .trim()
        .split("\n")
        .slice(1)
        .map((line) => line.split(" ").map((i) => parseInt(i)))
        .map(([d0, s0, length]) => ({
            d0,
            d1: d0 + length - 1,
            s0,
            s1: s0 + length - 1,
        }))
}

export const parseInput = (raw: string): { seeds: number[]; mappings: AlmanacValues[][] } => {
    const chunks = raw.split("\n\n")

    const seeds = chunks[0]
        .split(":")[1]
        .trim()
        .split(" ")
        .map((i) => parseInt(i))

    const mappings = [
        extractMapDigits(chunks[1]),
        extractMapDigits(chunks[2]),
        extractMapDigits(chunks[3]),
        extractMapDigits(chunks[4]),
        extractMapDigits(chunks[5]),
        extractMapDigits(chunks[6]),
        extractMapDigits(chunks[7]),
    ]

    return {
        seeds,
        mappings,
    }
}

export const getValueInRange = (sourceNumber: number, map: AlmanacValues[]) => {
    //let sourceNumber = 0
    let destNumber = sourceNumber
    //console.log(map)
    for (const { d0, d1, s0, s1 } of map) {
        //console.log(dest, source, range)

        if (sourceNumber >= s0 && sourceNumber <= s1) {
            destNumber = d0 + (sourceNumber - s0)
            break
        }
    }

    return destNumber
}

export const getLocation = (seedNumber: number, mappings: AlmanacValues[][]) => {
    const sN = getValueInRange(seedNumber, mappings[0])
    const fN = getValueInRange(sN, mappings[1])
    const wN = getValueInRange(fN, mappings[2])
    const lN = getValueInRange(wN, mappings[3])
    const tN = getValueInRange(lN, mappings[4])
    const hN = getValueInRange(tN, mappings[5])

    const location = getValueInRange(hN, mappings[6])

    return location
}

export const getLowestValueFromSeeds = (raw: string) => {
    const data = parseInput(raw)

    const locations = data.seeds.map((seedNumber) => getLocation(seedNumber, data.mappings))

    return Math.min(...locations)
}

export const init = async () => {
    const raw = await loadData(dataFile).then((data) => data.toString().trim())

    console.log("Solution 1", getLowestValueFromSeeds(raw))
    //console.log("Solution 2", getLowestValueFromExpandedSeeds(raw))
}
