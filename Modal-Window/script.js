'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const closeModal = ()=> {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = () => {
    modal.classList.remove('hidden');
    // or modal.style.display = 'block';
    overlay.classList.remove('hidden');
 }


document.querySelectorAll('.show-modal').forEach((button)=>{
    button.addEventListener(
        'click', openModal
    )

    // button.addEventListener(, () => {
    //     modal.classList.remove('hidden');
    //     overlay.classList.remove('hidden');
    //  })
})

document.querySelector('.close-modal').addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)