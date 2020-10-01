export default class ProductList {
  constructor() {
    this.list = document.getElementById('products_list');
  }

  draw(products) {
    this.list.innerHTML = '';

    products.forEach((el) => {
      const product = document.createElement('tr');
      product.dataset.name = el.name;
      product.innerHTML = `<td class='product-title'>${el.name}</td>
      <td class='product-price'>${el.price}</td>
      <td class='product-actions'>
        <span class='edit-button'>
          <span class="visually-hidden">Edit</span>
        </span>
        <span class='delete-button'>
          <span class="visually-hidden">Delete</span>
        </span>
      </td>`;

      this.list.appendChild(product);
    });
  }
}
