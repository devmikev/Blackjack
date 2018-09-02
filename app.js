const newDeck = function () {
  const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
  const faces = [{face: 'Ace',value: 1},
    {
      face: '2',
      value: 2
    },
    {
      face: '3',
      value: 3
    },
    {
      face: '4',
      value: 4
    },
    {
      face: '5',
      value: 5
    },
    {
      face: '6',
      value: 6
    },
    {
      face: '7',
      value: 7
    },
    {
      face: '8',
      value: 8
    },
    {
      face: '9',
      value: 9
    },
    {
      face: '10',
      value: 10
    },
    {
      face: 'Jack',
      value: 10
    },
    {
      face: 'Queen',
      value: 10
    },
    {
      face: 'King',
      value: 10
    }
  ]
  
  const deck = {
    cards: [],
    shuffle: function () {
      const unshuffledCards = this.cards
      const tempArray = []
      for (let i = 0; i < this.cards.length; i++) {
        tempArray.push(null)
      }

      while (unshuffledCards.length > 0) {
        const randomNum = Math.floor(Math.random() * 52)
        if (tempArray[randomNum] === null) {
          const card = unshuffledCards.pop()
          tempArray[randomNum] = card
        }
      }
      this.cards = tempArray
      // console.log(this.cards)

    },
    cardsLeft: function () {
      return this.cards.length
    }
  }
  
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < faces.length; j++) {
      deck.cards.push({
        suit: suits[i],
        face: faces[j].face,
        value: faces[j].value
      })
    }
  }

  return deck
}

const myCards = newDeck()
console.log(myCards.cards)
myCards.shuffle()
console.log(myCards.cards)





