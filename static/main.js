// const { create } = require("../src/contactsDB.js");

// const contactsDB = require("../src/contactsDB");

const contactsList = ge('#contacts');
const firstNameInput = ge('#firstName');
const lastNameInput = ge('#lastName');
const phoneInput = ge('#phone');
const sexSelect = ge('#sex');
const btn = ge('#create');
const getAll = ge('#get-all');
const update = ge('#update');
const remove = ge('#remove');
const index = ge('#index');
const find = ge('#find');
const findInput = ge('#findInput');


btn.addEventListener('click', () => createRecord());
getAll.addEventListener('click', () => getAllRecords())
update.addEventListener('click', () => updateRecord())
remove.addEventListener('click', () => removeRecord())
find.addEventListener('click', () => findRecord())

clear();

function createRecord() {

  const record = JSON.stringify({
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    phone: phoneInput.value,
    sex: sexSelect.value,
  });

  fetch(`/create?record=${record}`)

  clear();
}

function getAllRecords() {

  contactsList.innerHTML = "";

  fetch('/get-all')
    .then(response => response.json())
    .then(result => {
      Object.keys(result)
        .map(key => {
          const value = result[key];
          contactsList.append(key)
          Object.keys(value)
            .map(key1 => {
              const value1 = value[key1]
              const str = ` ${key1} : ${value1} `;
              contactsList.append(str, "\n")
            })
        })
    });

  clear()
}



function updateRecord() {

  contactsList.innerHTML = "";


  const record = JSON.stringify({
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    phone: phoneInput.value,
    sex: sexSelect.value,
  });

  const indexRecord = index.value

  fetch(`/update?record=${record}&index=${indexRecord}`);
  

  clear()

    
}

function removeRecord() {
  
  const indexRecord =  JSON.stringify([index.value]);
  
  fetch(`/remove?index=${indexRecord}`)
  
  clear();
}

function findRecord() {

  contactsList.innerHTML = ""

  const prediction = JSON.stringify({
    phone: findInput.value
  }); 

  fetch(`/find?prediction=${prediction}`)
    .then(response => response.json())
    .then(result => {
      Object.keys(result)
        .map(key => {
          const value = result[key];
          contactsList.append(key)
          Object.keys(value)
            .map(key1 => {
              const value1 = value[key1]
              const str = ` ${key1} : ${value1} `;
              contactsList.append(str)
            })
        })
    });
  clear();
}



function ge(selector) {
  return document.querySelector(selector);
}

function clear() {

  firstNameInput.value = ''
  lastNameInput.value = ''
  phoneInput.value = ''
  sexSelect.value = "None"
  index.value = 0
  findInput.value = 0

}