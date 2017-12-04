var deck = []; //Nachziehstapel
var stack = []; //Ablagestapel
var graveyard = []; //Friedhof für bereits ausgewertete Karten
var enemyHealthPoints = []; //NPC Lebenspunkte
var playerHealthPoints = []; //Spieler Lebenspunkte
var numberOfHandCards; //Anzahl der maximalen Handkarten
var enemyHandCards = []; //Handkarten des NPC's
var playerHandCards = []; //Handkarten des Spielers


window.onload = preGameFunction(); //automatischer Scriptstart bei aufrufen der Seite


function preGameFunction() { //vorbereitende Funktion

  enemyHealthPoints,
  playerHealthPoints = [20, 20]; //Festsetzen der Spielerlebenspunkte
  numberOfHandCards = 5; //Festsetzen der maximale Handkartenzahl
  deck = [
    "Funken",
    "Funken",
    "Funken",
    "Funken",
    "Funken",
    "Glut",
    "Glut",
    "Glut",
    "Glut",
    "Feuerbal",
    "Feuerbal",
    "Feuerbal",
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
  //Deck deklarieren
  evaluationRound(); //Übergang in die Auswertungsrunde um Starthände zu verteilen

}

function evaluationRound() {

  while (stack.length >= 1) {
    cardEffects(stack[stack.length - 1], stack.length - 2);
    graveyard.push(stack[stack.length - 2])
    stack.length = stack.length - 2;

  }
  //if (stack.length = 0; playerHandCards.length < numberOfHandCards || enemyHandCards.length < numberOfHandCards) {

  swapHealth();
  drawCards(playerHandCards);
  drawCards(enemyHandCards);
  stackingRound();
}

function stackingRound() {

  if (playerHandCards > 0 || enemyHandCards > 0) {


  }
}

function swapHealth() {
  var storeValue, storeIndex;
  storeValue = Math.min(...playerHealthPoints);
  storeIndex = enemyHealthPoints.indexOf(Math.min(...enemyHealthPoints));
  playerHealthPoints[playerHealthPoints.indexOf(Math.min(...playerHealthPoints))] = Math.min(...enemyHealthPoints);
  enemyHealthPoints[storeIndex] = storeValue;
}

function drawCard(targetHand) {
  var i;

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
}
