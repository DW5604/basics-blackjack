var currentGameMode = "deal";

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

// Shuffle Cards
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

var findWinner = function (sumOfDealerCards, sumOfPlayerCards) {
  var shuffledDeck = shuffleCards(cardDeck);
  console.log(shuffledDeck);
  // Deal Cards
  var dealerCard1 = shuffledDeck.pop();
  var dealerCard2 = shuffledDeck.pop();
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();

  // Winner is dependant on sum of card rank
  var sumOfPlayerCards = playerCard1.rank + playerCard2.rank;
  var sumOfDealerCards = dealerCard1.rank + dealerCard2.rank;

  myOutputValue = `Player hand: ${playerCard1.name} of ${playerCard1.suit}, ${playerCard2.name} of ${playerCard2.suit}. Dealer hand: ${dealerCard1.name} of ${dealerCard1.suit}, ${dealerCard2.name} of ${dealerCard2.suit}`;

  if (sumOfDealerCards == sumOfPlayerCards) {
    myOutputValue = myOutputValue + `. It's a tie!`;
  } else if (sumOfDealerCards == 21) {
    myOutputValue = myOutputValue + `. Dealer wins by Blackjack.`;
  } else if (sumOfPlayerCards == 21) {
    myOutputValue = myOutputValue + `. Player wins by Blackjack.`;
  } else if (sumOfDealerCards > sumOfPlayerCards) {
    myOutputValue = myOutputValue + `. Dealer wins with higher hand total.`;
  } else if (sumOfPlayerCards > sumOfDealerCards) {
    myOutputValue = myOutputValue + `. Player wins with higher hand total.`;
  }
  return myOutputValue;
};

var main = function () {
  return findWinner();
};
