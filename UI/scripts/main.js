const navbutton = document.querySelector('i#navbutton');
const navmenu = document.querySelector('nav ul');

navbutton.addEventListener('click', () => {
    navmenu.classList.toggle('open');

})