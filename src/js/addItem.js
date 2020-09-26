let i=0;

export default function addItem() {
let table = document.getElementById('table'),
form = document.getElementById('add_form')
    let nameField = form.name,
    priceField = form.price;
    let obj = {
        name: nameField.value,
        price: priceField.value.toString()
    }
    
    localStorage.setItem(i, JSON.stringify(obj))
    let storObj = localStorage.getItem(i);

    
    table.insertAdjacentHTML('beforeend', `        <tr>
    <td class="item_name">${JSON.parse(storObj).name}</td>
    <td class="item_price">${JSON.parse(storObj).price}</td>
    <td class="item_actions">
        <span class="edit">&#9998;</span>
        <span class="delete">&#65794;</span>
    </td>
</tr>`)
    form.reset()
    i++

    document.querySelector('.edit').addEventListener('click', (e) => {
        console.log(e.target.className)
    })

    document.querySelector('.delete').addEventListener('click', (e) => {
        if (e.target.parentNode.className == 'item_actions') {
            e.target.parentNode.parentNode.remove()
        }
    })
}