class Player {
    constructor(nameOfPlayer, position) {
        this.nameOfPlayer = nameOfPlayer;
        this.field = 0;
        this.amountOfMoves = 0;
        this.image = "../images/player" + position + ".jpg";
        this.queue = position;
        this.cities = [];
        this.money = 3000;
        this.img = document.createElement("img");
        this.img.width = 50;
        this.img.height = 50;
        this.img.src = this.image;
    }

    move() {
        let before = this.field;
        let x = 31 - before;
        btn.disabled = true;
        let playerAnimationOfMove = setInterval(() => {
            if (this.field !== before + this.amountOfMoves) {
                this.field++;
                if (this.field > 31) {
                    this.field = 0;
                }
                if (this.field == 0) {
                    before = 0;
                    this.amountOfMoves = this.amountOfMoves - x - 1;
                }
                map.allLands[this.field].appendChild(this.img);
            } else {
                clearInterval(playerAnimationOfMove);
                game.EconomicSytem(this);
            }
        }, 300);
    }
    buyACity() {
        if (this.money - Cities[this.field].costOfTheField > -1) {
            this.money = this.money - Cities[this.field].costOfTheField;
            this.cities.push(Cities[this.field]);
            Cities[this.field].ownerOfField = this;
            console.log('[Kupiles Miasto]', Cities[this.field]);
            console.log('[Twoj stan pieniezny]' + this.nameOfPlayer + " " + this.money);
            map.hideChooseOption();
        } else {
            map.hideChooseOption();
            console.log('[You dont have enough money  !');
        }
    }
}

const listPlayers = [];

function createPlayer(name) {
    let position = listPlayers.length + 1;
    const newPlayer = new Player(name, position);
    listPlayers.push(newPlayer);
}

const playersName = ['Czikus', 'Michas', 'Mateusz', 'Wojtini']
for (let i = 0; i < playersName.length; i++) {
    createPlayer(playersName[i]);

}

function whoIsFirst() {

    function randomNum() {
        let number = Math.floor(Math.random() * (5 - 1) + 1);
        return number;
    }

    let randomNumber = [];

    for (let i = 0; i < listPlayers.length; i++) {
        let number = randomNum();
        let genNumber = randomNumber.indexOf(number);
        if (genNumber === -1) {
            randomNumber.push(number);
        } else {
            while (genNumber !== -1) {
                number = randomNum();
                genNumber = randomNumber.indexOf(number);
                if (genNumber === -1) {
                    randomNumber.push(number);

                }
            }
        }
    }

    function setPositonsOfPlayers() {
        for (let i = 0; i < listPlayers.length; i++) {
            listPlayers[i].queue = randomNumber[i];
        }
        listPlayers.sort(function (a, b) {
            return a.queue - b.queue
        })
    }
    setPositonsOfPlayers();
}

whoIsFirst()

const arrayOfDisabledBuyedFields = [0, 8, 12, 16, 20, 24, 28]