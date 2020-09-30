let arr = [];
let add = document.querySelector('.add');
let addForm = document.getElementById('add_form');
let editForm = document.getElementById('edit_form');
let newItemModal = document.querySelector('.modal_add');
let editItemModal = document.querySelector('.modal_edit');
let edit = document.getElementsByClassName('edit');
let editNameInput = document.getElementById('edit_name_input');
let editPriceInput = document.getElementById('edit_price_input');
let counter = 0;

function addItem() {
    let table = document.getElementById('table');

        let nameField = addForm.name,
        priceField = addForm.price;
        let obj = {
            name: nameField.value,
            price: +priceField.value
        };
    

    
        
        table.insertAdjacentHTML('beforeend', `<tr id=${counter}>
        <td class="item_name">${obj.name.trim()}</td>
        <td class="item_price">${obj.price}</td>
        <td class="item_actions">
            <span class="edit">&#9998;</span>
            <span class="delete">&#65794;</span>
        </td>
    </tr>`);
    arr.push(obj)
        addForm.reset();
        counter++;

        if (arr.length > 0) {

                for(let j=0; j<arr.length; j++) {
                edit[i].addEventListener('click', (e) => {
                    editItemModal.classList.add('active');
                    console.log(e.currentTarget.closest('tr'))
                    // if (j === counter) {
                    editNameInput.value = 'Заполни меня';
                    editPriceInput.value = 'И моего сына тоже';
                    // }
                });
                editForm.addEventListener('submit', () => {
                    // editForm.reset();
                    
                    arr[j].name = editNameInput.value;
                    arr[j].price = editPriceInput.value
                });
                editForm.addEventListener('reset', () => {
                    editItemModal.classList.remove('active')
                })
            }
        
        }
}

add.addEventListener('click', () => {
    newItemModal.classList.add('active')
})


addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addItem();
    newItemModal.classList.remove('active')
    console.log(arr)
})
addForm.addEventListener('reset', () => {
    newItemModal.classList.remove('active');
})

