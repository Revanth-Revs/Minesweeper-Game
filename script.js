let row = 9;
let column = 9;
let score = 0;

let gameContainer = document.getElementById("gameContainer");
let number = 1;
for (let i = 0; i < row; i++) {
  let row = document.createElement("div");
  row.className = "row";

  for (let j = 0; j < column; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", number);
    cell.addEventListener("mouseup", mouseClick);
    number++;
    cell.className = "cell";
    row.appendChild(cell);
  }

  gameContainer.appendChild(row);
}
let bombArr = [];
for (let i = 0; i < 9; i++) {
  let randomNumber = Math.ceil(Math.random() * 81);
  bombArr.push(randomNumber);
}

bombArr.sort(function (a, b) {
  return a - b;
});
//removing dublicates
for (let i = 0; i < bombArr.length; i++) {
  for (let j = i + 1; j < bombArr.length; j++) {
    if (bombArr[i] === bombArr[j]) {
      bombArr[j] = bombArr[j] + 1;
    }
  }
}
console.log(bombArr);

let flag = 0;

window.addEventListener(
  //for removing default right click and
  //changing to custome one
  "contextmenu",
  function (e) {
    if (flag === 1) return;
    if (e.target.classList.contains("normalCell")) {
      e.preventDefault();
      return;
    } else if (e.target.innerHTML === String.fromCodePoint(0x2757)) {
      e.target.innerHTML = "";
    } else {
      e.target.innerHTML = String.fromCodePoint(0x2757); //for excalmation emoji
    }
    //playSound("flag");
    e.preventDefault();
  },
  false
);

function mouseClick(event) {
  if (event.button === 0) {
    handleClick(event);
  }
}

function handleClick(event) {
  if (flag === 1) return;

  let x = event.target.getAttribute("id");
  x = parseInt(x, 10);
  //console.log(x);
  for (let i = 0; i < bombArr.length; i++) {
    if (x === bombArr[i]) {
      event.target.classList.add("bombCell");
      flag = 1;
      //console.log("got It");
      playSound("wrong");
      popBombs();
      gameOver();
      return;
    }
  }
  updateScore(event);
  event.target.classList.add("normalCell");

  bombContainsNumber(x, event.target);
}

function updateScore(event) {
  let temp = event.target.classList.contains("normalCell");
  //console.log(temp);
  if (temp) {
    //to check clicked already or not
    return;
  }
  score++;
  document.getElementById("score").innerHTML = "Score: " + score;
  if (score >= 72) {
    document.getElementsByClassName("msg")[0].classList.remove("visibility");
    flag = 1;
  }
}

function popBombs() {
  for (let i = 0; i < bombArr.length; i++) {
    let temp = bombArr[i].toString();
    document.getElementById(temp).classList.add("bombCell");
    document.getElementById(temp).innerHTML = String.fromCodePoint(0x1f4a3); //for bomb emoji
  }
}
function gameOver() {
  document.getElementsByClassName("gameOver")[0].classList.remove("visibility");
}

function bombContainsNumber(x, el) {
  let countBombs = 0;
  let arr = [];

  if (x === 1) {
    arr.push(x + 1);
    arr.push(x + 9);
    arr.push(x + 10);
  } else if (x === 9) {
    arr.push(x - 1);
    arr.push(x + 8);
    arr.push(x + 9);
  } else if (x === 73) {
    arr.push(x - 9);
    arr.push(x - 8);
    arr.push(x + 1);
  } else if (x === 81) {
    arr.push(x - 1);
    arr.push(x - 10);
    arr.push(x - 9);
  } else if (x > 1 && x < 9) {
    arr.push(x - 1);
    arr.push(x + 1);
    arr.push(x + 8);
    arr.push(x + 9);
    arr.push(x + 10);
  } else if (x % 9 === 1) {
    arr.push(x - 9);
    arr.push(x - 8);
    arr.push(x + 1);
    arr.push(x + 9);
    arr.push(x + 10);
  } else if (x % 9 === 0) {
    arr.push(x - 10);
    arr.push(x - 9);
    arr.push(x - 1);
    arr.push(x + 8);
    arr.push(x + 9);
  } else if (x > 73 && x < 81) {
    arr.push(x - 10);
    arr.push(x - 9);
    arr.push(x - 8);
    arr.push(x - 1);
    arr.push(x + 1);
  } else {
    arr.push(x - 10);
    arr.push(x - 9);
    arr.push(x - 8);
    arr.push(x - 1);
    arr.push(x + 1);
    arr.push(x + 8);
    arr.push(x + 9);
    arr.push(x + 10);
  }
  for (let i = 0; i < bombArr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (bombArr[i] === arr[j]) {
        countBombs++;
      }
    }
  }
  el.innerHTML = countBombs;
}
function playSound(type) {
  let audio = new Audio(`${type}.mp3`);
  audio.play();
}
