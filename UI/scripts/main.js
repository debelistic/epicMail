let navicon = document.querySelector('i');
let navmenu = document.querySelector('nav ul')

navicon.addEventListener('click', () => {
    navmenu.classList.toggle('open');

})