import addItem from './addItem'
document.getElementById('submit_btn').addEventListener('click', function(e) {
    e.preventDefault();
    addItem()
})