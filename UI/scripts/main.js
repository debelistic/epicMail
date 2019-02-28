let navbutton = document.querySelector('i#navbutton');
let navmenu = document.querySelector('nav ul')

navbutton.addEventListener('click', () => {
    navmenu.classList.toggle('open');

})