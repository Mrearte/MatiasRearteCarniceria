// "Base de datos"

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

let listaProductsfetch = [];

fetch('data.json')
  .then((resp) => resp.json())
  .then((data) => {
    muestraCartDinamico(data)
    sumaCantdeProd(data);
    restaCantdeProd(data);
    muestraCarrito(data);
    MenuCategoria();

    categoryList.forEach(categ => {
      let btnSumar = document.getElementById(`btnfiltrocat${categ.id}`)
      btnSumar.addEventListener('click', (e) => {
        e.preventDefault();
        nombreCategoria = categ.name
        switch (categ.name) {
          case "Res":
            filtroPorCategoria(data, nombreCategoria);
          break;
          case "Granja":
            filtroPorCategoria(data, nombreCategoria);
            break;
          case "Cerdo":
            filtroPorCategoria(data, nombreCategoria);

            break;
          case "Embutidos":
            filtroPorCategoria(data, nombreCategoria);

            break;
          case "Favoritos":
            filtroPorCategoria(data, nombreCategoria);

              ;
        }
      });
    });
    

  }
  );

console.log(listaProductsfetch);

function category(id, name) {
  this.id = id
  this.name = name
}

const Category0 = new category(0, "Res");
const Category1 = new category(1, "Granja");
const Category2 = new category(2, "Cerdo");
const Category3 = new category(3, "Embutidos");
const Category4 = new category(4, "Favoritos");
const categoryList = [Category0, Category1, Category2, Category3, Category4];

let contador = 0





function filtroPorCategoria(data, nombreCategoria) {

  let borra = document.getElementById("menu-Products")
  borra.innerHTML = '';
  for (const ordena of data) {
    if (ordena.category == nombreCategoria) {
      let contenedor = document.createElement("div");
      // contenedor.setAttribute(id,id);
      contenedor.setAttribute("class", "column is-3 mx-2 mb-1 elimina ");
      // is-3 mx-2 mb-1 elimina
      // let contenedor = document.getElementById("menu-Products")
      contenedor.innerHTML =
        `
                  <div class='box boxmia' >
                      <img src='${ordena.image}' alt='' style='opacity:1;'>
                      <h2 class='title is-size-5'>${ordena.name}</h2>
                      <h3 class='subtitle is-size-6'>${ordena.description}​</h3>
                      <p> Precio por kg: ${ordena.precio}</p>
                      <div class='has-text-centered'>
                      <button class='button btnadd${ordena.id}' id = 'Add${ordena.id}'>Agregar</button>
                      </div>
                      <div class = 'has-text-centered ' >
                          <button id ='btnResta${ordena.id}'> - </button>
                          <!--Le asigno id unica, mezclo texto con $llave para que todos los inputs y todos los button tenga id diferente--> 
                          <input  id="Cant${ordena.id}" type="text"  value= 0></input>
                                                <button id ='btnSumar${ordena.id}' > + </button> 
                      </div>
                  </div>`;
      document.getElementById("menu-Products").appendChild(contenedor)
    }
  }
  let updateBreadcrumb = document.getElementById('breadcrumb');
  updateBreadcrumb.innerHTML = `${nombreCategoria}`
}










// Menu hamburguesa

const burgerIcon = document.querySelector('#Burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', (e) => {
  navbarMenu.classList.toggle('is-active');
  e.preventDefault()
})


// Agregar categorias 

function MenuCategoria() {


  categoryList.forEach(cat => {
    let buscadivCat = document.createElement("a");
    buscadivCat.setAttribute("class", "navbar-item");
    buscadivCat.innerHTML = `<span id= 'btnfiltrocat${cat.id}'>${cat.name} </span>`;
    document.getElementById("navbar-Category").appendChild(buscadivCat);
  });
}

// MenuCategoria();


function menu_cart_dinamico() {
  validacionStorageCartDinamico();
}

function validacionStorageCartDinamico() {
  let IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  let productAValidar = listaProductsfetch
  IsStoraged == undefined ? muestraCartDinamico(productAValidar) : muestraCartDinamico(IsStoraged);
  console.log(productAValidar)
}

function muestraCartDinamico(filtro) {
  for (const ordena of filtro) {
    let contenedor = document.createElement("div");
    // contenedor.setAttribute(id,id);
    contenedor.setAttribute("class", "column is-3 mx-2 mb-1 elimina ");
    // is-3 mx-2 mb-1 elimina
    // let contenedor = document.getElementById("menu-Products")
    contenedor.innerHTML =
      `
              <div class='box boxmia' >
                  <img src='${ordena.image}' alt='' style='opacity:1;'>
                  <h2 class='title is-size-5'>${ordena.name}</h2>
                  <h3 class='subtitle is-size-6'>${ordena.description}​</h3>
                  <p> Precio por kg: ${ordena.precio}</p>
                  <div class='has-text-centered'>
                  <button class='button btnadd${ordena.id}' id = 'Add${ordena.id}'>Agregar</button>
                  </div>
                  <div class = 'has-text-centered ' >
                      <button id ='btnResta${ordena.id}'> - </button>
                      <!--Le asigno id unica, mezclo texto con $llave para que todos los inputs y todos los button tenga id diferente--> 
                      <input  id="Cant${ordena.id}" type="text"  value= 0></input>
                                            <button id ='btnSumar${ordena.id}' > + </button> 
                  </div>
              </div>`;
    document.getElementById("menu-Products").appendChild(contenedor)
  }

}




menu_cart_dinamico();



// Botones de suma resta y agregar en menu-cart



// Suma 
function validacionStorageParaSumarCant() {
  let IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  let productAValidar = listaProductsfetch
  IsStoraged == undefined ? sumaCantdeProd(productAValidar) : sumaCantdeProd(IsStoraged);
}


function sumaCantdeProd(filtro) {
// console.log(filtro)
  filtro.forEach(product => {

    //Capturo el btn sumar id de cada elemento
    let btnSumar = document.getElementById(`btnSumar${product.id}`)

    btnSumar.addEventListener('click', (e) => {

      //sumatoria es igual al input, que arranca el value = 0 
      let sumatoria = document.getElementById(`Cant${product.id}`)
      e.preventDefault();
      return sumatoria.value++
      // alert(e.target)
    });
  });
}

function suma_btn() {

  validacionStorageParaSumarCant()

}




// suma_btn();






// Resta

function validacionStorageParaRestarCant() {
  let IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  let productAValidar = listaProductsfetch
  IsStoraged == undefined ? restaCantdeProd(productAValidar) : restaCantdeProd(IsStoraged);
}

function restaCantdeProd(filtro) {

  //muy bien el forEach, aca estás recorriendo todo tu array
  filtro.forEach(product => {
    //Capturo el btn sumar id de cada elemento
    let btnSumar = document.getElementById(`btnResta${product.id}`)
    //asigno evento a ese boton
    btnSumar.addEventListener('click', (e) => {
      //sumatoria es igual al input, que arranca el value = 0 
      let sumatoria = document.getElementById(`Cant${product.id}`)
      //me aseguro que funciona el evento (desp borrar)
      console.log(sumatoria);
      //no hace falta usar el sumaCant, le pongo ++ al .value y listo
      sumatoria.value--;
      // alert(e.target)
    });
  });
}



function resta_btn() {
  validacionStorageParaRestarCant()
}

resta_btn();



// Boton Agregar al carrito

let carrit = [];

function validacionStorageAddtoCArt() {
  let IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  let productAValidar = listaProductsfetch
  IsStoraged === undefined ? muestraCarrito(IsStoraged) : muestraCarrito(productAValidar);
}

function addtocart() {
  validacionStorageAddtoCArt()
}

function muestraCarrito(filtro) {


  // recorriendo array
  filtro.forEach(product => {
    //Capturo el btn sumar id de cada elemento
    let addtocart = document.getElementById(`Add${product.id}`)
    //asigno evento a ese boton
    addtocart.addEventListener('click', (e) => {
      let addValue = document.getElementById(`Cant${product.id}`);
      // console.log(`productid : ${product.id}  -----  carrito id = ${carrit.idProduct}`) 

      let indiceCarrito = carrit.findIndex((el) => el.idProduct === product.id);
      console.log(indiceCarrito)
      if (indiceCarrito < 0) {
        carrit.push(
          {
            idProduct: product.id,
            value: addValue.value,
            nombre: product.name,
            precioTotal: product.precio * addValue.value,
            description: product.description,
            precio: product.precio,
            image: product.image
          });

      } else {

        carrit[product.id].value = addValue.value;
        carrit[product.id].precioTotal = carrit[product.id].value * carrit[product.id].precio
      }
    });
  });


}


addtocart();







// Carrito en modal  Falta la logica de agregar objetos al carrito
const btnModal = document.getElementById('modal-js-btn');
const modalBG = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const closebtnModal = document.getElementById('closebtnModal');


modalCarrito();

function modalCarrito() {
  btnModal.addEventListener('click', (e) => {

    modal.classList.add('is-active')
    e.preventDefault()
    logicaMostrarCarrito()
  });

  modalBG.addEventListener('click', (e) => {
    modal.classList.remove('is-active')
    e.preventDefault()
  })

  closebtnModal.addEventListener('click', (e) => {
    modal.classList.remove('is-active')
    e.preventDefault()
  })

}


// botones del carrito sumar , agregar , eliminar y finalizar compra


function sumaModal() {
  carrit.forEach(product => {
    let btnSumarCarrito = document.getElementById(`sumaDelCarrito${product.idProduct}`)
    btnSumarCarrito.addEventListener('click', (e) => {
      let sumatoriaencarrito = document.getElementById(`valorCarrito${product.idProduct}`)
      e.preventDefault();
      console.log(sumatoriaencarrito)
      product.value++
      product.precioTotal = product.value * product.precio;
      let actualizaPrecioTotal = document.getElementById(`Precio-total${product.idProduct}`);
      actualizaPrecioTotal.innerHTML = ` <strong> Precio total: ${product.precioTotal} </strong> `;
      return sumatoriaencarrito.value++
    });
  });
}

function restaModal() {
  carrit.forEach(product => {
    let btnSumarCarrito = document.getElementById(`restaDelCarrito${product.idProduct}`)
    btnSumarCarrito.addEventListener('click', (e) => {
      let sumatoriaencarrito = document.getElementById(`valorCarrito${product.idProduct}`)
      e.preventDefault();
      console.log(sumatoriaencarrito)
      product.value--
      product.precioTotal = product.value * product.precio;

      return sumatoriaencarrito.value--
    });
  });
}

function EliminaListadeCarrito() {
  carrit.forEach(product => {
    let btnEliminaCarrito = document.getElementById(`EliminardelCarrito${product.idProduct}`)
    btnEliminaCarrito.addEventListener('click', (e) => {
      carrit.splice(product.idProduct, 1)
      btnEliminaCarrito.innerHTML = '';
      logicaMostrarCarrito();
    });
  });
}


function logicaMostrarCarrito() {

  let limpiaCarr = document.getElementById('Carrito-Muestra');
  limpiaCarr.innerHTML = '';
  carrit.forEach(itemCarrito => {
    let carritoMuestra = document.createElement("div");
    carritoMuestra.innerHTML = `<article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="${itemCarrito.image}">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${itemCarrito.nombre}</strong> 
          <br>
          ${itemCarrito.description}
        </p>
        <small>Precio: ${itemCarrito.precio} </small> 
        <hr>  
      </div>
      <nav class="level is-mobile">
      </nav>
    </div>
    <div class="media-right">
      <!-- <button> -->
      
    </div>
    <div>
    
        <button id= "restaDelCarrito${itemCarrito.idProduct}"> - </button>
        <!--Le asigno id unica, mezclo texto con $llave para que todos los inputs y todos los button tenga id diferente--> 
        <input type="number"  value= '${itemCarrito.value}' id = 'valorCarrito${itemCarrito.idProduct}'></input>
        <button id = 'sumaDelCarrito${itemCarrito.idProduct}'> + </button>  
        <div><strong id = "Precio-total${itemCarrito.idProduct}"> Precio total:${itemCarrito.precioTotal} </strong>
        </div>
        <i class="fa-regular fa-trash-can" id= 'EliminardelCarrito${itemCarrito.idProduct}'></i>  
  
    </div>
  </article>  
  `
    limpiaCarr.appendChild(carritoMuestra)

  })

  sumaModal();
  restaModal();
  EliminaListadeCarrito();
}

// Filtros laterales



function validacionStorageMenorPrecio() {
  let IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  let productAValidar = listaProductsfetch
  IsStoraged == undefined ? sortMenorPrecio(productAValidar) : sortMenorPrecio(IsStoraged);
}

function menorprecio() {
  validacionStorageMenorPrecio()
}
function sortMenorPrecio(option) {
  //Ordena por menor precio
  let boton = document.getElementById("MenorPrecio")
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    let element = document.getElementById("menu-Products");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    option.sort((a, b) => {
      if (a.precio > b.precio) {
        return 1
      }
      if (a.precio < b.precio) {
        return -1;
      }
      return 0
    })
    let eiliminarMenorPrecio = document.getElementById('menu-Products')
    eiliminarMenorPrecio.innerHTML = '';
    muestraCartDinamico(option);
    suma_btn();
    resta_btn();
    addtocart();
  })
}

menorprecio();


// mayor precio

function validacionStorageMayorPrecio() {
  let IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  let productAValidar = listaProductsfetch
  IsStoraged == undefined ? sortMayorPrecio(productAValidar) : sortMayorPrecio(IsStoraged);
}

function mayorprecio() {
  validacionStorageMayorPrecio()
}
function sortMayorPrecio(option) {
  //Ordena por menor precio
  let boton = document.getElementById("MayorPrecio")
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    let element = document.getElementById("menu-Products");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    option.sort((a, b) => {
      if (a.precio < b.precio) {
        return 1
      }
      if (a.precio > b.precio) {
        return -1;
      }
      return 0
    })
    let eiliminarMenorPrecio = document.getElementById('menu-Products')
    eiliminarMenorPrecio.innerHTML = '';
    muestraCartDinamico(option);
    suma_btn();
    resta_btn();
    addtocart();
  })
}

menorprecio();
mayorprecio();

// filtro por categoria de productos
