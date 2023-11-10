//variables

let inputDirection = {x:0,y:0};
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
const gameoverSound = new Audio('gameover.mp3');
const musicSound = new Audio('music.mp3');
let lastPaintTime =  0;
let speed = 5; 
let score=0;
 let hiscoreval=0; 
 let hiscoreBox = document.getElementById('hiscoreBox');
let snakeArr = [{x:13,y:15}];
let food = {x:4,y:7};

 
//functions

function main(currentTime) {
    window.requestAnimationFrame(main); 
   if((currentTime-lastPaintTime)/1000 < 1/speed){
       return;
   }
   lastPaintTime = currentTime;
   gameEngine();
   musicSound.play();
}

function gameEngine() {
    //collision occurs then  what
    console.log(speed);
if(isCollide(snakeArr))
{
    gameoverSound.play();
    musicSound.pause();
    inputDirection = {x:0,y:0};
    alert("game over, press any key to play again");
    snakeArr = [{x:13,y:15}];
    musicSound.currentTime = 0;
    musicSound.play(); 
    food = {x:4,y:7};
    score=0;
    scoreBox.innerHTML = "Score: " + score;
    speed = 5;
}

//how to move the snake

for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDirection.x;
snakeArr[0].y += inputDirection.y;

//if food is eaten increase length of snake and randomly generate food

if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
    foodSound.play();
    speed = speed + 1;
    console.log(speed);
    score++;
    console.log(score);
    scoreBox.innerHTML = "Score: " + score;
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    snakeArr.unshift({x:snakeArr[0].x + inputDirection.x , y:snakeArr[0].y + inputDirection.y});
    let a=2;
    let b=16;
    food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
}

    //create snake

    board.innerHTML = "";
      snakeArr.forEach((e,index)=>{
             let snakeElement = document.createElement('div');
             snakeElement.style.gridRowStart = e.y;
             snakeElement.style.gridColumnStart = e.x;
             if(index === 0){
             snakeElement.classList.add('head');
             }
             else{
                snakeElement.classList.add('snake');
             }
             board.appendChild(snakeElement);
      })

      //create food
      
     let foodElement = document.createElement('div');
      foodElement.style.gridRowStart = food.y;
      foodElement.style.gridColumnStart = food.x;
      foodElement.classList.add('food');
      board.appendChild(foodElement);
      
}


function isCollide(snakeArr) {
    //collide yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
     return true;
    }
        
    return false;
}


//main (logic)

window.requestAnimationFrame(main);
 let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}
window.addEventListener('keydown', e =>{
    inputDirection = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }

})