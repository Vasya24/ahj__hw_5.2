/* eslint-disable max-len */
/* eslint-disable consistent-return */
import ProductStorage from './ProductStorage';
import ProductList from './ProductList';

export default class ProductApp {
  constructor() {
    this.productStorage = new ProductStorage();
    this.productList = new ProductList();
    this.form = document.forms.edit;
    this.formItems = [...this.form.elements];
    this.addButton = document.querySelector('.header-button');
    this.editBox = document.querySelector('.edit-box');
    this.editProduct = null;
    this.title = document.getElementById('input_title');
    this.price = document.getElementById('input_price');
    this.save = document.getElementById('save_button');
    this.cancel = document.getElementById('cancel_button');
    this.productField = document.getElementById('products_list');
    this.tootlipItems = Array.from(document.querySelectorAll('.tooltip'));
  }

  init() {
    this.productList.draw(this.productStorage.products);
    this.action();
  }

  action() {
    this.addButton.addEventListener('click', () => {
      this.showEditForm();
    });
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = event.currentTarget.checkValidity();
      if (!isValid) {
        const first = this.formItems.find((el) => !el.validity.valid);
        const tooltip = first.parentElement.querySelector('.tooltip');
        tooltip.classList.add('tooltipe-active');
        tooltip.style.top = `${first.offsetTop + first.offsetHeight}px`;
        tooltip.style.left = `${first.offsetLeft + (first.offsetWidth - tooltip.offsetWidth) / 2}px`;
        first.focus();
        first.addEventListener('blur', () => {
          tooltip.classList.remove('tooltipe-active');
        });
      } else {
        if (this.editProduct) {
          const editIndex = this.productStorage.products.findIndex((el) => el.name === this.editProduct.dataset.name);
          const editItem = this.productStorage.products[editIndex];
          editItem.name = this.title.value;
          this.editProduct.dataset.name = editItem.name;
          editItem.price = parseInt(this.price.value, 10);
          this.editProduct = null;
        } else {
          this.productStorage.addProduct(this.title.value, parseInt(this.price.value, 10));
        }
        this.form.reset();
        this.editBox.classList.remove('edit-box-active');
        this.productList.draw(this.productStorage.products);
      }
    });
    this.cancel.addEventListener('click', (event) => {
      event.preventDefault();
      this.form.reset();
      this.editBox.classList.remove('edit-box-active');
    });
    this.productField.addEventListener('click', (event) => {
      if (document.querySelector('.edit-box-active')) return false;
      if (event.target.classList.contains('edit-button')) {
        this.showEditForm();
        this.editProduct = event.target.parentElement.parentElement;
        this.title.value = this.editProduct.dataset.name;
        this.price.value = parseInt(this.editProduct.querySelector('.product-price').innerText, 10);
      }
      if (event.target.classList.contains('delete-button')) {
        const deleteItem = event.target.parentElement.parentElement;
        const deleteIndex = this.productStorage.products.findIndex((el) => el.name === deleteItem.dataset.name);
        this.productStorage.products.splice(deleteIndex, 1);
        this.productList.draw(this.productStorage.products);
      }
    });
  }

  showEditForm() {
    this.editBox.classList.add('edit-box-active');
    this.editBox.style.top = '25px';
    this.editBox.style.left = `${(this.editBox.offsetParent.offsetWidth / 2) - (this.editBox.offsetWidth / 2)}px`;
  }
}
