let deck = []; //Nachziehstapel
let stack = []; //Ablagestapel
let graveyard = []; //Friedhof für bereits ausgewertete Karten
let enemyHealthPoints = []; //NPC Lebenspunkte
let playerHealthPoints = []; //Spieler Lebenspunkte
let numberOfHandCards; //Anzahl der maximalen Handkarten
let enemyHandCards = []; //Handkarten des NPC's
let playerHandCards = []; //Handkarten des Spielers

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
  "Panic Button",
  "Panic Button",
  "Panic Button",
  "Panic Button",
  "Blithschlag",
  "Blithschlag",
  "Blithschlag",
  "Blithschlag",
  "Erdbeben",
  "Erdbeben",
  "Erdbeben",
  "Heilender Segen",
  "Heilender Segen",
  "Heilender Segen",
  "Heilender Segen",
  "Sintflut",
  "Sintflut",
  "Eiszeit",
  "Eiszeit",
  "Eiszeit"
];

function preGameFunction() { //vorbereitende Funktion
  enemyHealthPoints,
  playerHealthPoints = [20, 20]; //Festsetzen der Spielerlebenspunkte
  numberOfHandCards = 5; //Festsetzen der maximale Handkartenzahl
  deck = Deck.map((card) => card);
  evaluationRound(); //Übergang in die Auswertungsrunde um Starthände zu verteilen
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

function swapHealth() {
  let storeValue, storeIndex;
  storeValue = Math.min(...playerHealthPoints);
  storeIndex = enemyHealthPoints.indexOf(Math.min(...enemyHealthPoints));
  playerHealthPoints[playerHealthPoints.indexOf(Math.min(...playerHealthPoints))] = Math.min(...enemyHealthPoints);
  enemyHealthPoints[storeIndex] = storeValue;
}

function evaluationRound() { // Funktion in der der Stack ausgewertet wird, jeweils einer der beiden Lebenspunkte-"Würfel" pro SPiler miteinander vertauscht werden und neue Handkarten verteilt werden
  while (stack.length >= 1) {
    cardEffects(stack[stack.length - 1], stack[stack.length - 2]);
    graveyard.push(stack[stack.length - 2]);
    stack.length = stack.length - 2;
  }
  swapHealth();
  while (playerHandCards < numberOfHandCards){
  randomCardPush(deck, playerHandCards);
  //drawCard(playerHandCards);
}
while (enemyHandCards < numberOfHandCards){
  randomCardPush(deck, enemyHandCards);
  //drawCard(enemyHandCards);
}
  stackingRound();
}


 function stackingRound() { //Funktion für die Spielphase in der Karten auf den Stack gelegt werden, aber im Normalfall noch keinen Effekt haben (im Moment noch random Karten der einzelnen Spieler)
 let playerturn = true;
 let i;
   while (playerHandCards > 0 || enemyHandCards > 0) {
    if (playerturn = true){
      randomCardPush(playerHandCards,stack);
      stack.push(1);
      playerturn = false;
   }
   else if (playerturn = false){
     randomCardPush(enemyHandCards,stack);
     stack.push(2);
     playerturn = true;
   }
 }
 evaluationRound();
}

function randomCardPush(originArray,targetArray){ //Funktion zum "Pushen" einer Random "Karte" aus einem Quell-Array in ein Zielarray
  let i;
  i = Math.floor(Math.random() * originArray.length);

  if (i in originArray) {
    targetArray.push(deck[i]);
    originArray.splice(i, 1);
}
return;
}

window.onload = preGameFunction(); //automatischer Scriptstart bei aufrufen der Seite
