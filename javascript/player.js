class Player {
    constructor(nameOfPlayer, position,color) {
        this.nameOfPlayer = nameOfPlayer;
        this.field = 0;
        this.amountOfMoves = 0;
        this.id = position;
        this.image = "images/player" + position + ".png";
        this.queue = position;
        this.cities = [];
        this.money = 3000;
        this.color = color;
        this.jail = false;
        this.img = document.createElement("img");
        this.img.width = 60;
        this.img.height = 60;
        this.img.src = this.image;
        this.img.style.zIndex ='1';
        this.img.style.position = "Relative";
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
                if (this.field == jail) {
                    this.jail = true;
                }


                this.endOfMoveAnimation();

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
            map.hidingDivs(chooseBox);
        } else {
            map.hidingDivs(chooseBox);
            console.log('[You dont have enough money  !');
        }
    }

    endOfMoveAnimation() {

        game.gameMechanism(this);
    }

}