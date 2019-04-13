/* global document */
const mailform = document.querySelector('form#mailform');
const usernav = document.querySelector('nav.user-options');
const usermenu = document.querySelector('.usermenu');

document.addEventListener('click', (event) => {
  if (event.target.id === 'large-compose') {
    mailform.classList.toggle('open');
  } else {
    mailform.classList.remove('open');
    
  }
});

document.addEventListener('click', (event) => {
  if (event.target.id === 'profiledropdown') {
    usernav.classList.toggle('open');
  } else {
    usernav.classList.remove('open');
  }
});

document.addEventListener('click', (event) => {
  if (event.target.id === 'menu-icon') {
    usermenu.classList.toggle('open');
  } else {
    usermenu.classList.remove('open');
  }
});
