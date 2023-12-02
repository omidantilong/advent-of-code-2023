import { loadData } from "../utils/helpers"

const dataFile = "./day02/day02.txt"

interface CubeCount {
    [key: string]: number
}

interface CubeData {
    possible: boolean
    power: number
}

interface Game extends CubeData {
    id: number
}

export const getCubeValues = (value: string) => {
    const [count, colour] = value.trim().split(" ")
    return { count: parseInt(count), colour }
}

export const parseCubes = (line: string, limits: CubeCount): CubeData => {
    let possible = true
    let max: CubeCount = { blue: 0, red: 0, green: 0 }

    line.split(";").forEach((round) => {
        round.split(",").forEach((value) => {
            const { count, colour } = getCubeValues(value)
            if (count > limits[colour]) possible = false
            max[colour] = Math.max(count, max[colour])
        })
    })

    return { possible, power: max.blue * max.green * max.red }
}

export const getGameData = (data: string, limits: CubeCount): Game => {
    const [gameId, line] = data.split(":")
    return { id: parseInt(gameId.trim().replace("Game ", "")), ...parseCubes(line, limits) }
}

export const getSumAndPower = (games: Array<string>, limits: CubeCount) => {
    let summed = 0
    let power = 0

    games.forEach((game) => {
        const gameData = getGameData(game, limits)
        summed += gameData.possible ? gameData.id : 0
        power += gameData.power
    })

    return { summed, power }
}

export const init = async () => {
    const data = (await loadData(dataFile)).trim().split("\n")

    const { summed, power } = getSumAndPower(data, { blue: 14, green: 13, red: 12 })

    console.log("Solution 1: ", summed)
    console.log("Solution 2: ", power)
}
