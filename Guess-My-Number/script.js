'use strict';

 //select the element with the class message and change the text content
let number = Math.round(Math.random()*100)
console.log(number)
let score = 20
document.querySelector('.check').addEventListener('click', function(){
const guess = Number(document.querySelector('.guess').value)
console.log(guess)
if(!guess){
    document.querySelector('.message').textContent = '⛔️ No number!'
}else if(guess === number){
    document.querySelector('.message').textContent = `Correct Number : ${guess}`
    document.querySelector('.highscore').textContent = score
    document.querySelector('.number').textContent = `${number}`
}
else if (guess < number) {
    document.querySelector('.message').textContent = 'Too low'
    document.querySelector('.score').textContent = `${--score}`

    
}else if (guess > number) {
    document.querySelector('.message').textContent = 'Too high'
    document.querySelector('.score').textContent = `${--score}`
}
})

