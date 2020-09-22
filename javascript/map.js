const containerOfEvents = document.querySelector('.container-of-events');
const wrapper = document.querySelector('.wrapper');
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
const sellingBuildingsBtn = document.querySelector('.selling-buildings');
const actualGoldInSellingBuildings = document.querySelector('.actualGoldInSellingBuildings');
const neededGoldInSellingBuildings = document.querySelector('.neededGoldInSellingBuildings');
const surrenderString = document.querySelector('.surrender-string');
const containerIfDontHaveMoney = document.querySelector('.container-if-do-not-have-money-selling-buildings-option');
const arrayOfSellingFieldsCosts = [];

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
      ...document.querySelectorAll(".field"),
    ];
  }

  sortElements(element) {
    let result;
    element.sort(function(a, b) {
      if (element == map.allLands) {
        result = a.classList[0] - b.classList[0];
      } else {
        a = a.offsetParent;
        b = b.offsetParent;
        result = a.classList[0] - b.classList[0];
      }
    return result ;
    });
  }

  appendPlayersOnMap() {
    for (let i = 0; i < game.players.length; i++) {
      this.allLands[game.players[i].field].children[0].appendChild(game.players[i].img);
    }
  }

  hidingDivs(div) {
    containerOfEvents.style.display = "none";
    div.style.display = "none";
  }

  showingDivs(div) {
    div.style.display = "grid";
    switch(div){
      // case containerOfBuyingHouses : case jailChooseOptionBox : case containerIfDontHaveMoney : 
      //   containerOfEvents.style.display = "grid";
      //   break
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
            },300);
          }, 1000);
        }, 0);
        break
      case containerOfPlayerWhoHasMovement:     //-----> Ruch gracza
        setTimeout(function() { // Poczatek animacji
          console.log('[numberOfShowing]',NumberOfShowingPlayerQueue);
          console.log('playerQu',playerQueue);
          NumberOfShowingPlayerQueue = playerQueue;
          if(doublet == false){
            NumberOfShowingPlayerQueue++;
            if(NumberOfShowingPlayerQueue >= game.players.length){
              NumberOfShowingPlayerQueue = 0 ;
            }
          }
          console.log('[numberOfShowing]',NumberOfShowingPlayerQueue);
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
      case containerIfDontHaveMoney:
        div.style.display = "grid";
        break; 
      default:
        containerOfEvents.style.display = "grid";
    }
  }

  showTheActualTributeOfField(actualPlayer){
    console.log('this',actualPlayer);
    arrayOfTributeFields[actualPlayer.field].textContent = Cities[actualPlayer.field].tribute + Cities[actualPlayer.field].costOfOneHouse  *  Cities[actualPlayer.field].houses ;
  }

  enteringTheNamesOfThePlayers(player) {
    arraysOfPlayersName[player.id - 1].textContent = player.nameOfPlayer ;   
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

  creatingDivForSellingField(money,marginLeft,marginTop,field){
    let div;
    let text;
    let input;
    div = document.createElement("div");
    div.classList.add("container-of-selling-field");
    console.log(marginLeft);
    console.log(marginTop);
    // div.style.marginLeft = (marginLeft -100) + "px";
    // div.style.marginTop = marginTop-80  + "px";
    // div.style.marginTop = marginTop + 30 + 'px';
    // div.style.marginLeft = marginLeft - 50 + 'px';
    text = document.createElement("p");
    text.classList.add("selling-field-money");
    text.textContent = money;

    input = document.createElement("input");
    input.classList.add("checkbox-in-selling-field");
    input.type = "checkbox";
    div.appendChild(input);
    div.appendChild(text);
    console.log(div);
    map.allLands[field].appendChild(div);
    // wrapper.appendChild(div);

  }
 
}
const map = new Map();
const jail = 8;

