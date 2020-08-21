const containerOfEvents = document.querySelector('.container-of-events');

const containerOfJailCommunicate = document.querySelector('.container-of-jail');
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
const arrayOfHousesCosts = [...document.querySelectorAll('.cost-of-house')];
const checkboxesCounterOfHouses = [...document.querySelectorAll('.checkboxes')];
const buyingButton =  document.querySelector('.buying-button');
const exit = document.querySelector('.exit') ;

const containerOfDoublet = document.querySelector('.container-of-doublet');

const arrayOfTributeFields = [...document.querySelectorAll('.javascript-sort-variable')];

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

  sortElements(element) {
    let result;
    element.sort(function(a, b) {
      if (element == arrayOfTributeFields) {
        if(a.parentElement.className == "tribute"){
          a = a.parentElement.parentElement.className
        } else {
          a = a.parentElement.className
        }

        if(b.parentElement.className == "tribute"){
          b = b.parentElement.parentElement.className
        } else {
          b = b.parentElement.className
        }
        result =  a - b ;
      } else {
        result = a.className - b.className;
      }
    return result ;
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

  showTheActualTributeOfField(actualPlayer){
    console.log('this',actualPlayer);
    arrayOfTributeFields[actualPlayer.field].textContent = Cities[actualPlayer.field].tribute + Cities[actualPlayer.field].costOfOneHouse  *  Cities[actualPlayer.field].houses ;
  }

  enteringTheNamesOfThePlayers(player) {
    arraysOfPlayersName[player.id - 1].textContent = player.nameOfPlayer;   
  }

  visualAmountOfMoney(player) {
    arrayOfPlayersMoney[player.id - 1].textContent = "Money: " + player.money;    // od 0 sie zacyznaja id a tablica od 1  dlatego -1
  }

  enteringThePriceOfBuildings(actualPlayer){
    for(let i = 0 ; i <= 5; i++){
      if(Cities[actualPlayer.field].houses  > -1){
        arrayOfHousesCosts[i].textContent = Cities[actualPlayer.field].costOfOneHouse *i;
      } else {
        arrayOfHousesCosts[i].textContent = Cities[actualPlayer.field].costOfOneHouse *i + Cities[actualPlayer.field].costOfTheField;
      }
    }
  }
}

const map = new Map();
const jail = 8;

