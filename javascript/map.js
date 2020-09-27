const containerOfEvents = document.querySelector('.container-of-events');
const wrapper = document.querySelector('.wrapper');

const containerOfJailCommunicate = document.querySelector('.container-of-jail');
const jailChooseOptionBox = document.querySelector('.container-choose-option-jail');
const doubletOption = document.querySelector('#doublet-option');
const jailStayOption = document.querySelector('#jail-stay-option');
const paying300gOption = document.querySelector('#paying-300g-option');
const textShowingWhenPlayerDontHaveMoney = document.querySelector('.text-showing-if-player-dont-have-money');
const textShowingWhenPlayerDontHaveMoneyJail = document.querySelector('.text-showing-jail');

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
    arrayOfTributeFields[actualPlayer.field].textContent = Cities[actualPlayer.field].tribute * Cities[actualPlayer.field].multiplierMoney *Cities[actualPlayer.field].eventMultiplier ;
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

  creatingDivForSellingField(money,field){
    let div;
    let text;
    let input;

    div = document.createElement("div");
    div.classList.add("container-of-selling-field");

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
  }
  creatingInputsForPlayerTeleportingAndTeleportingPlayer(thisPlayer){
    btn.disabled = true;
    let inputArray = [];
    for(let i = 0 ; i < Cities.length;  i++){
      let input;
      input = document.createElement("input");
      input.type = "checkbox";
      input.style.height = "30px";
      input.style.width = "30px";
      input.style.marginLeft = "auto";
      input.style.marginRight = "auto";
      input.style.marginTop  = "15px";
      input.style.zIndex = "1";
      map.allLands[i].appendChild(input);
      inputArray.push(input);
    }
    console.log(inputArray);
    inputArray.forEach(function(target){
      target.addEventListener('click',function(){
        btn.disabled = false;
        thisPlayer.field = inputArray.indexOf(target);
        map.allLands[inputArray.indexOf(target)].children[0].appendChild(thisPlayer.img);
        for(let i = 0; i < map.allLands.length; i++){
          map.allLands[i].removeChild(map.allLands[i].lastElementChild);
        }
      })
    })
  }

  creatingInputForEventMultiplier(thisPlayer){
    let inputArray = [];
    if(thisPlayer.cities.length > 0){ 
      for(let i = 0 ; i < Cities.length; i ++){ 
        if(Cities[i].eventMultiplier > 1){
          Cities[i].eventMultiplier = 1;
          map.allLands[i].children[1].children[0].removeChild(map.allLands[i].children[1].children[0].lastElementChild);
          arrayOfTributeFields[i].textContent = Cities[i].tribute * Cities[i].multiplierDependFromHouses * Cities[i].eventMultiplier;             
        } 
        if(Cities[i].ownerOfField === thisPlayer){   // tell me which fields player have 
          let input;
          input = document.createElement("input");
          input.type = "checkbox";
          input.style.height = "30px";
          input.style.width = "30px";
          input.style.marginLeft = "auto";
          input.style.marginRight = "auto";
          input.style.marginTop  = "15px";
          input.style.zIndex = "1";
          map.allLands[i].appendChild(input);
          inputArray.push(input);
        }
      }
      inputArray.forEach(function(target){
          target.addEventListener('click',function(){
            let image ;
            image = document.createElement('img');
            image.classList.add("place-for-banner");
            image.src = "images/banner.png"
            image.identyficator = "banner";
            console.log(target.offsetParent.classList[0]);
            Cities[target.offsetParent.classList[0]].eventMultiplier = 2.5;
            map.allLands[target.offsetParent.classList[0]].children[1].children[0].appendChild(image);
            arrayOfTributeFields[target.offsetParent.classList[0]].textContent = Cities[target.offsetParent.classList[0]].tribute * Cities[target.offsetParent.classList[0]].eventMultiplier * Cities[target.offsetParent.classList[0]].multiplierDependFromHouses;
            for(let i = 0 ; i < map.allLands.length ; i++){
              if(Cities[i].ownerOfField == thisPlayer){
                map.allLands[i].removeChild(map.allLands[i].lastElementChild);
              }
            }
          })
          btn.disabled = false;
      })
    }else{
      btn.disabled = false;
    }
  }
}
const map = new Map();
const jail = 8;

