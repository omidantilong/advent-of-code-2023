import "dotenv/config"

const { AOC_SESSION_ID, AOC_YEAR } = process.env

export const getInput = async (day: string): Promise<string> => {
    const url = `https://adventofcode.com/${AOC_YEAR}/day/${parseInt(day)}/input`
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "text/plain",
                Cookie: `session=${AOC_SESSION_ID}`,
            },
        })
        return response.status === 200 ? await response.text() : ""
    } catch (e) {
        return ""
    }
}
