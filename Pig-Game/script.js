'use strict';

const rollDice = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new')
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const score0 = document.querySelector('#score--0'); 
const player1 = document.querySelector('.player--0')
const player2 = document.querySelector('.player--1')
// although both getElementById and querySelector do the same work but getElementById is faster than querySelector.
const score1 = document.querySelector('#score--1');

dice.classList.add('hidden');

let currentScore, totalScore, activePlayer, playing;

const switchPlayers = () =>{
    document.getElementById(`current--${activePlayer}`).textContent = 0
        currentScore = 0;
        activePlayer=activePlayer===0?1:0;
        player1.classList.toggle('player--active');
        player2.classList.toggle('player--active');
}

const init = ()=>{
    playing = true;
    //dice.style.display='none'

    current0.textContent = 0;
    current1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    activePlayer= 0;
    currentScore =0;
    totalScore =0;
    
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    dice.classList.add('hidden');
}
init();
rollDice.addEventListener('click', ()=>{
    if (!playing){
        return;
    }
    //dice.style.display='inline'
    dice.classList.remove('hidden');

    const imageNumber = Math.floor(Math.random() * 6 + 1)
   // console.log(imageNumber)
    dice.src = `dice-${imageNumber}.png`

    if(imageNumber === 1){
       switchPlayers();
    }else{
       currentScore += imageNumber;
       document.getElementById(`current--${activePlayer}`).textContent = currentScore
    }
})

hold.addEventListener('click', ()=>{
    if (!playing){
        return;
    }
    totalScore = Number(document.getElementById(`score--${activePlayer}`).textContent);
    totalScore += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScore;
    
    if (totalScore >= 20){
        dice.classList.add('hidden');
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
else{
    switchPlayers();
}
})

const ng = newGame.addEventListener('click', init() )