'use strict';

 //select the element with the class message and change the text content

 //random number to be generated
let number = Math.round(Math.random()*100)
console.log(number)
//initial score
let score = 20
let highscore = 0

const displayMessage = (message) => {
    document.querySelector('.message').textContent = message;
}
//when check button is clicked
document.querySelector('.check').addEventListener('click', function(){

const guess = Number(document.querySelector('.guess').value)


//when there is no input
if(!guess){
    displayMessage('⛔️ No number!')
}
//when player wins
else if(guess === number){
    displayMessage(`🎉 Correct Number !`)
    let currentScore = document.querySelector('.score').textContent
    if(currentScore > highscore) {
    highscore = currentScore
    document.querySelector('.highscore').textContent = score
    }
    document.querySelector('.number').textContent = `${number}`
    document.querySelector('body').style.backgroundColor = '#60b347'
    document.querySelector('.number').style.width = '30rem'

}

//when score is too low or too high
else if (guess !== number) {
    if(score<=0){
        displayMessage('You Lost the Game !')
        document.querySelector('.score').textContent = 0
    }
    else {
    document.querySelector('.message').textContent = guess>number?'Too high !':'Too low !'
    document.querySelector('.score').textContent = `${--score}`
    }
}

// else if (guess < number) {
//     if(score<=0){
//         document.querySelector('.message').textContent = 'You Lost the Game !'
//         document.querySelector('.score').textContent = 0
//     }
//     else {
//     document.querySelector('.message').textContent = 'Too low !'
//     document.querySelector('.score').textContent = `${--score}`
//     }
// }

// // when score is too high
//  else if (guess > number) {
//     if(score<=0){
//         document.querySelector('.message').textContent = 'You Lost the Game !'
//         document.querySelector('.score').textContent = 0
//     }
//     else {
//     document.querySelector('.message').textContent = 'Too high !'
//     document.querySelector('.score').textContent = `${--score}`
//     }
// }
})

//when again button is clicked
document.querySelector('.again').addEventListener('click', ()=>{
    score = 20
    number = Math.round(Math.random()*100)
    displayMessage('Start Guessing ...')
    document.querySelector('.number').textContent = '?'
    document.querySelector('body').style.backgroundColor = '#222'
    document.querySelector('.number').style.width = '15rem'
    document.querySelector('.score').textContent = 20
    document.querySelector('.guess').value = ''
    console.log(number)
})

