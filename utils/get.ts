import fs from "fs-extra"
import pc from "picocolors"
import { getInput } from "./input"
import { getArgs } from "./args"

const { day, dir, name } = getArgs(process.argv)
const input = await getInput(day)

if (!input.length) {
    console.log(pc.red(`Couldn't get data for ${pc.bold(name)}`))
    console.log("")
} else {
    const file = `${dir}/${name}.txt`

    await fs.ensureDir(dir)
    await fs.writeFile(file, input)

    console.log(pc.green(`Wrote data for ${pc.bold(name)}`))
    console.log("")
    console.log(`→ ${file}`)
    console.log("")
}
