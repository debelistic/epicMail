/* global document */
/* eslint no-undefined:"error" */
const addGroupForm = document.forms.addgroupform;

const groupList = document.querySelector('#groupid');

const groupName = document.querySelector('#groupname');

/**
 * delete group
 */
groupList.addEventListener('click', (event) => {
  if (event.target.className === 'delete') {
    const li = event.target.parentElement;
    groupList.removeChild(li);
  }
});


/**
 * add group
 */
addGroupForm.addEventListener('submit', (event) => {
  // prevent form form reloading
  event.preventDefault();

  // create new group
  const newgroupname = groupName.value;
  if (newgroupname === '') {
    return;
  }

  const li = document.createElement('li');

  const remove = document.createElement('span');
  li.innerText = newgroupname;
  remove.className = 'delete';
  remove.innerText = 'Delete';

  li.appendChild(remove);
  groupList.appendChild(li);
  addGroupForm.reset();
});
