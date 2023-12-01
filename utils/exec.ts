import { getArgs } from "./args"

const { name } = getArgs(process.argv)

const exec = async () => {
    const module = await import(`../${name}/${name}.ts`)
    module.init()
}

exec()
