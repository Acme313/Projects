'use strict'
// Variable im Global Scope
const bitmap = [
    '................**********........................',
    '...............*..........*.......................',
    '..........*****............*........*.............',
    '.........*.................*.......*.*....*****...',
    '........*................***......*...*.**.....**.',
    '....****.................*.......*.....*.........*',
    '..**......................*******................*',
    '.*...............................................*',
    '.*...............................................*',
    '*...........****.............................****.',
    '*..........*....*.........................***.....',
    '.*.........*....*.......................**........',
    '..***.......****.......................*..........',
    '.....****......................******..*..........',
    '.........**********************.....****..........',
]

// Zeilenweise Ausgabe des Bitmap
const displayBitmap = data => (data.join('\n'))
// Ermittlung welches Zeichen sich an der Koordinate befindet
const getCharacter = (x, y) => (y < 0 || y >= bitmap.length || x < 0 || x >= bitmap[y].length) ? null : bitmap[y][x]
// Änderung eines Zeichens an einer vorgegebenen Koordinate
const setCharacter = (x, y, character) => {
    if (y < 0 || y >= bitmap.length || x < 0 || x >= bitmap[y].length) {
        return
    }
    let row = bitmap[y]
    bitmap[y] = row.slice(0, x) + character + row.slice(x + 1)
}
// floodFill Funktion
const floodFill = (x ,y) => {
    const character = getCharacter(x, y)
    if (character !== '*') {
        setCharacter(x, y, '*')
        // Funktion floodFill breitet sich von dieser Koordinate auf der x- und y-Achse aus in jeweils beide Richtungen (+/-)
        floodFill(x + 1, y)
        floodFill(x - 1, y)
        floodFill(x, y + 1)
        floodFill(x, y - 1)
    }
    // Gibt das veränderte Array bitmap zurück
    return displayBitmap(bitmap)
}

console.log(displayBitmap(bitmap))

console.log('\n')

console.log(floodFill(8, 7))