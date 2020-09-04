class Player {
    constructor(nameOfPlayer, position, color) {
        this.nameOfPlayer = nameOfPlayer;
        this.field = 0;
        this.amountOfMoves = 0;
        this.id = position;
        this.image = "images/player" + position + ".png";
        this.positionInQueue = position;
        this.cities = [];
        this.money = 3000;
        this.color = color;
        this.jail = false;
        this.img = document.createElement("img");
        this.img.width =60;
        this.img.height = 60;
        this.img.src = this.image;
        this.img.style.marginLeft = "auto";
        this.img.style.marginRight = "auto";
        this.img.style.zIndex = '1';
        this.img.style.position = "Relative";
        this.img.style.transform =  " rotate3d(0, 1, 0.5, 0.4rad)";
        // this.img.style.opacity = "0.7";
        this.counterOfStayingInJail = 0;
        this.tryingDoublet = false;
    }

    move() {
        let fieldBeforeAnimationOfMove = this.field;    
        const lastField = 31;
        const firstField = 0;
        let mathAlgorithm = lastField - fieldBeforeAnimationOfMove;        // There is my algorithm to calculate how much fields we need to the last field 
        btn.disabled = true;            
        let playerAnimationOfMove = setInterval(() => {
            if (this.field !== fieldBeforeAnimationOfMove + this.amountOfMoves) {       //  Moving player untill end of movement
                this.field++;
                if (this.field > lastField) {  // After last field (31) we go to the start (0)
                    this.field = firstField;
                }
                if (this.field == firstField) {
                    fieldBeforeAnimationOfMove = firstField;
                    this.amountOfMoves = this.amountOfMoves - mathAlgorithm - 1; 
                }
                map.allLands[this.field].children[0].appendChild(this.img);
            } else {    
                clearInterval(playerAnimationOfMove);
                this.endOfMoveAnimation();
            }
        }, 300);
    }

    endOfMoveAnimation() {
        game.gameMechanism(this);
    }

}