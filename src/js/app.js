const arr = [];
const add = document.querySelector('.add');
const addForm = document.getElementById('add_form');
const editForm = document.getElementById('edit_form');
const newItemModal = document.querySelector('.modal_add');
const editItemModal = document.querySelector('.modal_edit');
const edit = document.getElementsByClassName('edit');
const editNameInput = document.getElementById('edit_name_input');
const editPriceInput = document.getElementById('edit_price_input');
let counter = 0;
// const items = document.getElementsByClassName('item');
// const deleter = document.getElementsByClassName('delete');

function addItem() {
  const table = document.getElementById('table');

  const nameField = addForm.name;
  const priceField = addForm.price;
  const obj = {
    id: counter,
    name: nameField.value,
    price: +priceField.value,
  };

  table.insertAdjacentHTML(
    'beforeend',
    `<tr>
        <td class='item_name'>${obj.name.trim()}</td>
        <td class='item_price'>${obj.price}</td>
        <td class='item_actions'>
            <span class='edit' data-index='${counter}'>&#9998;</span>
            <span class='delete' data-index='${counter}'>&#65794;</span>
        </td>
    </tr>`,
  );
  arr.push(obj);
  addForm.reset();
  counter += 1;

  if (arr.length > 0) {
    for (const ed of edit) {
      for (const j of arr) {
        ed.addEventListener('click', (e) => {
          editItemModal.classList.add('active');
          if (e.currentTarget.dataset.index === j.id) {
            editNameInput.value = j.name;
            editPriceInput.value = j.price;
          }
          console.log(j.id);
        });

        editForm.addEventListener('submit', () => {
          // editForm.reset();

          j.name = editNameInput.value;
          j.price = editPriceInput.value;
        });
        editForm.addEventListener('reset', () => {
          editItemModal.classList.remove('active');
        });
        // for (let x of deleter) {
        //     x.addEventListener('click', function(e) {
        //         if (e.currentTarget.dataset.number == j.id) {

        //         e.currentTarget.parentElement.parentElement.remove();
        //         arr.splice(j, 1);
        //         }
        //     })
        // }
      }
    }
  }
}

add.addEventListener('click', () => {
  newItemModal.classList.add('active');
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addItem();
  newItemModal.classList.remove('active');
});
addForm.addEventListener('reset', () => {
  newItemModal.classList.remove('active');
});
