/* global document */
const navmenu = document.querySelector('nav ul');

document.addEventListener('click', (event) => {
  if (event.target.id === 'navbutton') {
    navmenu.classList.toggle('open');
  } else {
    navmenu.classList.remove('open');
  }
});
