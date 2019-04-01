/* global document */
const mailform = document.querySelector('form#mailform');
const userimage = document.querySelector('#profiledropdown');
const usernav = document.querySelector('nav.user-options');
const largecompose = document.querySelector('#large-compose');


largecompose.addEventListener('click', () => {
  mailform.classList.toggle('open');
});

userimage.addEventListener('click', () => {
  usernav.classList.toggle('open');
});

document.addEventListener('click', () => {
  document.removeEventListener('click', userimage);
});
