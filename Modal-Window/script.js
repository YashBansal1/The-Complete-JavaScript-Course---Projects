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
})

document.addEventListener('keydown', (e)=>{
    if (
        e.key === 'Escape' && !modal.classList.contains('hidden')
    )
    {
        closeModal()
    }
})

document.querySelector('.close-modal').addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)