
let playerQueue = 0;
let playerPick;
let doublet = true;
let flag = true;
let NumberOfShowingPlayerQueue ;
let fieldsWhenKickingPlayer ;
let number;

class Game {
  constructor() {
    this.players = [];
  }

  initiatePlayers() {
    const playersName = ["Wiercik", "Mateusz", "Michas", "Wojtini"];
    const playersColors = ["Red", "Blue", "Green", "Yellow"];
    for (let i = 0; i < 2; i++) {
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
        textShowingWhenPlayerDontHaveMoney.style = 'display:none ';//  Setting starting value(text if dont have money) after  the end of buying
        map.showingDivs(containerOfBuyingHouses);
        this.listenerHowMuchHouses(thisPlayer);
        break;
      case playerField: // my field
        map.showingDivs(containerOfBuyingHouses);
        for (let i = 0; i <= Cities[thisPlayer.field].houses ; i++) { // Functions which disabled buying houses that we have
          checkboxesCounterOfHouses[i].checked = true;
        }
        for (let i = Cities[thisPlayer.field].houses; i <= checkboxesCounterOfHouses-1  ; i++) { // Functions which give us chance to buy  a house
          checkboxesCounterOfHouses[i].checked = false;
        }
        if(Cities[thisPlayer.field].houses < 4){
          checkboxesCounterOfHouses[5].disabled = true;
        } else {
          checkboxesCounterOfHouses[5].disabled = false;
        }
        this.listenerHowMuchHouses(thisPlayer);
        break;
      case otherPlayerField: 
        const multiplierMoney = game.gettingMultiplierMoney(Cities[thisPlayer.field].houses);
        Cities[thisPlayer.field].multiplierDependFromHouses =  multiplierMoney;
        if(thisPlayer.money < Cities[thisPlayer.field].tribute  *Cities[thisPlayer.field].eventMultiplier * multiplierMoney  ){
          console.log('[Masz za malo pieniedzy zeby zaplacic]' );
          this.showingWhichBuildingsPlayerCanSell(thisPlayer);
          map.showingDivs(containerIfDontHaveMoney);
          neededGoldInSellingBuildings.textContent = "Potrzebny gold: " + Cities[thisPlayer.field].tribute * multiplierMoney *Cities[thisPlayer.field].eventMultiplier;
          actualGoldInSellingBuildings.textContent = "Aktualny gold: " + thisPlayer.money;
          fieldsWhenKickingPlayer = [...document.querySelectorAll('.checkbox-in-selling-field')];
          // const amountOfMoney;
          number = thisPlayer.money ;
          console.log(number);
          for(let i = 0; i < fieldsWhenKickingPlayer.length; i++){
            fieldsWhenKickingPlayer[i].addEventListener('click',function(e){
              console.log(e.target.checked);
              if(e.target.checked == true){
                number = number + Number(e.target.nextElementSibling.textContent);
                actualGoldInSellingBuildings.textContent = `Aktualny gold: ${number}`;
                console.log(Number(e.target.nextElementSibling.textContent))
                
              }else{
                if(number < 0) {
                  number = 0;
                }
                number = number - Number(e.target.nextElementSibling.textContent);
                actualGoldInSellingBuildings.textContent = `Aktualny gold: ${number}`;
                console.log(Number(e.target.nextElementSibling.textContent))
              }
            })
          }

        } else{
          thisPlayer.money -= Cities[thisPlayer.field].tribute * multiplierMoney *Cities[thisPlayer.field].eventMultiplier;
          Cities[thisPlayer.field].ownerOfField.money += Cities[thisPlayer.field].tribute * multiplierMoney *Cities[thisPlayer.field].eventMultiplier;
          map.visualAmountOfMoney(thisPlayer);
          map.visualAmountOfMoney(Cities[thisPlayer.field].ownerOfField);
          map.showingDivs(containerOfPlayerWhoHasMovement); 
        }  
      break;
    case thisPlayer.field == jail:
      textShowingWhenPlayerDontHaveMoneyJail.style.display = "none";
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
      if(thisPlayer.field == 24){
        console.log("teleport od maga")
        map.creatingInputsForPlayerTeleportingAndTeleportingPlayer(thisPlayer) ;
      }
      else if(thisPlayer.field == 16){
        console.log("Event");
        map.creatingInputForEventMultiplier(thisPlayer);
      }
      else if (thisPlayer.field == 12 || 20 || 28) {
        map.showingDivs(containerOfCards);
        console.log("karty specyjalne")
        // let randomNumber = Math.floor(Math.random() * (10 - 1) + 1); 
        let randomNumber = 2;
        const text = document.createElement("p");
        const secondText = document.createElement("p");
        const thirdText = document.createElement("p");
        const input = document.createElement("input");
        const fourthText = document.createElement("p");
        const fifthText = document.createElement("p");

        const div = document.createElement("div");
        const firstButton = document.createElement('button');
        const secondButton = document.createElement("button");
        //PREPAIRING FOR APPENDING +  Doing card description
        switch(randomNumber){
          case 1:
            let randomPlayer = Math.floor(Math.random() * (game.players.length - 0) + 0); 
            while( thisPlayer.nameOfPlayer == game.players[randomPlayer].nameOfPlayer){
              randomPlayer = Math.floor(Math.random() * (game.players.length - 0) + 0); 
            }
            text.textContent = `Płacisz graczowi ${game.players[randomPlayer].nameOfPlayer} 300 golda a jeśli masz mniej niż 300 golda  to gracz ${game.players[randomPlayer].nameOfPlayer} placi tobie 300 golda.Jesli zaden z graczy nie ma pieniedzy to zeruje sie konto jednego z graczy` ;
            console.log(game.players[randomPlayer]);
            containerOfCards.children[0].onclick = function(){
              if(thisPlayer.money >= 300){
                thisPlayer.money -= 300;
                game.players[randomPlayer].money += 300;
                map.visualAmountOfMoney(thisPlayer);
                map.visualAmountOfMoney(game.players[randomPlayer]);
              } 
              else{
                if(game.players[randomPlayer].money > 300){
                  thisPlayer.money += 300;
                  game.players[randomPlayer].money -= 300;
                  map.visualAmountOfMoney(thisPlayer);
                  map.visualAmountOfMoney(game.players[randomPlayer]);
                }else{
                  thisPlayer.money += 300;
                  game.players[randomPlayer].money = 0;
                  map.visualAmountOfMoney(thisPlayer);
                  map.visualAmountOfMoney(game.players[randomPlayer]);
                }
              }
            }
          break;
          case 2:
            text.textContent = "Na jedno z twoich miast spadła bomba many i zniszczyła twoje domki.Jesli nie posiadasz domkow ta karta nie zadziala" ;
            const arrayWithPlayerFieldWithHouses = [];
            containerOfCards.children[0].onclick = function(){
              if(thisPlayer.cities.length >0 ){
                for(let i = 0 ; i < Cities.length; i ++){
                  if(Cities[i].ownerOfField === thisPlayer && Cities[i].houses > 0){
                    arrayWithPlayerFieldWithHouses.push(Cities[i]);
                  }
                }
              const randomField = Math.floor(Math.random() * (arrayWithPlayerFieldWithHouses.length - 0) + 0);   
              const choosedFieldToDelete = arrayWithPlayerFieldWithHouses[randomField];
              console.log(choosedFieldToDelete)
              Cities[choosedFieldToDelete.field].houses = 0;
              map.allLands[choosedFieldToDelete.field].children[1].firstElementChild.firstElementChild.src = "data:,";
              map.allLands[choosedFieldToDelete.field].children[1].firstElementChild.firstElementChild.style.display = "none";
              }else{
                console.log("Ten gracz nie posiada miast")
              }
            }
          break;  
          case 3:
            text.textContent = "Udajesz się na pole start";
            console.log(randomNumber + " Zestaw");
          break;  
          case 4:
            text.textContent = "Trafiasz do więzienia za swoje złe czynny";
            console.log(randomNumber + " Zestaw");
          break;  
          case 5:
            text.textContent = "Obrabowaly cię pobliskie gobliny tracisz 200 golda";
            console.log(randomNumber + " Zestaw");
          break;  
          case 6:
            text.textContent = "Grasz w rolla z kolega z gildii o 400 golda ";
            secondText.textContent = `Roll przeciwnika :`;
            thirdText.textContent = "Wpisz /roll";
            fourthText.textContent = "Twoj roll :"
            fifthText.textContent = "Wygrał: "
            input.style.width = '60px';
            input.style.height = '20px';

          break;
          case 7:
            text.textContent = `Kolega x podał ci dane do konta możesz usunąć jego domki i hotele na jednym polu  albo pominąć ta karte`;

          break;  
          case 8:
            text.textContent = "Postanawiasz ze odpoczniesz w mieście (tracisz kolejkę w następnej turze)";
            console.log(randomNumber + " Zestaw");
          break;  
          case 9:
            text.textContent = "Miałeś potężne szczęście i tytani pozwalają ci wykonać jeszcze jeden ruch. ";
            console.log(randomNumber + " Zestaw");
          break;      
        }
        // APPENDING TO CONTAINER
        containerOfCards.appendChild(text) ; // first text is on all switch options
        switch(randomNumber){ // there is switch statement with appending childs
          case 6:
           containerOfCards.appendChild(secondText);
           containerOfCards.appendChild(thirdText);
           containerOfCards.appendChild(input);
           containerOfCards.appendChild(fourthText);
           containerOfCards.appendChild(fifthText);
          break;
          case 7:
            containerOfCards.appendChild(div);
            div.appendChild(firstButton);
            div.appendChild(secondButton);
          break;       
        }
      }
      break;
    default:
    }
    if(thisPlayer.field !=24){ //  when player is on field teleport button must be blocked
      btn.disabled = false;
    }
    
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

  gettingMultiplierMoney(amountOfHouses){
    let multiplierMoney;
    switch (amountOfHouses) { // tribute * multiplierMoney 
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
    return multiplierMoney;
  }
  
  listenerHowMuchHouses(thisPlayer) {
    map.enteringThePriceOfBuildings(thisPlayer);
    playerPick = 0;
    let amountOfHouses ;
    amountOfHouses = 0;
    buyingHouseImage.style.display = "none"; // hiding if player wont click
    amountOfHouses = Cities[thisPlayer.field].houses + 1;
    for (let i = amountOfHouses; i < checkboxesCounterOfHouses.length; i++) {
      checkboxesCounterOfHouses[i].addEventListener('click', function () {
        buyingHouseImage.style.display = "initial";  
        for (let i = amountOfHouses; i < checkboxesCounterOfHouses.length; i++) { // reseting function to only be clicked one button
          checkboxesCounterOfHouses[i].checked = false;
        }
        playerPick = checkboxesCounterOfHouses[i];
        console.log(playerPick);
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
          thisPlayer.money -= ((Cities[thisPlayer.field].costOfTheField) + (Cities[thisPlayer.field].costOfOneHouse * playerPick));
        } else if (Cities[thisPlayer.field].houses > -1) {
          thisPlayer.money -= ((Cities[thisPlayer.field].costOfOneHouse * playerPick) - (Cities[thisPlayer.field].houses * Cities[thisPlayer.field].costOfOneHouse));
         }
         if(playerPick === 0){
          map.allLands[thisPlayer.field].style.border = `2px solid ${thisPlayer.color}`
         } else {
          map.allLands[thisPlayer.field].children[1].firstElementChild.firstElementChild.src = `images/${thisPlayer.color}${playerPick}Houses.png`;
          map.allLands[thisPlayer.field].children[1].firstElementChild.firstElementChild.style.display = "initial";
          map.allLands[thisPlayer.field].style.border = `2px solid ${thisPlayer.color}`
         }
        const multiplierMoney = game.gettingMultiplierMoney(playerPick);
        map.visualAmountOfMoney(thisPlayer);
        Cities[thisPlayer.field].houses = playerPick;
        Cities[thisPlayer.field].ownerOfField = thisPlayer;
        console.log(multiplierMoney);
        Cities[thisPlayer.field].multiplierDependFromHouses = multiplierMoney;
        thisPlayer.cities.push( Cities[thisPlayer.field].fieldName);
        console.log(thisPlayer.cities);
        map.hidingDivs(containerOfBuyingHouses);
        btn.disabled = false;
        map.showTheActualTributeOfField(thisPlayer);
        map.showingDivs(containerOfPlayerWhoHasMovement);
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

  showingWhichBuildingsPlayerCanSell(thisPlayer){ 
    for(let i = 0 ; i < Cities.length; i ++){
      if(Cities[i].ownerOfField === thisPlayer){
        let money = (Cities[i].costOfOneHouse * Cities[i].houses + Cities[i].costOfTheField)/2;
        map.allLands[i].style.border = 'solid blue 3px';
        map.creatingDivForSellingField(money,i);
      }
    }
  }

    kickPlayer(){
      this.deletingEverythingThatPlayerHad();
      this.players.splice(playerQueue,1);
      map.hidingDivs(containerIfDontHaveMoney);
      playerQueue--;
      if(playerQueue == -1){
        playerQueue = 0;
      }
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
   }

   sellingBuilding(thisPlayer){
     const multiplierMoney = Cities[thisPlayer.field].multiplierDependFromHouses;
     console.log(multiplierMoney);
     if(number >= Cities[thisPlayer.field].tribute * multiplierMoney * Cities[thisPlayer.field].eventMultiplier ){
      let numberOfField ;
      console.log(numberOfField);
      for(let i = 0; i < fieldsWhenKickingPlayer.length; i++){
        numberOfField = fieldsWhenKickingPlayer[i].offsetParent.offsetParent.classList[0];  
        if(fieldsWhenKickingPlayer[i].checked === true){
          for(let i = 0;  i < thisPlayer.cities.length; i++){
            console.log(numberOfField);
            if(thisPlayer.cities[i] == Cities[numberOfField].fieldName){
              thisPlayer.cities.splice(thisPlayer.cities[i],1);
            } 
          }
          Cities[numberOfField].ownerOfField = undefined;   //reseting to default settings
          Cities[numberOfField].houses = -1;
          map.allLands[numberOfField].children[1].firstElementChild.firstElementChild.src = "data:,";
          map.allLands[numberOfField].children[1].firstElementChild.firstElementChild.style.display = "none";
          map.allLands[numberOfField].style.border = "2px solid black";
          map.allLands[numberOfField].lastElementChild.remove();
        }
        else{
          numberOfField = fieldsWhenKickingPlayer[i].offsetParent.offsetParent.classList[0]
          map.allLands[numberOfField].lastElementChild.remove();
        }
      }
      thisPlayer.money = number
      console.log(multiplierMoney);
      thisPlayer.money -= Cities[thisPlayer.field].tribute * multiplierMoney * Cities[thisPlayer.field].eventMultiplier;
      Cities[thisPlayer.field].ownerOfField.money += Cities[thisPlayer.field].tribute * multiplierMoney * Cities[thisPlayer.field].eventMultiplier;
      map.visualAmountOfMoney(thisPlayer);
      map.visualAmountOfMoney(Cities[thisPlayer.field].ownerOfField);
      map.hidingDivs(containerIfDontHaveMoney);
      map.showingDivs(containerOfPlayerWhoHasMovement);  
    } else{
      throw 'too low amount of money !';
    }
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
btn.addEventListener("click", () => {
  btn.disabled = true;
  if (doublet == false && game.players[playerQueue].tryingDoublet == false) {
    playerQueue++;    
    if (playerQueue > game.players.length - 1) {
      playerQueue = 0;
    }  
  }
  cube.getNumberRandom(7, 1); //6 -max  1 -min
});
buyingButton.addEventListener('click', () => game.buyingHouses(game.players[playerQueue]));
containerOfCards.children[0].addEventListener("click",function(){ 
  map.hidingDivs(containerOfCards) ;map.deletingChildsFromElement(containerOfCards) ; 
})
sellingBuildingsBtn.addEventListener('click', () => {
    game.sellingBuilding(game.players[playerQueue]);
});
surrenderString.addEventListener('click',() => {
  Cities[game.players[playerQueue].field].ownerOfField.money +=  Cities[game.players[playerQueue].field].tribute * Cities[game.players[playerQueue].field].multiplierDependFromHouses *Cities[game.players[playerQueue].field].eventMultiplier;
  map.visualAmountOfMoney(Cities[game.players[playerQueue].field].ownerOfField);
  for(let i = 0; i <  fieldsWhenKickingPlayer.length; i++){
    numberOfField = fieldsWhenKickingPlayer[i].offsetParent.offsetParent.classList[0];
    Cities[numberOfField].ownerOfField = undefined;
    Cities[numberOfField].houses = -1;
    map.allLands[numberOfField].children[1].firstElementChild.firstElementChild.src = "data:,";
    map.allLands[numberOfField].children[1].firstElementChild.firstElementChild.style.display = "none";
    map.allLands[numberOfField].style.border = "2px solid black";
    map.allLands[numberOfField].lastElementChild.remove(); // clean 
  }
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
    textShowingWhenPlayerDontHaveMoneyJail.style.display = "block";
    console.log('Nie masz tyle pieniedzy');
  }
  
});


const game = new Game();
game.initiatePlayers();
game.whoIsFirst();
map.sortElements(map.allLands);
map.appendPlayersOnMap();
// map.showingDivs(containerOfPlayerWhoHasMovement);
map.sortElements(arrayOfTributeFields);
for (let i = 0; i < game.players.length; i++) {
  console.log('GRACZ:', game.players[i]);
  map.visualAmountOfMoney(game.players[i]);
}
// for(let i = 1; i < 8; i++){
//   Cities[i].ownerOfField = game.players[0];
//   Cities[i].houses = 0;
//   game.players[0].cities.push(Cities[i].fieldName );
//   map.allLands[i].children[1].firstElementChild.firstElementChild.style.display = "initial";
//   map.allLands[i].children[1].firstElementChild.firstElementChild.src = `images/Red1Houses.png`;
// }
// for(let i = 9; i < 12; i++){
//   Cities[i].ownerOfField = game.players[0];
//   Cities[i].houses = 3;
//   game.players[0].cities.push(Cities[i].fieldName );
//   map.allLands[i].children[1].firstElementChild.firstElementChild.style.display = "initial";
//   map.allLands[i].children[1].firstElementChild.firstElementChild.src = `images/Blue3Houses.png`;
// }
// RUCH GRACZA +++ 
// DIV Z INFORMACJA KTO WYKONUJE RUCH +++ 
// KOLEJNOSC GRACZY +++ 
// WIEZIENIE I KARTY I EVENT +++-
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

//Wyswietla z dymkami do wyboru
//Klikniete pola zostaja sprzedane
//