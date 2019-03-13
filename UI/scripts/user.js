/* global document */
const mailicon = document.querySelector('i#mailicon');
const mailmenu = document.querySelector('nav.usermenu ul');
const composeicon = document.querySelector('i#composeicon');
const mailform = document.querySelector('form#mailform');


mailicon.addEventListener('click', () => {
  mailmenu.classList.toggle('open');
});

composeicon.addEventListener('click', () => {
  mailform.classList.toggle('open');
});
