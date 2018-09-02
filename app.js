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


const init = function () {
  const deck = newDeck()
  deck.shuffle()

  const game = {
    completed: false,
    playerHand: {
      hand: [],
      getHandValue: function () {
        let total = 0
        this.playerHand.hand.forEach(function (card) {
          total += card.value
        })
        return total
      }
    },
    dealerHand: {
      hand: [],
      getHandValue: function () {
        // let total = 0
        // this.hand.forEach(function (card) {
        //   total += card.value
        // })
        // return total
      }
    },
    dealCards: function () {
      const card1 = deck.cards.pop() 
      const card2 = deck.cards.pop()
      this.playerHand.hand.push(card1)
      this.playerHand.hand.push(card2)      

      const card3 = deck.cards.pop() 
      const card4 = deck.cards.pop()
      this.dealerHand.hand.push(card3)
      this.dealerHand.hand.push(card4)
    },
    renderHand: function (user, hand) {
      hand.forEach(function (card) {
        const h2 = document.createElement('h2')
        h2.textContent = card.suit
        const userId = '#' + user
        // remove children before new render
        document.querySelector(userId).appendChild(h2)
        const p = document.createElement('p')
        p.textContent = card.face
        document.querySelector(userId).appendChild(p)
      })
    }
  }

  const deal = document.querySelector('#deal')
  deal.addEventListener('click', function () {
    if (deck.cardsLeft() > 0) {
      game.dealCards()
      game.renderHand('dealer-hand', game.dealerHand.hand)
      game.renderHand('player-hand', game.playerHand.hand)
    }
  })
}



const startButton = document.querySelector('#start')
startButton.addEventListener('click', function () {
  console.log('Game started!')
  init()
})



