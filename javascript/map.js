const chooseBox = document.querySelector('.container-choose-element');
const chooseBoxYesBtn = document.querySelector('.Yes-button');
const chooseBoxNoBtn = document.querySelector('.No-button');
const ifBuyedField = document.querySelector('.containerIfFieldIsBuyed');
const Jail = document.querySelector('.jail');
const buyingHouseImage = document.getElementById('house');
const imageOfPlayerWhoHasMovement = document.querySelector('.image-of-player-who-has-movement');
const nameOfPlayerWhoHasMovement = document.querySelector('.container-of-player-queue-center p');
const containerOfPlayerWhoHasMovement = document.querySelector('.container-of-player-queue');
const buyingButton =  document.querySelector('.buying-button');
const containerOfBuyingHouses = document.querySelector('.box-of-buying-houses');
const containerOfDoublet = document.querySelector('.container-of-doublet')
const checkboxes = [...document.querySelectorAll('.checkboxes')];
const eventsBox= document.querySelector('.container-of-events');
const box = document.querySelector('.container-of-events--center');
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
    for (let i = 0; i < game.players.length; i++) {

      this.allLands[game.players[i].field].appendChild(game.players[i].img);
    }

  }


  hidingDivs(Div){
    eventsBox.style.display = "none";
    Div.style.display = "none";



  }
  showingDivs(Div){
   


  Div.style.display = "grid";
  switch(Div){
    
    case containerOfBuyingHouses:
      eventsBox.style.display = "grid";
      
      break;
      case containerOfDoublet:     //-----> Doublet

      setTimeout(function () { // Poczatek animacji
  
        eventsBox.style.opacity = 1;
        eventsBox.style.display = "grid";
  
        setTimeout(function () {    // 2sekundy animacji
  
          eventsBox.style.opacity = 0;
          
    
          setTimeout(function(){    // Koniec animacji 
            eventsBox.style.opacity = 1;
           
            eventsBox.style.display = "none";
            Div.style.display = "none";
          },500)
        }, 1000);
        
      }, 0)
      break;
      case containerOfPlayerWhoHasMovement:     //-----> Ruch gracza
        let positionOfPlayers = playerQueue; 
        if (playerQueue == 4) {
          positionOfPlayers = 0;
          
        }
        setTimeout(function () { // Poczatek animacji
          
          nameOfPlayerWhoHasMovement.textContent = game.players[positionOfPlayers].nameOfPlayer;
          imageOfPlayerWhoHasMovement.src = game.players[positionOfPlayers].image;
          eventsBox.style.opacity = 1;
          eventsBox.style.display = "grid";
    
          setTimeout(function () {    // 2sekundy animacji
    
            eventsBox.style.opacity = 0;
            
      
            setTimeout(function(){    // Koniec animacji 
              eventsBox.style.opacity = 1;
             
              eventsBox.style.display = "none";
              Div.style.display = "none";
            },500)
          }, 2000);
          
        }, 0)
        break;
        default:
          

  }
  
   
    
    
    
  }
  enteringTheNamesOfThePlayers(thisPlayer) {
    
    arraysOfPlayersName[thisPlayer.id - 1].textContent = thisPlayer.nameOfPlayer;   
  }
  visualAmountOfMoney(thisPlayer) {

    arrayOfPlayersMoney[thisPlayer.id - 1].textContent = "Money: " + thisPlayer.money;    // od 0 sie zacyznaja id a tablica od 1  dlatego --
     
  }


}
const map = new Map();



const jail = 8;
const arrayOfDisabledBuyedFields = [0, 8, 12, 16, 20, 24, 28];
