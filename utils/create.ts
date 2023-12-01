import fs from "fs-extra"
import dedent from "dedent"
import { getInput } from "./input.ts"
import { getArgs } from "./args.ts"
import pc from "picocolors"

const { day, dir, name } = getArgs(process.argv)

if (!day) {
    process.exit()
} else {
    if (await fs.exists(dir)) {
        console.log(pc.red(`Directory already exists for ${pc.bold(name)}`))
        console.log("")
        process.exit()
    }

    await fs.ensureDir(dir)

    const solutionTemplate = dedent(`
    import { loadData } from "../utils/helpers"

    const dataFile = "./${name}/${name}.txt"

    export const init = async () => {
        const data = await loadData(dataFile)
    }
    `)

    const testTemplate = dedent(`
    import { it, expect } from "vitest"

    it('works', () => {

    })
    `)

    const input = await getInput(day)

    const solutionFile = `${dir}/${name}.ts`
    const testFile = `${dir}/${name}.test.ts`
    const dataFile = `${dir}/${name}.txt`

    await fs.writeFile(solutionFile, solutionTemplate)
    await fs.writeFile(testFile, testTemplate)
    await fs.writeFile(dataFile, input)

    console.log(pc.green(`Created files for ${pc.bold(name)}`))
    console.log("")
    console.log(`→ ${solutionFile}`)
    console.log(`→ ${testFile}`)
    console.log(`→ ${dataFile}`)
    console.log("")
}
