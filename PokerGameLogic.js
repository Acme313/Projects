'use strict'

const SUITS = '♠♥♦♣'
const NAMES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

//Arbeitsschritt 1
const toName = (data) => data.substr(0, data.length - 1)
const toSuit = (data) => data.charAt(data.length - 1)

//Arbeitsschritt 2
const isValidCard = (data) => NAMES.includes(toName(data)) && SUITS.includes(toSuit(data))
const isValidHand = (data) => {
    if (data.length !== 5) {
        return false
    }
    for (let i = 0; i < data.length; i++) {
        if (!isValidCard(data[i])) {
            return false
        }  
    }
    return true
}

//Arbeitsschritt 3
const sortHand = (data) => data.sort(compareCards)

const compareCards = (card1, card2) => {
    const nameIndex1 = NAMES.indexOf(card1.slice(0, -1))
    const nameIndex2 = NAMES.indexOf(card2.slice(0, -1))
    
    if (nameIndex1 < nameIndex2) {
        return -1
    } else if (nameIndex1 > nameIndex2) {
        return 1
    } else {
        const suitIndex1 = SUITS.indexOf(card1.charAt(1))
        const suitIndex2 = SUITS.indexOf(card2.charAt(1))
        return suitIndex1 - suitIndex2
    }
}

//Arbeitsschritt 4
const isFlush = (data) => {
    const hand = data.map(card => card.slice(-1))
    return hand.every(suit => suit === hand[0])
}

const isStraight = (data) => NAMES.join('')
                                .includes(sortHand(data)
                                .map(card => card.slice(0, -1))
                                .join(''))

const isStraightFlush = (data) => isFlush(data) && isStraight(sortHand(data))

const isRoyalFlush = (data) => isStraightFlush(sortHand(data)) && data.join('').includes('A')

// Sämtliche Beispiele zum testen:
console.log(toName("9♣")) 
console.log(toName("10♥")) 
console.log(toName("Q♥")) // => "Q" 
console.log(toSuit("9♣")) // => "♣" 
console.log(toSuit("10♥")) // => "♥"
console.log(isValidCard("9♣")) // => true 
console.log(isValidCard("11♣")) // => false 
console.log(isValidCard("9X")) // => false
console.log(sortHand(["3♥", "2♥", "5♥", "2♣", "4♣"])) // => ["2♥", "2♣", "3♥", "4♣", "5♥"]
console.log(sortHand(["2♦", "Q♥", "2♥", "2♣", "2♠"])) // => ["2♠", "2♥", "2♦", "2♣", "Q♥"]
console.log(isFlush(["7♥", "2♥", "Q♥", "10♥", "5♥"])) // => true
console.log(isFlush(["7♥", "2♥", "Q♥", "10♣", "5♥"])) // => false
console.log(isStraight(["5♥", "6♦", "7♥", "8♣", "9♥"])) // => true 
console.log(isStraightFlush(["5♥", "6♥", "7♥", "8♥", "9♥"]))// => true 
console.log(isRoyalFlush(["10♥", "J♥", "Q♥", "K♥", "A♥"]))// => true 
console.log(isRoyalFlush(["10♥", "J♥", "Q♥", "K♣", "A♥"]))// => false 
console.log(isRoyalFlush(["K♥", "A♥", "Q♥", "10♥", "J♥"])) // => true