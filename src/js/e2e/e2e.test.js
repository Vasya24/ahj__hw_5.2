import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('ProductApp ', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: true,
      slowMo: 100,
      devtools: false,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  describe('ProductApp ', () => {
    test('should add "invalid" class for incorrent input title values', async () => {
      await page.goto(baseUrl);
      const addButton = await page.$('[class=header-button]');
      addButton.click();
      const form = await page.$('[class=edit]');
      const submit = await form.$('[id=save_button]');
      submit.click();
      await page.waitForSelector('[id=input_title]:invalid');
    });
    test('should add "invalid" class for incorrent input price values', async () => {
      await page.goto(baseUrl);
      const addButton = await page.$('[class=header-button]');
      const form = await page.$('[class=edit]');
      const titleInput = await form.$('[id=input_title]');
      const submit = await form.$('[id=save_button]');
      await addButton.click();
      await titleInput.type('samsung');
      await submit.click();
      await page.waitForSelector('[id=input_price]:invalid');
    });
    test('should add new product, edit product and delete product', async () => {
      await page.goto(baseUrl);
      const products = await page.$('[id=products_list]');
      const addButton = await page.$('[class=header-button]');
      const form = await page.$('[class=edit]');
      const titleInput = await page.$('[id=input_title]');
      const priceInput = await page.$('[id=input_price]');
      const submit = await form.$('[id=save_button]');
      await addButton.click();

      await titleInput.type('samsung');
      await priceInput.type('60000');
      await submit.click();
      expect(await products.evaluate(
        (el) => el.lastElementChild.querySelector('.product-title').textContent,
      )).toBe('samsung');
      expect(await products.evaluate(
        (el) => el.lastElementChild.querySelector('.product-price').textContent,
      )).toBe('60000');

      const editButton = await page.$('[class=edit-button]');
      await editButton.click();
      expect(await titleInput.evaluate(
        (el) => el.value,
      )).toBe('samsung');
      await titleInput.type(' galaxy');
      await submit.click();
      expect(await products.evaluate(
        (el) => el.children[0].querySelector('.product-title').textContent,
      )).toBe('samsung galaxy');

      const deleteButton = await page.$('[class=delete-button]');
      await deleteButton.click();
      expect(await products.evaluate(
        (el) => el.children.length,
      )).toBe(0);
    });
  });
});
