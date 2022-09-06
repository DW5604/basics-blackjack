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

// Sum of Player Cards
var returnSumofPlayerCards = function (playerCards) {
  var index = 0;
  var sumOfPlayerCards = 0;
  var playerCardsLength = playerCards.length;
  while (index < playerCardsLength) {
    var currentPlayerCard = playerCards[index];
    // JQK
    if (
      currentPlayerCard.name == "jack" ||
      currentPlayerCard.name == "queen" ||
      currentPlayerCard.name == "king"
    ) {
      sumOfPlayerCards = sumOfPlayerCards + 10;
    } else {
      // Ace
      if (currentPlayerCard.name == "ace" && sumOfPlayerCards < 11) {
        sumOfPlayerCards = sumOfPlayerCards + 11;
      } else {
        sumOfPlayerCards = sumOfPlayerCards + currentPlayerCard.rank;
      }
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
    // JQK
    if (
      currentDealerCard.name == "jack" ||
      currentDealerCard.name == "queen" ||
      currentDealerCard.name == "king"
    ) {
      sumOfDealerCards = sumOfDealerCards + 10;
    } else {
      // Ace
      if (currentDealerCard.name == "ace" && sumOfDealerCards < 11) {
        sumOfDealerCards = sumOfDealerCards + 11;
      } else {
        sumOfDealerCards = sumOfDealerCards + currentDealerCard.rank;
      }
    }
    index = index + 1;
  }
  console.log(sumOfDealerCards);
  return sumOfDealerCards;
};

var playerCardSum = returnSumofPlayerCards(playerCards);
var dealerCardSum = returnSumOfDealerCards(dealerCards);

var initialHand = function (dealerCardSum, playerCardSum) {
  // Calculate sum of initial cards
  var playerCardSum = returnSumofPlayerCards(playerCards);
  var dealerCardSum = returnSumOfDealerCards(dealerCards);

  // Return initial cards
  var returnPlayerCard1 = playerCards[0];
  var returnPlayerCard2 = playerCards[1];
  var returnDealerCard1 = dealerCards[0];
  var returnDealerCard2 = dealerCards[1];

  myOutputValue = `Player hand: ${returnPlayerCard1.name} of ${returnPlayerCard1.suit}, ${returnPlayerCard2.name} of ${returnPlayerCard2.suit}. Dealer hand: ${returnDealerCard1.name} of ${returnDealerCard1.suit}, ${returnDealerCard2.name} of ${returnDealerCard2.suit}. `;
  // Both 21
  if ((dealerCardSum == playerCardSum) == 21) {
    myOutputValue = myOutputValue + ` It's a tie`;
  }
  // Blackjack for dealer
  else if (dealerCardSum == 21) {
    myOutputValue = myOutputValue + ` Dealer wins by Blackjack.`;
  }
  // Blackjack for player
  else if (playerCardSum == 21) {
    myOutputValue = myOutputValue + ` Player wins by Blackjack.`;
  }
  // Player sum < 21
  else if (playerCardSum < 21) {
    myOutputValue =
      myOutputValue + ` Type "hit" or "stand" to continue with the game`;
  }
  currentGameMode = "hitorstand";
  return myOutputValue;
};

// Show Player's Cards that is dea
var returnPlayersHand = function (playerCards) {
  var index = 0;
  var noOfPlayerCards = playerCards.length;
  while (index < noOfPlayerCards) {
    myOutputValue = `Player drew ${playerCards[index].name} of ${playerCards[index].suit}. `;
    index = index + 1;
  }
  console.log(myOutputValue);
  return myOutputValue;
};

// Hit or Stand
var hitOrStand = function (input) {
  // Hit
  if (input == `hit`) {
    // Create new card for every hit
    playerCards.push(shuffledDeck.pop());
    myOutputValue = `${returnPlayersHand(
      playerCards
    )} Sum of player's cards is now ${returnSumofPlayerCards(playerCards)}.`;
    // Sum < 21
    if (returnSumofPlayerCards(playerCards) < 21) {
      myOutputValue = myOutputValue + ` Type "hit" or "stand" to continue`;
      console.log(myOutputValue);
    }
    // Sum = 21
    else if (returnSumofPlayerCards(playerCards) == 21) {
      myOutputValue = myOutputValue + ` Press 'stand' to continue.`;
      console.log(myOutputValue);
    }
    // Sum > 21
    else if (returnSumofPlayerCards(playerCards) > 21) {
      myOutputValue =
        myOutputValue +
        ` The sum of your cards exceeds 21. Press "stand" to continue.`;
      console.log(myOutputValue);
    }
    // Stand
  } else if (input == `stand`) {
    playerCardSum = returnSumofPlayerCards(playerCards);
    dealerCardSum = returnSumOfDealerCards(dealerCards);
    // Dealer hits whenever total < 17
    while (dealerCardSum < 17) {
      dealerCards.push(shuffledDeck.pop());
      dealerCardSum = returnSumOfDealerCards(dealerCards);
    }
    myOutputValue = `You have chosen to stand. It is now the dealer's turn. Sum of dealer's cards ended up as ${returnSumOfDealerCards(
      dealerCards
    )}.`;
    // Outcomes
    if (
      (playerCardSum > 21 && dealerCardSum > 21) ||
      dealerCardSum == playerCardSum
    ) {
      myOutputValue = myOutputValue + " It's a draw!";
    } else if (dealerCardSum > 21 && playerCardSum < 21) {
      myOutputValue = myOutputValue + " Player wins!";
    } else if (dealerCardSum < 21 && playerCardSum > 21) {
      myOutputValue = myOutputValue + " Dealer wins!";
    } else if (dealerCardSum > playerCardSum) {
      myOutputValue = myOutputValue + " Dealer wins!";
    } else if (playerCardSum > dealerCardSum) {
      myOutputValue = myOutputValue + " Player wins!";
    }
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
