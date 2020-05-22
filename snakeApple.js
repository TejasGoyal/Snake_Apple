document.addEventListener('DOMContentLoaded', () => {
    const startB = document.getElementById('start');
    const score = document.getElementById('result');
    const boxes = document.querySelectorAll('.grid div');
    const width = 10;

    let applePosition = 21;
    let currentSnake = [64,74,84];
    let currentTail = currentSnake[currentSnake.length -1];
    let currentHead = currentSnake[0]
    let direction = -width;
    let newHead = currentHead + direction;
    let points= 0;
    let interval = 1000;
    
    startB.addEventListener("click",newGame);
    function newGame()
    {
        location.reload();
    }

    boxes[applePosition].classList.add("apple");
    currentSnake.forEach(addBody) ; 
    function addBody(index){
       boxes[index].classList.add("snake");
   }            
    function controls(keyIn){
     
        if (keyIn.keyCode == 37 || keyIn.keyCode == 65){
            newHead = currentHead - 1;
            direction = -1;
        } else if (keyIn.keyCode == 39 || keyIn.keyCode == 68){
            newHead = currentHead + 1 ;
            direction = +1;
        } else if (keyIn.keyCode == 38 || keyIn.keyCode == 87)  {
            newHead = currentHead - width ;
            direction = -width;
        } else if (keyIn.keyCode ==40 || keyIn.keyCode == 83){
            newHead = currentHead + width ;
            direction = +width;
        }   
        snakeEatSnake();   
        exchangeHT();  
          
    }

    
    function exchangeHT(){
       
        boxes[newHead].classList.add("snake");
        boxes[currentTail].classList.remove("snake");       
        console.log(newHead)
        console.log(currentHead)
        currentSnake.unshift(newHead);
        currentHead = currentSnake[0];
        currentSnake.pop()
        currentTail = currentSnake[currentSnake.length - 1];
        newHead = newHead + direction;

        
       updateSnake();
    }

    function updateSnake(){
        if (currentHead == applePosition){
        
            points = points + 1;
            score.innerHTML = points;

            boxes[applePosition].classList.remove("apple");

            do{
                applePosition = Math.floor(Math.random()*boxes.length);
            }while(boxes[applePosition].classList.contains("snake"));
                
            boxes[applePosition].classList.add("apple");

            console.log("Tail",currentTail);
            console.log("dir",direction);

            currentSnake.push(currentTail-direction);

        }
    }

    function snakeEatSnake(){
        console.log("new",newHead);
        console.log("current",currentHead);
        if (boxes[newHead].classList.contains("snake")){
            alert("Game Over\nFinal Score: " + points);
            newGame();
        }
    }           

    function setNew()
    {   
        boxes[applePosition].classList.remove("apple");
        boxes.forEach(index => boxes[index].classList.remove("snake"));
        currentSnake = [74,84,94];
        applePosition = Math.floor(Math.random()*99);
        currentSnake.forEach(index => boxes[index].classList.add("snake"));
        boxes[applePosition].classList.add("apple")
        
    }
    document.addEventListener('keydown',controls);
    
    setInterval(exchangeHT, interval);    
})
