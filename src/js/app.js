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
let items = document.getElementsByClassName('item');
let deleter = document.getElementsByClassName('delete');

function addItem() {
    let table = document.getElementById('table');

        let nameField = addForm.name,
        priceField = addForm.price;
        let obj = {
            id: counter,
            name: nameField.value,
            price: +priceField.value
        };
    

    
        
        table.insertAdjacentHTML('beforeend', `<tr>
        <td class="item_name">${obj.name.trim()}</td>
        <td class="item_price">${obj.price}</td>
        <td class="item_actions">
            <span class="edit" data-index="${obj.id}">&#9998;</span>
            <span class="delete" data-number="${obj.id}">&#65794;</span>
        </td>
    </tr>`);
    arr.push(obj)
        addForm.reset();
        counter++;

        if (arr.length > 0) {
            for (let ed of edit) {
                for (let j of arr) {
                  
                    
                ed.addEventListener('click', function(e) {
                    editItemModal.classList.add('active');
                    console.log(e.currentTarget.dataset.index)
                    if (e.currentTarget.dataset.index == this.id) {
                    editNameInput.value = this.name;
                    editPriceInput.value = this.price;
                }});
            
                editForm.addEventListener('submit', () => {
                    // editForm.reset();
                    
                    arr[j].name = editNameInput.value;
                    arr[j].price = editPriceInput.value
                });
                editForm.addEventListener('reset', () => {
                    editItemModal.classList.remove('active')
                })
                for (let x of deleter) {
                    x.addEventListener('click', function(e) {
                        if (e.currentTarget.dataset.number == j.id) {

                        e.currentTarget.parentElement.parentElement.remove();
                        arr.splice(j, 1);
                        console.log(j, arr.length)

                        }
                    })
                }
            }
            
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

