const containerOfEvents = document.querySelector('.container-of-events');
// const chooseBox = document.querySelector('.container-choose-element');                 This Elements I will use in future
// const chooseBoxYesBtn = document.querySelector('.Yes-button');
// const chooseBoxNoBtn = document.querySelector('.No-button');                   
// const ifBuyedField = document.querySelector('.containerIfFieldIsBuyed');
// const jail = document.querySelector('.jail');
const jailChooseOptionBox = document.querySelector('.container-choose-option-jail');
const doubletOption = document.querySelector('#doublet-option');
const jailStayOption = document.querySelector('#jail-stay-option');
const paying300gOption = document.querySelector('#paying-300g-option');
const textShowingWhenPlayerDontHaveMoney = document.querySelector('.text-showing-if-player-dont-have-money');

const containerOfPlayerWhoHasMovement = document.querySelector('.container-of-player-queue');
const imageOfPlayerWhoHasMovement = document.querySelector('.image-of-player-who-has-movement');
const nameOfPlayerWhoHasMovement = document.querySelector('.container-of-player-queue p');

const containerOfBuyingHouses = document.querySelector('.box-of-buying-houses');
const buyingHouseImage = document.querySelector('.house');
const checkboxesCounterOfHouses = [...document.querySelectorAll('.checkboxes')];
const buyingButton =  document.querySelector('.buying-button');
const containerOfDoublet = document.querySelector('.container-of-doublet');
const containerOfJailCommunicate = document.querySelector('.container-of-jail')
const arrayOfPlayersMoney = [
  playerFirstOnMapMoney = document.querySelector('.player-first-money'),
  playerSecondOnMapMoney = document.querySelector('.player-second-money'),
  playerThirdOnMapMoney = document.querySelector('.player-third-money'),
  playerFourthOnMapMoney = document.querySelector('.player-fourth-money'),
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
    this.allLands.sort(function(a, b) {
      return a.className - b.className;
    });
  }

  appendPlayersOnMap() {
    for (let i = 0; i < game.players.length; i++) {
      this.allLands[game.players[i].field].appendChild(game.players[i].img);
    }
  }

  hidingDivs(div) {
    containerOfEvents.style.display = "none";
    div.style.display = "none";
  }

  showingDivs(div) {
    div.style.display = "grid";
    switch(div){
      case containerOfBuyingHouses : case jailChooseOptionBox:
        containerOfEvents.style.display = "grid";
        break
      case containerOfDoublet: case containerOfJailCommunicate:      //-----> Doublet
        setTimeout(function() { // Poczatek animacji
          containerOfEvents.style.opacity = 1;
          containerOfEvents.style.display = "grid";
          setTimeout(function() {    // 2sekundy animacji
            containerOfEvents.style.opacity = 0;
            setTimeout(function() {    // Koniec animacji 
              containerOfEvents.style.opacity = 1;
              containerOfEvents.style.display = "none";
              div.style.display = "none";
            },500);
          }, 1000);
        }, 0);
        break
      case containerOfPlayerWhoHasMovement:     //-----> Ruch gracza
        if (NumberOfShowingPlayerQueue == 4) {
          NumberOfShowingPlayerQueue = 0;
        }
        setTimeout(function() { // Poczatek animacji
          nameOfPlayerWhoHasMovement.textContent = game.players[NumberOfShowingPlayerQueue].nameOfPlayer;
          imageOfPlayerWhoHasMovement.src = game.players[NumberOfShowingPlayerQueue].image;
          containerOfEvents.style.opacity = 1;
          containerOfEvents.style.display = "grid";    
          setTimeout(function() {    // 2sekundy animacji
            containerOfEvents.style.opacity = 0;
            setTimeout(function() {    // Koniec animacji 
              containerOfEvents.style.opacity = 1;             
              containerOfEvents.style.display = "none";
              div.style.display = "none";
            },500);
          }, 2000);
        }, 0);
        break;
      default:
    }
  }

  enteringTheNamesOfThePlayers(thisPlayer) {
    arraysOfPlayersName[thisPlayer.id - 1].textContent = thisPlayer.nameOfPlayer;   
  }

  visualAmountOfMoney(thisPlayer) {
    arrayOfPlayersMoney[thisPlayer.id - 1].textContent = "Money: " + thisPlayer.money;    // od 0 sie zacyznaja id a tablica od 1  dlatego -1
  }
}

const map = new Map();
const jail = 8;
