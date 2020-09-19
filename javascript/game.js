let playerQueue = 0;
let playerPick;
let doublet = true;
let flag = true;
let NumberOfShowingPlayerQueue ;


class Game {
  constructor() {
    this.players = [];
  }

  initiatePlayers() {
    const playersName = ["Wiercik", "Mateusz", "Michas", "Wojtini"];
    const playersColors = ["Red", "Blue", "Green", "Yellow"];
    for (let i = 0; i < playersName.length; i++) {
      createPlayer(playersName[i], playersColors[i]); // adding players and giving colors
      map.enteringTheNamesOfThePlayers(game.players[i]);
    }
  }

  sequenceOfMove() {
    game.players[playerQueue].move();
  }

  gameMechanism(thisPlayer) {
    // console.log('GRACZ -->', thisPlayer);
    let emptyFieldWithoutOwner = Cities[thisPlayer.field].ownerOfField === undefined && Cities[thisPlayer.field].specialField !== true ;
    let playerField = Cities[thisPlayer.field].ownerOfField === thisPlayer && Cities[thisPlayer.field].specialField === false;
    let otherPlayerField = Cities[thisPlayer.field].ownerOfField !== thisPlayer && Cities[thisPlayer.field].specialField !== true;
    let capital = Cities[thisPlayer.field].specialField === undefined; // Orgrimar,Stormwind etc.
    switch(true) {
      case emptyFieldWithoutOwner:
        checkboxesCounterOfHouses[5].disabled = true;// Function which disabled buying hotel before buyed a field 
        if(capital){
          for(let i = 1; i < checkboxesCounterOfHouses.length; i ++){
            checkboxesCounterOfHouses[i].disabled = true;
          }
        }else{
          for(let i = 0; i < checkboxesCounterOfHouses.length-1; i ++){
            checkboxesCounterOfHouses[i].disabled = false;
          }
        }
        textShowingWhenPlayerDontHaveMoney.style = 'display:none ';//  Setting starting value after  the end of buying
        map.showingDivs(containerOfBuyingHouses);
        this.listenerHowMuchHouses(thisPlayer);
        break;
      case playerField: // my field
        map.showingDivs(containerOfBuyingHouses);
        for (let i = 0; i < Cities[thisPlayer.field].houses + 1; i++) { // Functions which disabled buying houses that we have
          checkboxesCounterOfHouses[i].checked = true;
        }
        this.listenerHowMuchHouses(thisPlayer);
        break;
      case otherPlayerField: 
        let multiplierMoney;
        switch (Cities[thisPlayer.field].houses) { // tribute * multiplierMoney 
          case -1:
            multiplierMoney = 1;
            break;
          case 0:
            multiplierMoney = 1;
            break;
          case 1:
            multiplierMoney = 1.25;
            break;
          case 2:
            multiplierMoney = 1.5;
            break;
          case 3:
            multiplierMoney = 1.75;
            break;
          case 4:
            multiplierMoney = 2;
            break;
          case 5:
            multiplierMoney = 2.25;
            break;
          default:    
      }
      if(thisPlayer.money < Cities[thisPlayer.field].tribute * multiplierMoney ){
        console.log('[Masz za malo pieniedzy zeby zaplacic]' );
        map.showingDivs(containerIfDontHaveMoney);
        
      } else{
        thisPlayer.money -= Cities[thisPlayer.field].tribute * multiplierMoney;
        Cities[thisPlayer.field].ownerOfField.money += Cities[thisPlayer.field].tribute * multiplierMoney;
        map.visualAmountOfMoney(thisPlayer);
        map.visualAmountOfMoney(Cities[thisPlayer.field].ownerOfField);
        map.showingDivs(containerOfPlayerWhoHasMovement); 
      }  
      break
    case thisPlayer.field == jail:
      console.log('WIEZIENIE');
      if(thisPlayer.jail == false){
        map.showingDivs(containerOfJailCommunicate);
        thisPlayer.counterOfStayingInJail = 3;
        thisPlayer.jail = true;
        setTimeout(function() {
          map.showingDivs(jailChooseOptionBox);
        }, 1510);
      } else {
        if (thisPlayer.counterOfStayingInJail <= 1){
            thisPlayer.jail = false;
        } else {
          map.showingDivs(jailChooseOptionBox);   
          thisPlayer.counterOfStayingInJail --;
        }
      }
      console.log(`[LICZNIK SIEDZENIA W WIEZIENIU GRACZA] + ${thisPlayer.nameOfPlayer}`,thisPlayer.counterOfStayingInJail );
      break;
    case Cities[thisPlayer.field].specialField === true :  
      console.log('Special Places')
      break;
    default:
    }
    btn.disabled = false;
  }

  randomNum() {
    let number = Math.floor(Math.random() * (5 - 1) + 1);
    return number;
  }

  whoIsFirst() {
    let randomNumber = [];
    for (let i = 0; i < game.players.length; i++) {
      let number = this.randomNum();
      let genNumber = randomNumber.indexOf(number);
      if (genNumber === -1) {
        randomNumber.push(number);
      } else {
        while (genNumber !== -1) {
          number = this.randomNum();
          genNumber = randomNumber.indexOf(number);
          if (genNumber === -1) {
            randomNumber.push(number);
          }
        }
      }
    }
  this.setPositonsOfPlayers(randomNumber);
  }

  setPositonsOfPlayers(randomNumber) {
    for (let i = 0; i < game.players.length; i++) {
      game.players[i].queue = randomNumber[i];
    }
    game.players.sort(function (a, b) {
      return a.queue - b.queue
    })
  }
  
  listenerHowMuchHouses(thisPlayer) {
    map.enteringThePriceOfBuildings(thisPlayer);
    let amountOfHouses = Cities[thisPlayer.field].houses + 1;
    for (let i = amountOfHouses; i < checkboxesCounterOfHouses.length; i++) {
      checkboxesCounterOfHouses[i].addEventListener('click', function () {
        for (let i = amountOfHouses; i < checkboxesCounterOfHouses.length; i++) {
          checkboxesCounterOfHouses[i].checked = false;
        }
        playerPick = checkboxesCounterOfHouses[i];
        playerPick.checked = true;
        playerPick = Number(playerPick.id);
        if(playerPick != 0){
          buyingHouseImage.src = `images/${thisPlayer.color}${playerPick}Houses.png`;
        }
        return playerPick;
      })
    }
    return playerPick
  }

  buyingHouses(thisPlayer) {
    if(playerPick !== undefined){
      let requirement;
      if(Cities[thisPlayer.field].ownerOfField !== thisPlayer){
        requirement = ((Cities[thisPlayer.field].costOfTheField) + (Cities[thisPlayer.field].costOfOneHouse * playerPick));   // checking if player had this field to add cost of the field 
      } else {
        requirement =  (Cities[thisPlayer.field].costOfOneHouse * playerPick);
      }
      if(thisPlayer.money >= requirement ){
        if (Cities[thisPlayer.field].houses === -1) { // Field is empty
          console.log('[PIENIADZE GRACZA PRZED MATEMATYKA]', thisPlayer.money);
          console.log('[KOSZT POLA]', Cities[thisPlayer.field].costOfTheField);
          console.log('[KOSZT DOMKU]', Cities[thisPlayer.field].costOfOneHouse);
          console.log('[ILOSC DOMKOW]', playerPick);
          console.log('[MATEMATYKA]', ((Cities[thisPlayer.field].costOfTheField) + (Cities[thisPlayer.field].costOfOneHouse * playerPick)));
          thisPlayer.money -= ((Cities[thisPlayer.field].costOfTheField) + (Cities[thisPlayer.field].costOfOneHouse * playerPick));
          console.log('[PIENIADZE GRACZA PO MATEMATYCE]', thisPlayer.money);
        } else if (Cities[thisPlayer.field].houses > -1) {
          console.log('[PIENIADZE GRACZA PRZED MATEMATYKA]', thisPlayer.money);
          console.log('[KOSZT DOMKU]', Cities[thisPlayer.field].costOfOneHouse);
          console.log('[ILOSC DOMKOW JUZ NA POLU]', Cities[thisPlayer.field].houses);
          console.log('[ILOSC DOMKOW KTORE KUPUJESZ]', playerPick);
          thisPlayer.money -= ((Cities[thisPlayer.field].costOfOneHouse * playerPick) - (Cities[thisPlayer.field].houses * Cities[thisPlayer.field].costOfOneHouse));
          console.log('[PIENIADZE GRACZA PO MATEMATYCE]', thisPlayer.money);
         }
         if(playerPick === 0){
          map.allLands[thisPlayer.field].style.border = `2px solid ${thisPlayer.color}`
         } else {
          map.allLands[thisPlayer.field].children[1].firstElementChild.firstElementChild.src = `images/${thisPlayer.color}${playerPick}Houses.png`;
          map.allLands[thisPlayer.field].children[1].firstElementChild.firstElementChild.style.display = "initial";
          map.allLands[thisPlayer.field].style.border = `2px solid ${thisPlayer.color}`
         }
        map.visualAmountOfMoney(thisPlayer);
        Cities[thisPlayer.field].houses = playerPick;
        Cities[thisPlayer.field].ownerOfField = thisPlayer;
        thisPlayer.cities += Cities[thisPlayer.field].fieldName;
        console.log(thisPlayer.cities);
        map.hidingDivs(containerOfBuyingHouses);
        btn.disabled = false;
        map.showingDivs(containerOfPlayerWhoHasMovement);
        map.showTheActualTributeOfField(thisPlayer);
        checkboxesCounterOfHouses[playerPick].checked = false;
        playerPick = undefined;              // --||--
      } else {
        textShowingWhenPlayerDontHaveMoney.style = 'display:block';
        console.log('MASZ ZA MALO PIENIEDZY');
      }
    } else {
      map.hidingDivs(containerOfBuyingHouses);
      btn.disabled = false;
      map.showingDivs(containerOfPlayerWhoHasMovement);
    }
  }

  surrenderOption(thisPlayer){ 
    for(let i = 0 ; i < Cities.length; i ++){
      if(Cities[i].ownerOfField === thisPlayer){
        let money = (Cities[i].costOfOneHouse * Cities[i].houses + Cities[i].costOfTheField)/2;
        let marginTop = map.allLands[i].offsetTop;
        let marginLeft = map.allLands[i].offsetLeft;
        map.allLands[i].style.border = 'solid blue 3px';
        map.creatingDivForSellingField(money,marginLeft,marginTop,i);
      }
    }
    map.showingDivs(containerIfDontHaveMoney);
    }

    kickPlayer(){
      this.deletingEverythingThatPlayerHad();
      this.players.splice(playerQueue,1);
      map.hidingDivs(containerIfDontHaveMoney);
      playerQueue--;
      map.showingDivs(containerOfPlayerWhoHasMovement);
    }

    deletingEverythingThatPlayerHad(){
      for(let i = 0 ; i < Cities.length; i ++){
        if(Cities[i].ownerOfField === this.players[playerQueue]){
          Cities[i].ownerOfField = undefined;
          Cities[i].houses = -1;
          map.allLands[i].children[1].firstElementChild.firstElementChild.src = "data:,";
          map.allLands[i].children[1].firstElementChild.firstElementChild.style.display = "none";
        }
      }
      
      for(let i = 0 ; i < map.allLands[this.players[playerQueue].field].children[0].children.length ; i++){
        console.log('[first ]', map.allLands[this.players[playerQueue].field].children[0].children[i].imgIdentyficator );
        console.log('[second]', game.players[playerQueue].nameOfPlayer);
        
        
        if(map.allLands[this.players[playerQueue].field].children[0].children[i].imgIdentyficator == game.players[playerQueue].nameOfPlayer){
          map.allLands[this.players[playerQueue].field].children[0].removeChild( map.allLands[this.players[playerQueue].field].children[0].children[i]);
          console.log('[BYLEM]', );
          
        } 
      }
      doublet = false;
      
// == `images/player${this.players[playerQueue].id}`
   }
}  
  

function createPlayer(name, color) {
  let position = game.players.length + 1;
  const newPlayer = new Player(name, position, color);
  game.players.push(newPlayer);
}

const animated = cube.getCubes()[0];

animated.addEventListener('transitionend', function  ()  {
  if (flag === true) { // cube.js  26th line  flage only one times execute
    if(game.players[playerQueue].jail === false){
      game.players[playerQueue].amountOfMoves = cube.lastThrows[0] + cube.lastThrows[1];  // first cube + Second cube
      if (doublet == true) {
        setTimeout(function () {
          map.showingDivs(containerOfDoublet);
          setTimeout(function () {
            game.sequenceOfMove();
          }, 500) // set timeout of  start animation when  div hide away.
         }, 700); // set timeout for 0.5 sec for user look on cubes  and know he have a doublet.  
      } else {
        game.sequenceOfMove();
        btn.disabled = true;
        }
        // <--------There is if's statements for jail----------->
    } else if( game.players[playerQueue].jail === true && game.players[playerQueue].tryingDoublet === false) {   
      game.players[playerQueue].amountOfMoves = 0;
      game.gameMechanism(game.players[playerQueue]);  // --> Get into game mechanism and go to switch jail option
      }
      else if (game.players[playerQueue].jail === true && game.players[playerQueue].tryingDoublet === true){
        console.log('[GRacz wykonuje dublet]',game.players[playerQueue]);
        if(doublet == true){
          game.players[playerQueue].counterOfStayingInJail = 0;
          game.gameMechanism(game.players[playerQueue]);
        } else {
          btn.disabled = false; 
        }
        game.players[playerQueue].tryingDoublet = false;
      }
  }
});
// setInterval(function(),czas)
btn.addEventListener("click", () => {
  btn.disabled = true;
  if (doublet == false && game.players[playerQueue].tryingDoublet == false) {
    playerQueue++;    
    if (playerQueue > game.players.length - 1) {
      playerQueue = 0;
    }  
  }
  cube.getNumberRandom(7, 1); //6 -max  1 -min
  // console.log('[end in click]', movementStatus);
});
buyingButton.addEventListener('click', () => game.buyingHouses(game.players[playerQueue]));
// sellingBuildings.addEventListener('click', () => game.surrenderOption(game.players[playerQueue]));
sellingBuildings.addEventListener('click', () =>map.hidingDivs(containerIfDontHaveMoney) );
surrenderString.addEventListener('click',() => {
  game.kickPlayer()
} );
doubletOption.addEventListener('click',function(){
 console.log("ROBIE DUBLET !");
 map.hidingDivs(jailChooseOptionBox);
 game.players[playerQueue].tryingDoublet = true;
});
jailStayOption.addEventListener('click',function(){
  map.hidingDivs(jailChooseOptionBox);
  map.showingDivs(containerOfPlayerWhoHasMovement);
});
paying300gOption.addEventListener('click',function(player){
  if( game.players[playerQueue].money >= 300){
    game.players[playerQueue].money -= 300;
    game.players[playerQueue].jail = false; 
    game.players[playerQueue].counterOfStayingInJail = 0;
    map.hidingDivs(jailChooseOptionBox);
    map.visualAmountOfMoney(game.players[playerQueue]);
    doublet = true; // there i  used the variable with doublet bcs it have the same work to do as creating new variable with tell that player has payed and must do a move 
    console.log('PLACE 300 G'); 
  } else {
    textShowingWhenPlayerDontHaveMoney.style = 'display:block !important';
    console.log('Nie masz tyle pieniedzy');
  }
  
});


const game = new Game();

game.initiatePlayers();
game.whoIsFirst();
map.sortElements(map.allLands);
// map.sortElements(arrayOfSellingFieldsCosts);
map.appendPlayersOnMap();
map.showingDivs(containerOfPlayerWhoHasMovement);
// map.showingDivs(containerIfDontHaveMoney);
// map.showingDivs(containerIfDontHaveMoney);
// map.showingDivs(containerOfBuyingHouses); 
map.sortElements(arrayOfTributeFields);
// console.log(arrayOfTributeFields);
// console.log(arrayOfTributeFields[0].offsetParent);
for (let i = 0; i < 4; i++) {
  console.log('GRACZ:', game.players[i]);
}
// console.log(arrayOfTributeFields[2].parentElement.parentElement);
for(let i = 4 ; i <12 ;i++){
  Cities[i].ownerOfField = game.players[0];
  Cities[i].houses = 4;
  game.players[0].cities.push( Cities[i].fieldName); 
}
for(let i = 29 ; i < 31 ;i++){
  Cities[i].ownerOfField = game.players[1];
  Cities[i].houses = 4;
  game.players[1].cities.push( Cities[i].fieldName); 
}
game.players[0].field = 2;
game.players[2].field = 3;
// RUCH GRACZA +++ 
// DIV Z INFORMACJA KTO WYKONUJE RUCH +++ 
// KOLEJNOSC GRACZY +++ 
// WIEZIENIE I KARTY I EVENT +---
// PLACENIE GRACZOM +++
// POSTAWIANIE DOMKOW +++
// MNOZNIKI PIENIAZKOW W ZALEZNOSCI OD ILOSCI DOMKOW +++
// KICKOWANIE GRACZA JESLI NIE MA PIENIEDZY +-+
// INTERFEJS GRACZY I KTO ILE MA PIENIEDZY +++
// UJEMNY BILANS PIENIEDZY +++
// LADNY WYGLAD +++ 
// NAZEWNICTWO(POPRAWNE) ZMIENNYCH/FUNKCJI +++
// POPRAWNOSC KODU +++(Pewnie się mylę ;)
// WIDOCZNOSC KTO MA POLE +++
// DUBLET +++