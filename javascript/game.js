let playerQueue = 0;
class Game {
  constructor() {
    this.players = [];
  }

  initiatePlayers() {
    const playersName = ["Wiercik", "Mateusz", "Michas", "Wojtini"]
    for (let i = 0; i < playersName.length; i++) {
      createPlayer(playersName[i]);
      map.enteringTheNamesOfThePlayers(game.players[i]);
    }
  }

  sequenceOfMove() {
    game.players[playerQueue].move();
  }

  gameMechanism(thisPlayer) {
    console.log('[this]', Cities[thisPlayer.field].ownerOfField);
    if (Cities[thisPlayer.field].ownerOfField == 0 && arrayOfDisabledBuyedFields.includes(thisPlayer.field) === false) { // jesli pole nie jest przejete przez nikogo 
      map.showChooseOption();
    } else if (Cities[thisPlayer.field].ownerOfField.nameOfPlayer == thisPlayer.nameOfPlayer) { // pole ktore juz jest gracza
      console.log('[to pole jest twoje]'); // tutaj musi byc funkcja na budowanie domkow pojawia sie div ile domkow chce zbudowac
      btn.disabled = false;
    } else if (Cities[thisPlayer.field].ownerOfField !== thisPlayer.nameOfPlayer && Cities[thisPlayer.field].ownerOfField !== 0) { // pole jest kogos innego
      console.log('[to pole jest kogos innego]') // tutaj musi byc funkcja ktora bedzie oddawala komus pieniadze za jego domek
      // 
      //Przelwam pieniadze(Cities[thisPlayer.pole].tribute) z thisPlayer(odejmuje od jego pieniedzy haracz)  do  Cities[thisPlayer.pole].player.money
      console.log('[Wykonuuje ruch]', thisPlayer);
      console.log('[Kogo to jest pole]', Cities[thisPlayer.field].ownerOfField);
      console.log('[HAJS PLACACEGO PRZED ZAPLATA]', thisPlayer.money + " GRACZ PLACACY " + thisPlayer.nameOfPlayer);
      thisPlayer.money -= Cities[thisPlayer.field].tribute;
      console.log('[PRZED ZAPLATA]', Cities[thisPlayer.field].ownerOfField.money + " HAJS GRACZA" + Cities[thisPlayer.field].ownerOfField.nameOfPlayer);
      Cities[thisPlayer.field].ownerOfField.money += Cities[thisPlayer.field].tribute;
      console.log('[PO ZAPLACIE]', Cities[thisPlayer.field].ownerOfField.money + "HAJS GRACZA" + Cities[thisPlayer.field].ownerOfField.nameOfPlayer);
      console.log('[HAJS PLACACEGO PO ZAPLACIE]', thisPlayer.money + " GRACZ PLACACY " + thisPlayer.nameOfPlayer);
      btn.disabled = false;
      map.visualAmountOfMoney(thisPlayer);
      map.visualAmountOfMoney(Cities[thisPlayer.field].ownerOfField);
    } else if (thisPlayer.field == jail) {
      console.log('[jestem w  wiezieniu]', );
      // Jail.style.display = "block";
      if (thisPlayer.field != true) {
        thisPlayer.field = true;
      }

    } else {
      console.log('[jestem w elsie]', );
      btn.disabled = false;

    }

    playerQueue++
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
map.showingTheDivOfWhoHasMovement();
// for(let i = 0 ; i < 10 ; i ++){
//   Cities[i].ownerOfField = listPlayers[0];
// }
btn.addEventListener("click", () => {


  cube.getNumberRandom();
  game.sequenceOfMove();



  // console.log('ReturnGameMechanism',game.gameMechanism);

  // let firstPromise = new Promise((resolve,reject) => {
  //   resolve('Succes')
  //   console.log('[siema]' );

  // });
  // firstPromise.then(() => {

  //   console.log("Yay!") 
  // });
});

console.log(game)
// RUCH GRACZA +++ (EW PROMISES)
// DIV Z INFORMACJA KTO WYKONUJE RUCH +-+
// KOLEJNOSC GRACZY +++
// WIEZIENIE I KARTY I EVENT ---
// DUBLET ---
// PLACENIE GRACZOM +++
// POSTAWIANIE DOMKOW ---
// MNOZNIKI PIENIAZKOW W ZALEZNOSCI OD ILOSCI DOMKOW ---
// KICKOWANIE GRACZA JESLI NIE MA PIENIEDZY ---
// INTERFEJS GRACZY I KTO ILE MA PIENIEDZY +++
// UJEMNY BILANS PIENIEDZY ---
// LADNY WYGLAD +++ 
// NAZEWNICTWO(POPRAWNE) ZMIENNYCH/FUNKCJI +++
// POPRAWNOSC KODU +-+
// POPRAWIENIE PLANSZY  +-+
// 