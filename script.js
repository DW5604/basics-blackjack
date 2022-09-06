var currentGameMode = "deal";
var playerCards = [];
var dealerCards = [];

// Create Deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var cardDeck = makeDeck();
console.log(cardDeck);

// Shuffle Deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function () {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var shuffledDeck = shuffleCards(cardDeck);
console.log(shuffledDeck);

// Dealing Cards Function
var playerCard1 = playerCards.push(shuffledDeck.pop());
var playerCard2 = playerCards.push(shuffledDeck.pop());
console.log(playerCards);
var dealerCard1 = dealerCards.push(shuffledDeck.pop());
var dealerCard2 = dealerCards.push(shuffledDeck.pop());
console.log(dealerCards);

// Show Player's Cards
var returnPlayersHand = function (playerCards) {
  var index = 0;
  var noOfPlayerCards = playerCards.length;
  while (index < noOfPlayerCards) {
    myOutputValue = `Player drew ${playerCards[index].name} of ${playerCards[index].suit}. `;
    index = index + 1;
  }
  return myOutputValue;
};

// Show Dealer's Cards
var returnDealersHand = function (dealerCards) {
  var index = 0;
  var noOfDealerCards = dealerCards.length;
  while (index < noOfDealerCards) {
    myOutputValue = `Player drew ${dealerCards[index].name} of ${dealerCards[index].suit}. `;
    index = index + 1;
  }
  return myOutputValue;
};

// Sum of Player Cards
var returnSumofPlayerCards = function (playerCards) {
  var index = 0;
  var sumOfPlayerCards = 0;
  var playerCardsLength = playerCards.length;
  while (index < playerCardsLength) {
    var currentPlayerCard = playerCards[index];
    if (
      currentPlayerCard.name == "jack" ||
      currentPlayerCard.name == "queen" ||
      currentPlayerCard.name == "king"
    ) {
      sumOfPlayerCards = sumOfPlayerCards + 10;
    } else {
      sumOfPlayerCards = sumOfPlayerCards + currentPlayerCard.rank;
    }
    index = index + 1;
  }
  console.log(sumOfPlayerCards);
  return sumOfPlayerCards;
};

// Sum of Dealer Cards
var returnSumOfDealerCards = function (dealerCards) {
  var index = 0;
  var dealerCardsLength = dealerCards.length;
  var sumOfDealerCards = 0;
  while (index < dealerCardsLength) {
    var currentDealerCard = dealerCards[index];
    if (
      currentDealerCard.name == "jack" ||
      currentDealerCard.name == "queen" ||
      currentDealerCard.name == "king"
    ) {
      currentDealerCard = currentDealerCard + 10;
    } else {
      sumOfDealerCards = sumOfDealerCards + currentDealerCard.rank;
    }
    index = index + 1;
  }
  console.log(sumOfDealerCards);
  return sumOfDealerCards;
};

var initialHand = function (dealerCardSum, playerCardSum) {
  // Winner is dependant on sum of card rank
  var playerCardSum = returnSumofPlayerCards(playerCards);
  console.log(playerCardSum);
  var dealerCardSum = returnSumOfDealerCards(dealerCards);
  console.log(dealerCardSum);

  var returnPlayerCard1 = playerCards[0];
  var returnPlayerCard2 = playerCards[1];
  var returnDealerCard1 = dealerCards[0];
  var returnDealerCard2 = dealerCards[1];

  myOutputValue = `Player hand: ${returnPlayerCard1.name} of ${returnPlayerCard1.suit}, ${returnPlayerCard2.name} of ${returnPlayerCard2.suit}. Dealer hand: ${returnDealerCard1.name} of ${returnDealerCard1.suit}, ${returnDealerCard2.name} of ${returnDealerCard2.suit}. `;

  if ((dealerCardSum == playerCardSum) == 21) {
    myOutputValue = myOutputValue + `It's a tie`;
  } else if (dealerCardSum == 21) {
    myOutputValue = myOutputValue + `Dealer wins by Blackjack.`;
  } else if (playerCardSum == 21) {
    myOutputValue = myOutputValue + `Player wins by Blackjack.`;
  } else if (playerCardSum < 21) {
    myOutputValue =
      myOutputValue + `Type "hit" or "stand" to continue with the game`;
  }
  currentGameMode = "hitorstand";
  return myOutputValue;
};

var hitOrStand = function (input) {
  if (input == `stand`) {
    myOutputvalue = `You have chosen to stand. It is now the dealer's turn.`;
  } else if (input == `hit`) {
    playerCards.push(shuffledDeck.pop());
    myOutputValue =
      returnPlayersHand(playerCards) +
      `Sum of player cards is now ${returnSumofPlayerCards(playerCards)}.`;
  }
  return myOutputValue;
};

var main = function (input) {
  if (currentGameMode == "deal") {
    return initialHand(playerCards, dealerCards);
  }
  if (currentGameMode == "hitorstand") {
    return hitOrStand(input);
  }
};
