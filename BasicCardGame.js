let deck = []; //cards are drawn from here
let stack = []; //played cards are stacked here
let graveyard = []; //evaluated cards are stored here
let enemyHealthPoints = []; //NPC healthpoints
let playerHealthPoints = []; //player healthpoints
let numberOfHandCards; //number of maximum hand cards
let enemyHandCards = []; //hand cards of npc
let playerHandCards = []; //hand cards of player
let frozenHealth; //bool if the "dices" get swapped at the end of the turn

const Deck = [
  "Funken",
  "Funken",
  "Funken",
  "Funken",
  "Funken",
  "Glut",
  "Glut",
  "Glut",
  "Glut",
  "Feuer",
  "Feuer",
  "Feuer",
  "Sturm",
  "Sturm",
  "Sturm",
  "Sturm",
  "Sturm",
  "Orkan",
  "Orkan",
  "Orkan",
  "Panic_Button",
  "Panic_Button",
  "Panic_Button",
  "Panic_Button",
  "Blitzschlag",
  "Blitzschlag",
  "Blitzschlag",
  "Blitzschlag",
  "Erdbeben",
  "Erdbeben",
  "Erdbeben",
  "Heilender_Segen",
  "Heilender_Segen",
  "Heilender_Segen",
  "Heilender_Segen",
  "Sintflut",
  "Sintflut",
  "Eiszeit",
  "Eiszeit",
  "Eiszeit"
];

function preGameFunction() { //first function to be called to set health, number of handcards, deck and leading to the first distribution of cards to players
  enemyHealthPoints,
  playerHealthPoints = [20, 20];
  numberOfHandCards = 5;
  deck = Deck.map((card) => card);
  evaluationRound();
}

/*function drawCard(targetHand) {
  let i;

  while (targetHand.length < numberOfHandCards) {
    if (deck.length > 0) {
      i = Math.floor(Math.random() * deck.length);

      if (i in deck) {
        targetHand.push(deck[i]);
        deck.splice(i, 1);
      }

    } else if (deck.length < 1) {
      deck = graveyard;
      graveyard.length = 0;
    }

  }
  return;
}*/

function swapHealth() { //function to swap the dices of lowest health of each player with each other (normally one can choose the dice. this is for testing)
  if (frozenHealth) { //some cards negate this effect
    frozenHealth = false;
    return;
  } else {
    let storeValue, storeIndex;
    storeValue = Math.min(...playerHealthPoints);
    storeIndex = enemyHealthPoints.indexOf(Math.min(...enemyHealthPoints));
    playerHealthPoints[playerHealthPoints.indexOf(Math.min(...playerHealthPoints))] = Math.min(...enemyHealthPoints);
    enemyHealthPoints[storeIndex] = storeValue;
  }
}

function evaluationRound() { //function for evaluating the stack, swaping a "dice" of each player with the other and
  while (stack.length >= 1) {
    cardEffects(stack[stack.length - 1], stack[stack.length - 2]);
    graveyard.push(stack[stack.length - 2]);
    stack.length = stack.length - 2;
  }
  swapHealth();
  while (playerHandCards < numberOfHandCards) {
    randomCardPush(deck, playerHandCards);
    //drawCard(playerHandCards);
  }
  while (enemyHandCards < numberOfHandCards) {
    randomCardPush(deck, enemyHandCards);
    //drawCard(enemyHandCards);
  }
  stackingRound();
}


function stackingRound() { //function for the game phase where the cards get stacked, but normally don't have an effect (for testing, the cards pushed to the stack are random)
  let playerturn = true;
  let i;
  while (playerHandCards > 0 || enemyHandCards > 0) {
    if (stack[stack.length - 1] = "Eiszeit" || stack[stack.length - 1] = "Sintflut") {
      evaluationRound();
    } else {
      if (playerturn = true) {
        randomCardPush(playerHandCards, stack);
        stack.push(1);
        playerturn = false;
      } else if (playerturn = false) {
        randomCardPush(enemyHandCards, stack);
        stack.push(2);
        playerturn = true;
      }
    }
  }
  evaluationRound();
}

function randomCardPush(originArray, targetArray) { //function to to select a random entry of an array to another array
  let i;
  i = Math.floor(Math.random() * originArray.length);

  if (i in originArray) {
    targetArray.push(originArray[i]);
    originArray.splice(i, 1);
  }
  return;
}

cardEffects(card, owner) {
  if (card = "Funken") {
    if (owner = 1) {
      doTargetDamage(2, 2);
    } else if (owner = 2) {
      doTargetDamage(1, 2)
    }
  } else if (card = "Glut") {
    if (owner = 1) {
      doTargetDamage(2, 3);
    } else if (owner = 2) {
      doTargetDamage(1, 3)
    }
  } else if (card = "Feuer") {
    if (owner = 1) {
      doTargetDamage(2, 4);
    } else if (owner = 2) {
      doTargetDamage(1, 4)
    }
  } else if (card = "Panic_Button") { //empties the rest of the stack
    graveyard = graveyard.concat(stack);
    stack.length = 0;
  } else if (card = "Erdbeben") {
    doGlobalDiceDamage(2);
  } else if (card = "Sturm") {
    doGlobalDamage(3);
  } else if (card = "Orkan") {
    doGlobalDamage(3);
  } else if (card = "Heilender_Segen") {
    if (owner = 1) {
      healOneDice(1, 5);
    } else if (owner = 2) {
      healOneDice(2, 5);
    }
  } else if (card = "Eiszeit") {
    frozenHealth = true;
  } else if (card = "Sintflut") {
    graveyard = graveyard.concat(stack);
    stack.length = 0;
  } else if (card = "Blitzschlag") {
    let r;
    r = Math.floor(Math.random() * 4);
    if (r = 0) {
      doGlobalDamage(3);
    } else if (r = 1) {
      doTargetDamage(1, 3);
    } else if (r = 2) {
      doTargetDamage(2, 3);
    } else if (r = 3) {
      return;
    }
  }
}

function doTargetDamage(target, damage) { //function for doing damage to ... a specific player

}

function doGlobalDamage(damage) { //... evey player

}

function doGlobalDiceDamage(damage) { //... every dice
  playerHealthPoints[1] = playerHealthPoints[1] - damage;
  playerHealthPoints[2] = playerHealthPoints[2] - damage;
  enemyHealthPoints[1] = enemyHealthPoints[1] - damage;
  enemyHealthPoints[2] = enemyHealthPoints[2] - damage;
}

function healOneDice(target, amount) {

}

window.onload = preGameFunction();
