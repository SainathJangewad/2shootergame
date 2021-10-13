const start=document.querySelector('.start');
const shoot1=document.querySelector('.shoot1');
const shoot2=document.querySelector('.shoot2');
const health1=document.querySelector('.health1');
const health2=document.querySelector('.health2');
const gameContainer = document.querySelector('.game-container');
const round=document.querySelector('.round');
const time=document.querySelector('.time');
const min=document.querySelector('.m');
const sec=document.querySelector('.s');
const roundNum=document.querySelector('.roundnum');
const player2Cont=document.querySelector('.player2-container');

let minute = 5;
let second = 59;
let round1 = 0 ;
let id;
const Players = function (health){
    this.health=health;
    this.numOfRoundsWon=0;    
}

Players.prototype.reduceHealth=function(){
    let randnum=Math.floor(Math.random()*5)+1;
    this.health=this.health-randnum;
}

const player1= new Players(100);
const player2= new Players(100);

function resetGame(div){
    player1.health=100;
    player2.health=100;
    health1.innerText=`Health = ${player2.health}`;
    health2.innerText=`Health = ${player2.health}`;
    div.innerText='';
    minute = 0;
    second = 0;
    round1 = 0 ;    
}

 start.addEventListener('click',()=>{
     start.style.opacity = 0;
     gameContainer.classList.add('show');
     round.classList.add('show');
     time.classList.add('show');
     id = setInterval( ()=>{
         reduceTime(id)
        },1000);
    })
    
    function nextRound(player){
        let div=document.createElement('div');
        let p=document.createElement('p');
        let p1=document.createElement('p');
        let p2=document.createElement('p');
        if(player===player2){
            p.innerText=`player1 - won: ${player1.numOfRoundsWon} `;
            p1.innerText=`player2 - won: ${player2.numOfRoundsWon} `;
    }else{
        p.innerText=`player1 - won: ${player1.numOfRoundsWon} `;
        p1.innerText=`player2 - won: ${player2.numOfRoundsWon} `;   
        
    }
    if(player1.numOfRoundsWon == 3){
        player1.numOfRoundsWon=0;
        p2.innerText=`player1 won the match`;   
        player2.numOfRoundsWon=0;
         
    }else if(player2.numOfRoundsWon == 3){
        player2.numOfRoundsWon=0;
        player1.numOfRoundsWon=0;
        p2.innerText=`player2 won the match`;   

    }
    let button = document.createElement('button');
    button.innerText='Start Game';
    button.classList.add('btn');
    p.appendChild(button);
    div.appendChild(p);
    div.appendChild(p1);
    div.appendChild(p2);
    gameContainer.appendChild(div);
    console.log(button);
    button.addEventListener('click',(e)=>{
        player2Cont.nextElementSibling.remove();
        resetGame(div);
        
        const id2 = setInterval( ()=>{
            reduceTime(id2);
        },1000);
        
    });
    
} 

       function genericShoot(player,health,playern){
      
        if(player2Cont.nextElementSibling){
        return;
         }else{
         
         playern.reduceHealth();
         health.innerText=`Health = ${playern.health}`;
         if(playern.health<0){
             player.numOfRoundsWon++;
             clearInterval(id); 
             nextRound(playern);     
         }
        }
}


 shoot1.addEventListener('click',()=>{
        genericShoot(player1,health2,player2); 
       }    
  );
    
shoot2.addEventListener('click',()=>{
    genericShoot(player2,health1,player1);
 });

function reduceTime(id){
    if(second!=-1){  
        sec.innerText = `${second--}`;  
    }else{
        second = 59;
        if(minute==0){
            second=0;
            minute=5;
            // min.innerText = `${minute}`;
            roundNum.innerText = `${++round1}`;
        }else{
            
            min.innerText = `${--minute}`;
        }
        
    }
        
    if(round1 == 6 ){
        round1=0;
        roundNum.innerText = `${round1}`;
        second=0;
        sec.innerText = `${second}`;
        minute=0;
        min.innerText = `${minute}`;
        clearInterval(id);
        resetGame(null);
    }
    
}

 















