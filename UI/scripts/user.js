/* global document */
const mailform = document.querySelector('form#mailform');
const userimage = document.querySelector('#profiledropdown');
const usernav = document.querySelector('nav.user-options');
const largecompose = document.querySelector('#large-compose');
const menuicon = document.querySelector('#menu-icon');
const usermenu = document.querySelector('.usermenu');


largecompose.addEventListener('click', () => {
  usermenu.classList.remove('open');
  mailform.classList.toggle('open');
});

userimage.addEventListener('click', () => {
  usernav.classList.toggle('open');
});

menuicon.addEventListener('click', () => {
  mailform.classList.remove('open');
  usermenu.classList.toggle('open');
});

document.addEventListener('click', () => {
  document.removeEventListener('click', userimage);
});
