const newDeck = function () {
  const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
  const faces = [{face: 'Ace',value: 11},
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

let init = function () {
  console.log('Game started!')
  let deck = newDeck()
  deck.shuffle()


  const game = {
    completed: false,
    playerHand: {
      hand: [],
      getHandValue: function () {
        let total = 0
        this.hand.forEach(function (card) {
          total += card.value
        })
        return total
      }
    },
    dealerHand: {
      hand: [],
      getHandValue: function () {
        let total = 0
        this.hand.forEach(function (card) {
          total += card.value
        })
        return total
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
      // const dealerValue = this.dealerHand.getHandValue()
      // document.querySelector('#dealer-value').textContent = dealerValue
      const playerValue = this.playerHand.getHandValue()
      document.querySelector('#player-value').textContent = playerValue
      if (user === 'dealer-hand') {
        const userId = '#' + user

  
        const h3 = document.createElement('h3')
        h3.textContent = `${this.dealerHand.hand[0].face} - ${this.dealerHand.hand[0].suit}`
        document.querySelector(userId).appendChild(h3)
      } else {
        hand.forEach(function (card) {
          const userId = '#' + user
          const face = card.face
          const suit = card.suit
    
          const h3 = document.createElement('h3')
          h3.textContent = `${face} - ${suit}`
          document.querySelector(userId).appendChild(h3)
        })
      } 
    },
    clearHands: function () {
      // console.log('cleared')
      document.querySelectorAll('h3').forEach(function (card) {
        card.remove()
      })
      document.querySelector('#dealer-value').textContent = ''
    },
    hit: function (userId) {
      const hitCard = deck.cards.pop()
      this[userId].hand.push(hitCard)
      this.clearHands()
      game.renderHand('dealer-hand', game.dealerHand.hand)
      game.renderHand('player-hand', game.playerHand.hand)
      this.gameLogic()
      console.log(deck.cards.length)
    },
    stay: function () {
      let dealerHand = this.dealerHand.getHandValue()
      let playerHand = this.playerHand.getHandValue()
      
      while (dealerHand < 17) {
        const hitCard = deck.cards.pop()
        this.dealerHand.hand.push(hitCard)
        dealerHand = this.dealerHand.getHandValue()

        if (dealerHand > 21) {
          let index = this.dealerHand.hand.findIndex(function (card) {
            return card.value === 11
          })
          if (index > -1) {
            this.dealerHand.hand[index].value = 1
            this.clearHands()
            game.renderHand('dealer-hand', game.dealerHand.hand)
            game.renderHand('player-hand', game.playerHand.hand)
            this.stay()
          }
        }

        this.clearHands()
        game.renderHand('dealer-hand', game.dealerHand.hand)
        game.renderHand('player-hand', game.playerHand.hand)
      }

      this.clearHands()
      game.renderHand('player-hand', game.playerHand.hand)

      this.dealerHand.hand.forEach(function (card) {
        const userId = '#' + 'dealer-hand'
        const face = card.face
        const suit = card.suit
  
        const h3 = document.createElement('h3')
        h3.textContent = `${face} - ${suit}`
        document.querySelector(userId).appendChild(h3)
      })

      const dealerValue = this.dealerHand.getHandValue()
      document.querySelector('#dealer-value').textContent = dealerValue
      
      if (dealerHand === playerHand) {
        alert('It\'s a tie!')
      } else if (playerHand > dealerHand) {
        alert('Player wins!')
      } else if (dealerHand > 21) {
        alert('Player wins!')
      } else if (dealerHand > playerHand) {
        alert('Dealer wins!')
      }
    },
    gameLogic: function () {
      let index = this.playerHand.hand.findIndex(function (value) {
        return value === 11
      })
      // console.log(index)
      if (this.playerHand.getHandValue() === 21) {
        this.stay()
      } else if (this.playerHand.getHandValue() > 21){
        let index = this.playerHand.hand.findIndex(function (card) {
          return card.value === 11
        })
        if (index > -1) {
          this.playerHand.hand[index].value = 1
          this.clearHands()
          game.renderHand('dealer-hand', game.dealerHand.hand)
          game.renderHand('player-hand', game.playerHand.hand)
          this.gameLogic()
        } else {
          alert ('You lose!')
        }
      }
       
    }
  }

// INITIALIZE first deal
  game.clearHands()
  game.dealCards()
  game.renderHand('dealer-hand', game.dealerHand.hand)
  game.renderHand('player-hand', game.playerHand.hand)
  game.gameLogic()


  document.querySelector('#new-game').addEventListener('click', function () {
    // console.log('Game restarted!')
    game.playerHand.hand = []
    game.dealerHand.hand = []
    game.clearHands()
    // let deck = newDeck()
    // deck.shuffle()
    if (deck.cards.length > 0) {
      game.dealCards()
      game.renderHand('dealer-hand', game.dealerHand.hand)
      game.renderHand('player-hand', game.playerHand.hand)
      game.gameLogic()
    } else {
      console.log('Out of cards!')
    }
  })

  document.querySelector('#hit').addEventListener('click', function () {
    console.log('hit!')
    game.hit('playerHand')
  })

  document.querySelector('#stay').addEventListener('click', function () {
    console.log('Stay!')
    game.stay()
  })
}





init()




