const chooseBox = document.querySelector('.container-choose-element');
const chooseBoxYesBtn = document.querySelector('.Yes-button');
const chooseBoxNoBtn = document.querySelector('.No-button');
const ifBuyedField = document.querySelector('.containerIfFieldIsBuyed');

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
    for (let i = 0; i < listPlayers.length; i++) {

      this.allLands[listPlayers[i].field].appendChild(listPlayers[i].img);
    }

  }

  hideChooseOption() {
    chooseBox.style.display = "none";
    btn.disabled = false;
  }
  showChooseOption() {
    chooseBox.style.display = "block";
  }
  enteringTheNamesOfThePlayers(thisPlayer){
  arraysOfPlayersName[thisPlayer.id-1].textContent = thisPlayer.nameOfPlayer;
  }
  visualAmountOfMoney(thisPlayer){
    arrayOfPlayersMoney[thisPlayer.id-1].textContent ="Money: " + thisPlayer.money;   
    // console.log('[TUTAJ]',arrayOfPlayersMoney[thisPlayer.id-1].textContent );    
  }
}
const map = new Map();

chooseBoxNoBtn.addEventListener("click", () => {
  map.hideChooseOption();
});
chooseBoxYesBtn.addEventListener("click",function() {

  listPlayers[playerQueue - 1].buyACity(); // Tutaj musze zmienic zeby nie odejmowac od playerQueque -1 bo to jest blad
  map.visualAmountOfMoney(listPlayers[playerQueue-1]);
});