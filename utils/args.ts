export const getArgs = (argv: Array<string>): { day: string; dir: string; name: string } => {
    const day = argv[2].padStart(2, "0")
    const name = `day${day}`
    const dir = `./${name}`
    return { day, dir, name }
}
