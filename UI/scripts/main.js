// eslint-disable-next-line no-undef
const navbutton = document.querySelector('i#navbutton');
// eslint-disable-next-line no-undef
const navmenu = document.querySelector('nav ul');

navbutton.addEventListener('click', () => {
  navmenu.classList.toggle('open');
});
