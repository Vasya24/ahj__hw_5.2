export default function hideNewItemModal() {
    let newItemModal = document.querySelector('.modal_add');
    document.querySelector('#add_form').addEventListener('reset', () => {
        newItemModal.classList.remove('active')
    })
}