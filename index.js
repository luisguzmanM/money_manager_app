const form = document.querySelector("#form");

form.addEventListener('submit', function(e){

  e.preventDefault();
  const formData = new FormData(form);
  const formObj = formToObject(formData);
  createRowItem(formObj);
  saveData(formObj);

});

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
    'transactionId':id
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
  newRow.setAttribute('data-transaction-id', formObj['transactionId']);
  let newCell = newRow.insertCell(0);
  newCell.textContent = formObj['typeSelection'];
  newCell = newRow.insertCell(1);
  newCell.textContent = formObj['description'];
  newCell = newRow.insertCell(2);
  newCell.textContent = formObj['amount'];
  newCell = newRow.insertCell(3);
  newCell.textContent = formObj['category'];
  let cellForBtn = newRow.insertCell(4);
  const btnDeleteItem = document.createElement('button');
  const btnDeleteText = document.createTextNode('Delete');
  btnDeleteItem.appendChild(btnDeleteText);
  cellForBtn.appendChild(btnDeleteItem);

  btnDeleteItem.addEventListener('click', function(){
    let transactionRow = this.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute('data-transaction-id');
    transactionRow.remove();
    deleteItemLocalStorage(transactionId);
  });

}

const saveData = (formObj) => {

  let savedData = JSON.parse(localStorage.getItem('transactions')) || [];
  savedData.push(formObj);
  localStorage.setItem('transactions', JSON.stringify(savedData));

}

const deleteItemLocalStorage = (transactionId) => {

  let savedData = JSON.parse(localStorage.getItem('transactions'));
  let indexDataToDelete = savedData.filter(x => x.transactionId === transactionId);
  indexDataToDelete.splice(indexDataToDelete, 1);
  localStorage.setItem('transactions', JSON.stringify(savedData ));

}

document.addEventListener('DOMContentLoaded', function(){

  let myArray = JSON.parse(localStorage.getItem('transactions')) || [];
  myArray.forEach(x => {
    createRowItem(x);
  });

});
