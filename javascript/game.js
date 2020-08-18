let playerQueue = 0;
let playerPick;
let doublet = true;
let flag = true;
let NumberOfShowingPlayerQueue = 0;


class Game {
  constructor() {
    this.players = [];
  }

  initiatePlayers() {
    const playersName = ["Wiercik", "Mateusz", "Michas", "Wojtini"];
    const playersColors = ["Red", "Blue", "Green", "Yellow"];
    for (let i = 0; i < playersName.length; i++) {
      createPlayer(playersName[i], playersColors[i]); // dodawanie graczy  i ustawienie ich kolorów
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
    switch(true) {
      case emptyFieldWithoutOwner:
        map.showingDivs(containerOfBuyingHouses);
        for (let i = 1; i < 6; i++) { // Function which disabled buying houses before buyed a field 
          checkboxesCounterOfHouses[i].disabled = true;
        }
        this.listenerHowMuchHouses(thisPlayer);
        break
      case playerField: // my field
        map.showingDivs(containerOfBuyingHouses);
        for (let i = 0; i < Cities[thisPlayer.field].houses + 1; i++) { // Functions which disabled buying houses that we have
          checkboxesCounterOfHouses[i].checked = true;
        }
        this.listenerHowMuchHouses(thisPlayer);
        break
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
      thisPlayer.money -= Cities[thisPlayer.field].tribute * multiplierMoney;
      Cities[thisPlayer.field].ownerOfField.money += Cities[thisPlayer.field].tribute * multiplierMoney;
      map.visualAmountOfMoney(thisPlayer);
      map.visualAmountOfMoney(Cities[thisPlayer.field].ownerOfField);
      map.showingDivs(containerOfPlayerWhoHasMovement);   
      break
    case thisPlayer.field == jail:
      console.log('WIEZIENIE');
      if(thisPlayer.jail == false){
        map.showingDivs(containerOfJailCommunicate);
        thisPlayer.counterOfStayingInJail = 3;
        thisPlayer.jail = true;
        setTimeout(function() {
          map.showingDivs(jailChooseOptionBox);
        },1510);
      } else {
          if (thisPlayer.counterOfStayingInJail == 0){
            thisPlayer.jail = false;
          } else {
            map.showingDivs(jailChooseOptionBox);   
            thisPlayer.counterOfStayingInJail --;
          }
         
      }
      
      console.log('[LICZNIK SIEDZENIA NA DUPIE GRACZA]',thisPlayer.counterOfStayingInJail );
      
     

     
      
      //Wyswietla okienko ze trafiles do wiezienia chyba ze juz sie jest w wiezeniu
      //Wyswietla okno z opcja wydania golda na wyjscie z wiezienia, uzycia karty , zrobienia doubletu
      break
    case Cities[thisPlayer.field].specialField === true :  
      console.log('Special Places')
      break;
    default:
    }
    btn.disabled = false;
    // gameStatus = false;
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
    let amountOfHouses = Cities[thisPlayer.field].houses + 1;
    for (let i = amountOfHouses; i < checkboxesCounterOfHouses.length; i++) {
      checkboxesCounterOfHouses[i].addEventListener('click', function () {
        for (let i = amountOfHouses; i < checkboxesCounterOfHouses.length; i++) {
          checkboxesCounterOfHouses[i].checked = false;
        }
        playerPick = checkboxesCounterOfHouses[i];
        playerPick.checked = true;
        playerPick = Number(playerPick.id);
        buyingHouseImage.src = `images/(${thisPlayer.color})${playerPick}Houses.png`;
        return playerPick;
      })
    }
    return playerPick
  }

  buyingHouses(thisPlayer) {
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
    map.allLands[thisPlayer.field].firstElementChild.firstElementChild.src = `images/(${thisPlayer.color})${playerPick}Houses.png`;
    map.visualAmountOfMoney(thisPlayer);
    Cities[thisPlayer.field].houses = playerPick;
    Cities[thisPlayer.field].ownerOfField = thisPlayer;
    thisPlayer.cities += Cities[thisPlayer.field].fieldName;
    console.log(thisPlayer.cities);
    map.hidingDivs(containerOfBuyingHouses);
    btn.disabled = false;
    map.showingDivs(containerOfPlayerWhoHasMovement);
  }

  

}

function createPlayer(name, color) {
  let position = game.players.length + 1;
  const newPlayer = new Player(name, position, color);
  game.players.push(newPlayer);
}

const animated = cube.getCubes()[0];

animated.addEventListener('transitionend', function  ()  {
  if (flag === true) { // cube.js  26 -linia  flaga zeby tylko raz wykonywala sie  funkcja od animacji
    if(game.players[playerQueue].jail === false){
      game.players[playerQueue].amountOfMoves = cube.lastThrows[0] + cube.lastThrows[1];  // first cube + Second cube
      if (doublet == true) {
        NumberOfShowingPlayerQueue = playerQueue;
        setTimeout(function () {
          map.showingDivs(containerOfDoublet);
          setTimeout(function () {
            game.sequenceOfMove();
          }, 500) // set timeout of  start animation when  div hide away.
         }, 700); // set timeout for 0.5 sec for user look on cubes  and know he have a doublet.  
      } else {
        NumberOfShowingPlayerQueue++
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
        }else {
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
  }

  cube.getNumberRandom(7, 1); //7 -max  1 -min
  // console.log('[end in click]', movementStatus);
});
buyingButton.addEventListener('click', () => game.buyingHouses(game.players[playerQueue]));
doubletOption.addEventListener('click',function(){
 console.log("ROBIE DUBLET !");
 map.hidingDivs(jailChooseOptionBox);
 game.players[playerQueue].tryingDoublet = true;
});
jailStayOption.addEventListener('click',function(){
  console.log('ZOSTAJE W WIEZIENIU');
  map.hidingDivs(jailChooseOptionBox);
});
paying300gOption.addEventListener('click',function(player){
  if( game.players[playerQueue].money >= 300){
    game.players[playerQueue].money -= 300;
    game.players[playerQueue].jail = false; 
    game.players[playerQueue].counterOfStayingInJail = 0;
    map.hidingDivs(jailChooseOptionBox);
    map.visualAmountOfMoney(game.players[playerQueue]);
    console.log('PLACE 300 G'); 
  } else {
    textShowingWhenPlayerDontHaveMoney.style = 'display:block !important';
    console.log('Nie masz tyle pieniedzy');
  }
  //TRZEBA ZROBIC ZEBY USUWALO TEN NAPIS
  
});

const game = new Game();

game.initiatePlayers();
game.whoIsFirst();
map.sortAllLands();
map.appendPlayersOnMap();
map.showingDivs(containerOfPlayerWhoHasMovement);
for (let i = 0; i < 4; i++) {
  console.log('GRACZ:', game.players[i]);
}
// for(let i = 0 ; i <12 ;i++){
//   Cities[i].ownerOfField = game.players[0];
//   Cities[i].houses = 0;
// }
// RUCH GRACZA +++ 
// DIV Z INFORMACJA KTO WYKONUJE RUCH +++ (Trzeba zrobic zeby wykonywalo sie zawsze na koncu ruchu ?)
// KOLEJNOSC GRACZY +++ 
// WIEZIENIE I KARTY I EVENT +---
// PLACENIE GRACZOM +++
// POSTAWIANIE DOMKOW +++
// MNOZNIKI PIENIAZKOW W ZALEZNOSCI OD ILOSCI DOMKOW +++
// KICKOWANIE GRACZA JESLI NIE MA PIENIEDZY ---
// INTERFEJS GRACZY I KTO ILE MA PIENIEDZY +++
// UJEMNY BILANS PIENIEDZY ---
// LADNY WYGLAD +++ 
// NAZEWNICTWO(POPRAWNE) ZMIENNYCH/FUNKCJI +++
// POPRAWNOSC KODU +++(Pewnie się mylę ;)
// WIDOCZNOSC KTO MA POLE +++
// DUBLET +++