import fs from "fs-extra"

export const loadData = async (path: string): Promise<string> => {
    return await fs.readFile(path).then((data) => data.toString())
}
