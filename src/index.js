const readline = require('readline')
const { join } = require('path')
const { readFileSync, writeFileSync, existsSync } = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const main = async () => {
    await prompt()
}

const prompt = async () => {
    
    const fileName = await new Promise((resolve, reject) => {
        rl.question('Enter a gpx file: ', resolve)
    })

    const path = join(__dirname, `/runs/${fileName}.gpx`)
    if (existsSync(path)) {
        replacementAlgorithm(path)
    } else {
        console.log('Please re-enter a file')
        await prompt()
    }
}

const replacementAlgorithm = (path) => {
    const data = readFileSync(path, 'utf8')

    let lines = data.split('\n')
    const lineMap = {}

    lines.forEach((line, i) => {
        if (line.includes('<trkpt')) {
            lineMap[i] = line
        }
    })

    const replacementLimit = parseInt(Object.keys(lineMap).length / 2)

    for (let i = 0; i < replacementLimit; i++) {
        const lineNumber = Object.keys(lineMap)[i]
        const oppositeLineNumber = Object.keys(lineMap)[Object.keys(lineMap).length - i - 1]
        lineMap[lineNumber] = lineMap[oppositeLineNumber]
    }

    const updatedlines = []

    lines.forEach((line, i) => {
        const lineToPush = Object.keys(lineMap).includes(i + '') ? lineMap[i] : line
        updatedlines.push(lineToPush)
    })

    let stringifiedLines = ''

    updatedlines.forEach(line => stringifiedLines += (line + '\n'))

    writeFileSync(path, stringifiedLines, { encoding: 'utf8', flag: 'w' })

    console.log('Successfully modified run!')

}

main()

