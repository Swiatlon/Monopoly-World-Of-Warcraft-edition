const chooseBox = document.querySelector('.container-choose-element');
const chooseBoxYesBtn = document.querySelector('.Yes-button');
const chooseBoxNoBtn = document.querySelector('.No-button');
const ifBuyedField = document.querySelector('.containerIfFieldIsBuyed');
const Jail = document.querySelector('.jail');
const imageOfPlayerWhoHasMovement = document.querySelector('.image-of-player-who-has-movement');
const nameOfPlayerWhoHasMovement = document.querySelector('.container-of-player-queue-center p');
const containerOfPlayerWhoHasMovement = document.querySelector('.container-of-player-queue');
const arrayOfPlayersMoney = [
  playerFirstOnMapMoney = document.querySelector('.money-first'),
  playerSecondOnMapMoney = document.querySelector('.money-second'),
  playerThirdOnMapMoney = document.querySelector('.money-third'),
  playerFourthOnMapMoney = document.querySelector('.money-fourth'),
]
const arraysOfPlayersName = [
  playerFirstName = document.querySelector('.player-first-name'),
  playerSecondName = document.querySelector('.player-second-name'),
  playerThirdName = document.querySelector('.player-third-name'),
  playerFourthName = document.querySelector('.player-fourth-name'),
]

class Map {
  constructor() {
    this.allLands = [
      ...document.querySelectorAll(".board__eastern-kingdom-container div"),
      ...document.querySelectorAll(".board__kalimdor-container div"),
      ...document.querySelectorAll(".board__outland-container div"),
      ...document.querySelectorAll(".board__northrend-container div")
    ];

  }

  sortAllLands() {
    this.allLands.sort(function (a, b) {
      return a.className - b.className;
    });
  }

  draw() {
    for (let i = 0; i < game.players.length; i++) {

      this.allLands[game.players[i].field].appendChild(game.players[i].img);
    }

  }

  hideChooseOption() {
    chooseBox.style.display = "none";
    btn.disabled = false;
  }
  showChooseOption() {
    chooseBox.style.display = "block";
  }
  enteringTheNamesOfThePlayers(thisPlayer) {
    arraysOfPlayersName[thisPlayer.id - 1].textContent = thisPlayer.nameOfPlayer;
  }
  visualAmountOfMoney(thisPlayer) {
    arrayOfPlayersMoney[thisPlayer.id - 1].textContent = "Money: " + thisPlayer.money;
    // console.log('[TUTAJ]',arrayOfPlayersMoney[thisPlayer.id-1].textContent );    
  }
  showingTheDivOfWhoHasMovement() {
    let positionOfPlayers = playerQueue;
    if (playerQueue == 4) {
      positionOfPlayers = 0;
    }
    setTimeout(function () {
      nameOfPlayerWhoHasMovement.textContent = game.players[positionOfPlayers].nameOfPlayer;
      imageOfPlayerWhoHasMovement.src = game.players[positionOfPlayers].image;

      containerOfPlayerWhoHasMovement.style.opacity = 1;
      containerOfPlayerWhoHasMovement.style.visibility = "visible";

      setTimeout(function () {

        containerOfPlayerWhoHasMovement.style.opacity = 0;
        containerOfPlayerWhoHasMovement.style.visibility = "hidden";

      }, 2000);
    }, 0)

  }

}
const map = new Map();

chooseBoxNoBtn.addEventListener("click", () => {
  map.hideChooseOption();
  map.showingTheDivOfWhoHasMovement();
});
chooseBoxYesBtn.addEventListener("click", function () {

  game.players[playerQueue - 1].buyACity(); // Tutaj musze zmienic zeby nie odejmowac od playerQueque -1 bo to jest blad dzieje sie tak poniewaz przez asynchronicznosc
  map.visualAmountOfMoney(game.players[playerQueue - 1]);
  map.showingTheDivOfWhoHasMovement();


});

const jail = 8;
const arrayOfDisabledBuyedFields = [0, 8, 12, 16, 20, 24, 28];