/* global document */
const mailicon = document.querySelector('i#mailicon');
const mailmenu = document.querySelector('nav.usermenu ul');
const composeicon = document.querySelector('i#composeicon');
const mailform = document.querySelector('form#mailform');


mailicon.addEventListener('click', () => {
  mailform.classList.remove('open');
  mailmenu.classList.toggle('open');
});

composeicon.addEventListener('click', () => {
  mailmenu.classList.remove('open');
  mailform.classList.toggle('open');
});
