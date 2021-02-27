const form = document.querySelector("#form");

form.addEventListener('submit', function(e){

  e.preventDefault();
  const formData = new FormData(form);
  const formObj = formToObject(formData);
  console.log(formObj);
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

