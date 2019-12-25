const chooseBox = document.querySelector('.container-choose-element');
const chooseBoxYesBtn = document.querySelector('.Yes-button');
const chooseBoxNoBtn = document.querySelector('.No-button');
const ifBuyedField = document.querySelector('.containerIfFieldIsBuyed');
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
    for (let i = 0; i < listPlayers.length; i++) {

      this.allLands[listPlayers[i].field].appendChild(listPlayers[i].img);
    }

  }

  hideChooseOption() {
    chooseBox.style.display = "none";
    btn.disabled = false;
  }
  showChooseOption() {
    chooseBox.style.display = "block";
  }

}
const map = new Map();
map.sortAllLands();
map.draw();

chooseBoxNoBtn.addEventListener("click", () => {
  map.hideChooseOption();
});
chooseBoxYesBtn.addEventListener("click", function () {

  listPlayers[playerQueue - 1].buyACity(); // Tutaj musze zmienic zeby nie odejmowac od playerQueque -1 bo to jest blad



});