
function Product(id, name, description, image, stock, precio, category) {
  this.id = id
  this.name = name
  this.description = description
  this.image = image
  this.stock = stock
  this.precio = precio
  this.category = category
}

const Product1 = new Product(0, "Carne Picada", "Carne picada de nuestra carniceria", "menu-cart/carnepicada.jpg", 100, 50, "Res");
const Product2 = new Product(1, "Pollo", "De nuestra granja el mejor pollo", "menu-cart/pollo.jpg", 100, 100, "Granja");
const Product3 = new Product(2, "Asado", "Tira de asado de nuestra carniceria", "menu-cart/asado.jpg", 100, 75, "Res");
const Product4 = new Product(3, "Nalga", "nalga de nuestra carniceria", "menu-cart/nalga.jpg", 100, 300, "Res");
const Product5 = new Product(4, "Chorizo", "chorizos....", "menu-cart/chori.jpg", 100, 300, "Embutidos");
const productList = [Product1, Product2, Product3, Product4, Product5];

function category(id, name) {
  this.id = id
  this.name = name
}

const Category0 = new category(0, "Res");
const Category1 = new category(1, "Granja");
const Category2 = new category(2, "Cerdo");
const Category3 = new category(3, "Embutidos");
const Category4 = new category(4, "Promociones");
const categoryList = [Category0, Category1, Category2, Category3, Category4];

let contador = 0
