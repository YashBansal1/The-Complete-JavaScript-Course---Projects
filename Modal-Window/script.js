'use strict';

document.querySelector('.show-modal').addEventListener(
    'click', () => {
       document.querySelector('.modal').classList.remove('hidden');
       document.querySelector('.overlay').classList.remove('hidden');
    }
)

document.querySelector('.close-modal').addEventListener('click', ()=> {
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
})