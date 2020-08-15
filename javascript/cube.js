class Cube {
  constructor() {
    this.lastThrows = []; //We need this variable to repeat the animation if throw = lastThrow
    this.cubes = this.getCubes();
  }

  getNumberRandom(max, min) {
    // let firstThrown = Math.floor(Math.random() * (max - min) + min); 
    // let secondThrown = Math.floor(Math.random() * (max - min) + min);
    let firstThrown = 5;
    let secondThrown = 3;
    if (firstThrown == secondThrown) {
      doublet = true;
    } else {
      doublet = false;
    }
    if (this.lastThrows[0] !== firstThrown) {
      this.animationOfCube(firstThrown, this.cubes[0]); 
    } else {
      flag = false; // Reseting Animation if thrown = last thrown.
      this.animationOfCube(10, this.cubes[0]);
      setTimeout(() => {
        flag = true; // Correct Animation after the reseting animation.
        this.animationOfCube(firstThrown, this.cubes[0]);
      }, 1005);
    }
    if (this.lastThrows[1] !== secondThrown) {
      this.animationOfCube(secondThrown, this.cubes[1]);
    } else {
      this.animationOfCube(10, this.cubes[1]);
      setTimeout(() => {
        this.animationOfCube(secondThrown, this.cubes[1]);
      }, 1005);
    }
    this.lastThrows.push(firstThrown);
    this.lastThrows.push(secondThrown);
    if (this.lastThrows.length > 2) {  // Not more than 2 throws in array
      this.lastThrows.splice(0, 2);
    }
    if (playerQueue > game.players.length - 1) {
      playerQueue = 0;
    }  
  }

  animationOfCube(number, cube) {
    switch (number) {
      case 1:
        cube.style.webkitTransform = "rotateX(640deg) rotateY(1400deg)";
        break;
      case 2:
        cube.style.webkitTransform = "rotateX(380deg) rotateY(460deg)";
        break;
      case 3:
        cube.style.webkitTransform = "rotateX(570deg) rotateY(440deg)";
        break;
      case 4:
        cube.style.webkitTransform = "rotateX(-1250deg) rotateY(1250deg)";
        break;
      case 5:
        cube.style.webkitTransform = "rotateX(-1250deg) rotateY(1800deg)";
        break;
      case 6:
        cube.style.webkitTransform = "rotateX(-600deg) rotateY(3500deg)";
        break;
      default:
        cube.style.webkitTransform = "rotateX(-250deg) rotateY(1500deg)";
    }
  }

  getCubes() {
    return [
      document.querySelector(".firstCube"),
      document.querySelector(".secondCube")
    ];
  }
}

const cube = new Cube();
const btn = document.querySelector("button");