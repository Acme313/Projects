'use strict'

const WINE_GLASS_SIZE = 0.2
const WINE_ALC_PERCENTAGE = 14
const BEER_BOTTLE_SIZE = 0.7
const BEER_ALC_PERCENTAGE = 5
const STANDARD_DRINK_ALCOHOL_CONTENT = 17

const errors = []

// Testdaten
const exampleData = {
    weight: 89.6,
    drinks: [
        {type: "wine", amount: 5},
        {type: "beer", amount: 3},
        {type: "wine", amount: 2}
    ],
    name: "Torben"
}
const exampleDataError = {
    weight: "sixty",
    drinks: [
        {type: "wine", amount: 2.5},
        {type: "beer", amount: 3}
    ],
    name: "Torben"
}
const exampleDataErrorBroken = {
    weigt: 89.6,
    drins: [
        {type: "wine", amount: 2.5},
        {type: "beer", amount: 3}
    ]
}

const validateRecords = data => {
    validatePropertys(data)
    if (errors.length < 1) {
        validatePropertyWeight(data)
        validatePropertyDrinks(data)
    }
    if (errors.length === 0) {
        return
    }
    return console.log(errors.join('\n'))
}
const validatePropertys = data => {
    const necessaryKeys = ['weight', 'drinks']
    if (!necessaryKeys.every(key => Object.keys(data).includes(key))) {
        errors.push(`Mindestens eine der Eigentschaften \"${necessaryKeys}\" fehlt.`)
    }
}
const validatePropertyWeight = data => {
    if (data['weight'] <= 0 || isNaN(data['weight'])) {
        errors.push(`\"${data['weight']}\" ist kein gültiger Wert als Gewichtsangabe.`)
    }
}
const validatePropertyDrinks = data => {
    const drinks = data['drinks']
    if (data['drinks']) {
        drinks.forEach((drink, index) => {
            const drinkKeys = Object.keys(drink)
            if (!drinkKeys.includes('type') || !drinkKeys.includes('amount')) {
                errors.push(`Eine Eigentschaft in Drink Nummer ${index} fehlt.`)
            }
            const amount = drink['amount']
            if (amount.isNaN || !Number.isInteger(amount) || amount <= 0) {
                errors.push(`${amount} ist kein gültiger Wert für die Anzahl von Flaschen oder Gläsern.`)
            }
        })
    }
    return
}

const bloodAlcoholContentFor = data => {
    const weight = data.weight
    const drinks = data.drinks
    
    // Berechnung Alkoholgehalt
    let alcoholContent = 0
    for (const drink of drinks) {
        if (drink.type === 'wine') {
            alcoholContent += drink.amount * WINE_GLASS_SIZE * WINE_ALC_PERCENTAGE / 100
        } else if (drink.type === 'beer') {
            alcoholContent += drink.amount * BEER_BOTTLE_SIZE * BEER_ALC_PERCENTAGE / 100
        }
        // Platz um weitere Getränke einzugeben
    }
    // Umrechnung auf Standarddrinks
    const standardDrinks = alcoholContent * 1000 / STANDARD_DRINK_ALCOHOL_CONTENT
    // Berechnung EBAC
    const ebac = (0.806 * standardDrinks * 1.2) / (0.5 * weight)
    const ebacInPromille = (ebac * 10).toFixed(2)
    
    return console.log('Ihr Blutalkoholwert beträgt ' + ebacInPromille + '‰\n' + recommendationOutput(ebacInPromille))
}
const recommendationOutput = data => {
    let recommendation = ''
    if (data <= 0.29) {
        recommendation = 'Sie sind vermutlich noch fahrtüchtig. Diese Angabe ist nicht rechtsverbindlich!'
    } else if (data >= 0.3 && data < 0.6) {
        recommendation = 'Sie haben vermutlich schon Konzentrationsschwierigkeiten. Sie sollten nicht mehr fahren.'
    } else if (data >= 0.6 && data < 1.0) {
        recommendation = 'Fahren Sie nicht, das könnte Sie sonst den Führerschein kosten. Denken Sie auch an die armen Schafe.'
    } else if (data >= 1.0 && data < 5.0) {
        recommendation = 'Wie viele Handys halten Sie in der Hand?'
    } else if (data >= 5.0) {
        recommendation = 'Sie sind vermutlich tot – oder haben sich vertippt.'
    }
    return recommendation
}

const run = data => {
    validateRecords(data)
    if (errors.length === 0) {
        return bloodAlcoholContentFor(data)
    }
    return console.log('Berechnung abgebrochen.')
}

run(exampleDataError)