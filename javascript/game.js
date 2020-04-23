let playerQueue = -1;
let playerPick;
let doublet = null;
let flag = true;


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
    console.log('GRACZ -->', thisPlayer);



    
    if ((Cities[thisPlayer.field].ownerOfField === undefined || Cities[thisPlayer.field].ownerOfField.nameOfPlayer === thisPlayer.nameOfPlayer) && Cities[thisPlayer.field].specialField !== true) {


      map.showingDivs(containerOfBuyingHouses);
      // console.log("TYLE RAZY SIE WYKONALEM -- >");
      for (let i = 0; i < Cities[thisPlayer.field].houses + 1; i++) { // FUNKCJA OD BLOKOWANIA ILOSCI KUPIONCYCH WCZESNIEJ DOMKOW
        checkboxes[i].checked = true;
      }
      this.listenerHowMuchHouses(thisPlayer);



      btn.disabled = false;
    } else if (Cities[thisPlayer.field].ownerOfField !== thisPlayer.nameOfPlayer && Cities[thisPlayer.field].ownerOfField !== 0 && Cities[thisPlayer.field].specialField !== true) { // pole jest kogos innego
      let multiplierMoney;
      console.log('[ILOSC DOMKOW NA POLU]', Cities[thisPlayer.field].houses);

      switch (Cities[thisPlayer.field].houses) {

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
      console.log('[MULTIPLIER]', Cities[thisPlayer.field].tribute * multiplierMoney);

      Cities[thisPlayer.field].ownerOfField.money += Cities[thisPlayer.field].tribute * multiplierMoney;

      btn.disabled = false;
      map.visualAmountOfMoney(thisPlayer);
      map.visualAmountOfMoney(Cities[thisPlayer.field].ownerOfField);
    } else if (thisPlayer.field == jail) {
     console.log('WIEZIENIE'); 
    

    } else {
      console.log('[jestem w elsie]', );


    }

    // playerQueue++


    // if(!(Cities[thisPlayer.field].ownerOfField == 0 && arrayOfDisabledBuyedFields.includes(thisPlayer.field) === false)){
    //   map.showingTheDivOfWhoHasMovement();
    // }

  }

  randomNum() {
    let number = Math.floor(Math.random() * (5 - 1) + 1);
    return number;
  }
  // fieldJailOrSpecialEvent(){
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
  // }
  listenerHowMuchHouses(thisPlayer) {


    let amountOfHouses = Cities[thisPlayer.field].houses + 1;
    for (let i = amountOfHouses; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', function () {
        for (let i = amountOfHouses; i < checkboxes.length; i++) {
          checkboxes[i].checked = false;

        }
        playerPick = checkboxes[i];
        playerPick.checked = true;
        playerPick = Number(playerPick.id);
        buyingHouseImage.src = `images/(${thisPlayer.color})${playerPick}Houses.png`;

        return playerPick;
      })
    }

    // OPCJA Z ILOSCIA DOMKOW KUPIONYCH JEST ZABLOKOWANA
    return playerPick
  }
  buyingHouses(thisPlayer) {

    if (playerPick == 0) {
      thisPlayer.money -= Cities[thisPlayer.field].costOfTheField;
    } else {
      thisPlayer.money -= ((Cities[thisPlayer.field].costOfOneHouse * playerPick) - (Cities[thisPlayer.field].houses * Cities[thisPlayer.field].costOfOneHouse));
    }
    map.allLands[thisPlayer.field].firstElementChild.firstElementChild.src = `images/(${thisPlayer.color})${playerPick}Houses.png`;

    map.visualAmountOfMoney(thisPlayer);
    Cities[thisPlayer.field].houses = playerPick;
    Cities[thisPlayer.field].ownerOfField = thisPlayer;
    map.hidingDivs(containerOfBuyingHouses);

  }

}

function createPlayer(name, color) {
  let position = game.players.length + 1;
  const newPlayer = new Player(name, position, color);
  game.players.push(newPlayer);

}


const game = new Game();
game.initiatePlayers();
game.whoIsFirst()
map.sortAllLands();
map.draw();
for (let i = 0; i < 4; i++){
  console.log('GRACZ:',game.players[i]);
}
const animated = cube.getCubes()[0];




  animated.addEventListener('transitionend', function() {
    if(flag === true){    // cube.js  26 -linia  flaga zeby tylko raz wykonywala sie  funkcja od animacji
    if(doublet == true ){
      setTimeout(function(){
        map.showingDivs(containerOfDoublet);  
       setTimeout(function(){
          game.sequenceOfMove();
       },500) // set timeout of  start animation when  div hide away.
      },700);     // set timeout for 0.5 sec for user look on cubes  and know he have a doublet.  
    }
    else{
      game.sequenceOfMove();
    }
  }
  });





map.showingDivs(containerOfPlayerWhoHasMovement);



btn.addEventListener("click", () => {
  btn.disabled = true;
playerQueue++
cube.getNumberRandom();


// game.sequenceOfMove();
});
buyingButton.addEventListener('click', () => game.buyingHouses(game.players[playerQueue ]));

// RUCH GRACZA +++ (EW PROMISES)
// DIV Z INFORMACJA KTO WYKONUJE RUCH +++
// KOLEJNOSC GRACZY +++
// WIEZIENIE I KARTY I EVENT ---

// PLACENIE GRACZOM +++
// POSTAWIANIE DOMKOW +++
// MNOZNIKI PIENIAZKOW W ZALEZNOSCI OD ILOSCI DOMKOW +-+
// KICKOWANIE GRACZA JESLI NIE MA PIENIEDZY ---
// INTERFEJS GRACZY I KTO ILE MA PIENIEDZY +++
// UJEMNY BILANS PIENIEDZY ---
// LADNY WYGLAD +++ 
// NAZEWNICTWO(POPRAWNE) ZMIENNYCH/FUNKCJI +++
// POPRAWNOSC KODU +-+
// POPRAWIENIE PLANSZY  +++
// WIDOCZNOSC KTO MA POLE +++


// KOSZT - Interface
// DUBLET ---




