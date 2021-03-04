const form = document.querySelector("#form");
const inputTypeSelection = document.getElementsByTagName('typeSelection');
const inputDescription = document.getElementById('description');
const inputAmount = document.getElementById('amount');
const inputCategory = document.getElementById('category');

const addTask = (e) => {

  e.preventDefault();
  const formData = new FormData(form);
  const formObj = formToObject(formData);
  createRowItem(formObj);
  saveData(formObj);
  form.reset();

}

const formToObject = (formData) => {
  
  let typeSelection = formData.get('typeSelection');
  let description = formData.get('description');
  let amount = formData.get('amount');
  let category = formData.get('category');
  let id = getTransactionId();
  
  return {
    
    'typeSelection':typeSelection,
    'description':description,
    'amount':amount,
    'category':category,
    'id':id
    
  }
  
}

const getTransactionId = () => {
  
  let lastTransactionId = localStorage.getItem('lastTransactionId') || '-1';
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem('lastTransactionId', JSON.stringify(newTransactionId));
  return newTransactionId;
  
}

const createRowItem = (formObj) => {
  
  const newRow = document.querySelector("#table").insertRow(-1);
  newRow.setAttribute('id', formObj['id']);
  let newCell = newRow.insertCell(0);
  newCell.textContent = formObj['typeSelection'];
  newCell = newRow.insertCell(1);
  newCell.textContent = formObj['description'];
  newCell = newRow.insertCell(2);
  newCell.textContent = '$' + formObj['amount'];
  newCell = newRow.insertCell(3);
  newCell.textContent = formObj['category'];

  let cellForBtn = newRow.insertCell(4);
  const btnContainer = document.createElement('div');
  const btnIcon = document.createElement('i');
  btnIcon.setAttribute('class', 'icon-delete');
  btnIcon.style.cursor = 'pointer';
  btnContainer.appendChild(btnIcon);
  cellForBtn.appendChild(btnContainer);
  
  btnContainer.addEventListener('click', function(){
    
    let transactionRow = this.parentNode.parentNode;
    let id = transactionRow.getAttribute('id');
    deleteItemLocalStorage(id);
    transactionRow.remove();
    
  });
  
}

const saveData = (formObj) => {
  
  let savedData = JSON.parse(localStorage.getItem('transactions')) || [];
  savedData.push(formObj);  
  localStorage.setItem('transactions', JSON.stringify(savedData));

}

const deleteItemLocalStorage = (id) => {
  
  let savedData = JSON.parse(localStorage.getItem('transactions')) || [];
  let getIndexElem = savedData.findIndex(x => x.id == id);
  savedData.splice(getIndexElem, 1);
  localStorage.setItem('transactions', JSON.stringify(savedData));
  
}

document.addEventListener('DOMContentLoaded', function(){
  
  let myArray = JSON.parse(localStorage.getItem('transactions')) || [];
  myArray.forEach(x => {
    createRowItem(x);
  });
  
});

form.addEventListener('submit', addTask);