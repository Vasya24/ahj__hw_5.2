import addItem from './addItem'
import showNewItemModal from './showNewItemModal'
import hideNewItemModal from './hideNewItemModal'

document.querySelector('.add').addEventListener('click', () => {
    showNewItemModal()
})

document.getElementById('submit_btn').addEventListener('click', function(e) {
    e.preventDefault();
    addItem()
})

hideNewItemModal()