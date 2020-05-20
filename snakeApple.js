document.addEventListener('DOMContentLoaded', () => {

    const start = document.querySelector('#start');
    const score = document.querySelector('#result');
    const boxes = document.querySelectorAll('.grid div');
    const width = 10;

    let applePosition = 21;

    let currentSnake = [74,84,94];
    let currentTail = currentSnake[currentSnake.length -1];
    let currentHead = currentSnake[0]
    let direction = -width;
    let newHead = currentHead + direction;
    let points= 0;
    let speed = 5;
    let interval = 1000;
    let count = 0;    

    currentSnake.forEach(addBody) ; // no need of quotes to call the function
    function addBody(index){
       boxes[index].classList.add("snake");
   }            //could have simply used a for loop also, but forEach function takes index automatically

    function controls(keyIn){
      //  boxes[currentTail].classList.remove("snake");
      
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
       
        exchangeHT();   // keyIn.keyCode and not just keyIn
        console.log("Head"+newHead) ; 
        console.log("direction"+direction) ;   
          
    }
    
    function exchangeHT(){
        console.log(currentSnake)
        boxes[newHead].classList.add("snake");
        boxes[currentTail].classList.remove("snake");       // their order is important for a smooth effect
        console.log(newHead)
        currentSnake.unshift(newHead);
        currentHead = currentSnake[0];
        currentSnake.pop()
        currentTail = currentSnake[currentSnake.length - 1];
        newHead = newHead + direction;

        console.log("count "+count);
        
        console.log("interval "+interval); 
    }

    function myfun(){
    document.addEventListener('keydown',controls);
    }

    myfun();

    function moveSnake(){
        count = count + 1;
        if (count == 5){ 
            interval = interval/speed;
            count = 0;
        }
    }
    
    setInterval(exchangeHT, interval);
    
})
