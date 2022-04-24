// Menu hamburguesa

const burgerIcon = document.querySelector("#Burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener("click", (e) => {
  navbarMenu.classList.toggle("is-active");
  e.preventDefault();
});

let listaProductsfetch = [];

fetch("data.json")
  .then((resp) => resp.json())
  .then((data) => {
    let nombreCategoria = "";
    filtroPorCategoria(data, nombreCategoria);
    MenuCategoria();
    categoryList.forEach((categ) => {
      let btnSumar = document.getElementById(`btnfiltrocat${categ.id}`);
      btnSumar.addEventListener("click", (e) => {
        e.preventDefault();
        let nombreCategoria = categ.name;
        filtroPorCategoria(data, nombreCategoria);
      });
    });

    Logicabotones(data);
  });

function category(id, name) {
  this.id = id;
  this.name = name;
}

const Category0 = new category(0, "Res");
const Category1 = new category(1, "Granja");
const Category2 = new category(2, "Cerdo");
const Category3 = new category(3, "Embutidos");
const Category4 = new category(4, "Favoritos");
const categoryList = [Category0, Category1, Category2, Category3, Category4];

let contador = 0;

function filtroPorCategoria(data, nombreCategoria) {
  let borra = document.getElementById("menu-Products");
  borra.innerHTML = "";

  if (nombreCategoria == "") {
    nombreCategoria = "Res";
  }
  for (const ordena of data) {
    if (ordena.category == nombreCategoria) {
      let contenedor = document.createElement("div");
      // contenedor.setAttribute(id,id);
      contenedor.setAttribute("class", "column is-3 mx-2 mb-1 elimina ");
      // is-3 mx-2 mb-1 elimina
      // let contenedor = document.getElementById("menu-Products")
      contenedor.innerHTML = `
        <div class='box boxmia'  >
        <img src='${ordena.image}' alt='' style='opacity:1;'>
        <h2 class='title is-size-5'>${ordena.name}</h2>
        <h3 class='subtitle is-size-6'>${ordena.description}​</h3>
        <p> Precio por kg: ${ordena.precio}</p>
        <div class='has-text-centered'>
        <button class='button  ${ordena.id}' id = 'Addbtn'>  Agregar  </button>
        </div>
        <div class = 'has-text-centered ' >
            <button id ='btnResta' class = '${ordena.id}'> - </button>
            <!--Le asigno id unica, mezclo texto con $llave para que todos los inputs y todos los button tenga id diferente--> 
            <input  id="Cant${ordena.id}" type="text"  value= '1' min= '1'  onkeypress="return event.charCode >= 48" ></input>
                                  <button id ='btnSumar' class = '${ordena.id}' > + </button> 
        </div>
    </div>`;
      document.getElementById("menu-Products").appendChild(contenedor);
    }
  }
  let updateBreadcrumb = document.getElementById("breadcrumb");
  updateBreadcrumb.innerHTML = `${nombreCategoria}`;

  filterLeft(data, nombreCategoria);
}

// Agregar categorias

function MenuCategoria() {
  categoryList.forEach((cat) => {
    let buscadivCat = document.createElement("a");
    buscadivCat.setAttribute("class", "navbar-item");
    buscadivCat.innerHTML = `<span id= 'btnfiltrocat${cat.id}'>${cat.name} </span>`;
    document.getElementById("navbar-Category").appendChild(buscadivCat);
  });
}

function menu_cart_dinamico() {
  validacionStorageCartDinamico();
}

function validacionStorageCartDinamico() {
  let IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  let productAValidar = listaProductsfetch;
  IsStoraged == undefined
    ? muestraCartDinamico(productAValidar)
    : muestraCartDinamico(IsStoraged);
  console.log(productAValidar);
}

function muestraCartDinamico(filtro) {
  for (const ordena of filtro) {
    let contenedor = document.createElement("div");
    contenedor.setAttribute("class", "column is-3 mx-2 mb-1 elimina ");
    contenedor.innerHTML = `
              <div class='box boxmia'  >
                  <img src='${ordena.image}' alt='' style='opacity:1;'>
                  <h2 class='title is-size-5'>${ordena.name}</h2>
                  <h3 class='subtitle is-size-6'>${ordena.description}​</h3>
                  <p> Precio por kg: ${ordena.precio}</p>
                  <div class='has-text-centered'>
                  <button class='button  ${ordena.id}' id = 'Addbtn'>  Agregar  </button>
                  </div>
                  <div class = 'has-text-centered ' >
                      <button id ='btnResta' class = '${ordena.id}'> - </button>
                      <!--Le asigno id unica, mezclo texto con $llave para que todos los inputs y todos los button tenga id diferente-->
                      <input  id="Cant${ordena.id}" type="text"  value= '1' min= '1'  onkeypress="return event.charCode >= 48" ></input>
                                            <button id ='btnSumar' class = '${ordena.id}' > + </button> 
                  </div>
              </div>`;
    document.getElementById("menu-Products").appendChild(contenedor);
  }
}

/*

  ==============================================
|| Botones de suma resta y agregar en menu-cart ||  
  ==============================================

*/
function Logicabotones(data) {
  let delegProducts = document.querySelector("#menu-Products");
  delegProducts.addEventListener("click", (e) => {
    // buscar el id
    let buscaId = e.target.classList.value;

    switch (e.target.id) {
      case "btnSumar":
        let sumatoria = document.getElementById(`Cant${buscaId}`);
        sumatoria.value++;
        break;
      case "btnResta":
        let sumatoriaresta = document.getElementById(`Cant${buscaId}`);
        if (sumatoriaresta.value < 1) {
          Swal.fire({
            title: "Error!",
            text: "No se pueden ingresar numeros negativos",
            icon: "error",
            confirmButtonText: "De Acuerdo",
          });
        } else {
          sumatoriaresta.value--;
        }
        break;

      case "Addbtn":
        let addValue =
          e.target.parentNode.parentNode.childNodes[11].childNodes[5].value;
          if (addValue < 1 ){
            Swal.fire({
              title: "Error!",
              text: "Ingrese numero valido",
              icon: "error",
              confirmButtonText: "De Acuerdo",
            });
          }  else 
          {

        let iDProducttoAdd = e.target.classList[1];
        let consultaIndiceData = data.findIndex(
          (el) => el.id == iDProducttoAdd
        );
        if (carrit == null) {
          carrit = [];
          carrit.push({
            idProduct: iDProducttoAdd,
            value: addValue,
            nombre: data[consultaIndiceData].name,
            precioTotal: data[consultaIndiceData].precio * addValue,
            description: data[consultaIndiceData].description,
            precio: data[consultaIndiceData].precio,
            image: data[consultaIndiceData].image,
          });

          JSONlistaCarrito = JSON.stringify(carrit);
          localStorage.setItem("cartLS", JSONlistaCarrito);
        } else {
          let indiceCarrito = carrit.findIndex(
            (el) => el.idProduct === iDProducttoAdd
          );
          if (indiceCarrito < 0) {
            carrit.push({
              idProduct: iDProducttoAdd,
              value: addValue,
              nombre: data[consultaIndiceData].name,
              precioTotal: data[consultaIndiceData].precio * addValue,
              description: data[consultaIndiceData].description,
              precio: data[consultaIndiceData].precio,
              image: data[consultaIndiceData].image,
            });
            JSONlistaCarrito = JSON.stringify(carrit);
            localStorage.setItem("cartLS", JSONlistaCarrito);
          } else {
            let consultaIdenCarrito = carrit.findIndex(
              (el) => el.idProduct == iDProducttoAdd
            );
            console.log("consultaIdenCarrito", consultaIdenCarrito);
            let helpvalue = parseInt(carrit[consultaIdenCarrito].value);
            console.log("helpvalue", helpvalue);
            console.log("addvalue", addValue);
            helpvalue = helpvalue + parseInt(addValue);
            carrit[consultaIdenCarrito].value = helpvalue;
            carrit[consultaIdenCarrito].precioTotal =
              carrit[consultaIdenCarrito].value *
              carrit[consultaIdenCarrito].precio;
            JSONlistaCarrito = JSON.stringify(carrit);
            JSONlistaCarrito[consultaIdenCarrito].value = helpvalue;

            localStorage.setItem("cartLS", JSONlistaCarrito);
          }
        }
      }
        break;
    }
  });
}

////////////////////////////////////////////////////////////
// Funciones del carrito
//
/////////////////////////////////////////////////////////////

// Carrito en modal  Falta la logica de agregar objetos al carrito
const btnModal = document.getElementById("modal-js-btn");
const modalBG = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");
const closebtnModal = document.getElementById("closebtnModal");

// Falta hacer arreglo delegacion de eventos
modalCarrito();

function modalCarrito() {
  btnModal.addEventListener("click", (e) => {
    modal.classList.add("is-active");
    e.preventDefault();
    logicaMostrarCarrito();
  });

  modalBG.addEventListener("click", (e) => {
    modal.classList.remove("is-active");
    e.preventDefault();
  });

  closebtnModal.addEventListener("click", (e) => {
    modal.classList.remove("is-active");
    e.preventDefault();
  });
}

let carrit = JSON.parse(localStorage.getItem("cartLS"));

function logicaMostrarCarrito() {
  let limpiaCarr = document.getElementById("Carrito-Muestra");
  limpiaCarr.innerHTML = "";
  let IsStoraged = JSON.parse(localStorage.getItem("cartLS"));
  IsStoraged.forEach((itemCarrito) => {
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
    
        <button class= "restaDelCarrito" id = "${itemCarrito.idProduct}"> - </button>
        <input type="number"  value= '${itemCarrito.value}' id = 'valorCarrito${itemCarrito.idProduct}' class= "Inputscarr" min= '1'  onkeypress="return event.charCode >= 48" ></input> 
        <button class = 'sumaDelCarrito' id = '${itemCarrito.idProduct}'> + </button>  
        <div><strong class = "Precio-total" id= "Precio-total${itemCarrito.idProduct}"> Precio total:${itemCarrito.precioTotal} </strong>
        </div>
        <div class = " EliminardelCarrito "> 
        <i class=" Eliminafila fa-regular fa-trash-can"  id = '${itemCarrito.idProduct}'> Elimina item</i>  
        </div>
    </div>

    
  </article>  
  
  `;
    limpiaCarr.appendChild(carritoMuestra);
  });
}

/*

==============================
Botones del carrito
==============================

*/


function logicaBotonesCarrito() {



  let delegProducts = document.querySelector("#Carrito-Muestra");
  delegProducts.addEventListener("click", (e) => {
    let buscaId = e.target.id;

    let almacenaStorage = JSON.parse(localStorage.getItem("cartLS"));
    let buscaPosicion = almacenaStorage.findIndex((el) => el.idProduct == buscaId);





    switch (e.target.classList[0]) {
      case "sumaDelCarrito":
        let almacenaValorCant = document.getElementById(
          `valorCarrito${buscaId}`
        );
        almacenaValorCant.value++;
        almacenaStorage[buscaPosicion].value = almacenaValorCant.value;
        almacenaStorage[buscaPosicion].precioTotal = almacenaValorCant.value * almacenaStorage[buscaPosicion].precio ;
        
        let UpdateStoragesuma = JSON.stringify(almacenaStorage);
        localStorage.setItem("cartLS", UpdateStoragesuma);

        let actualizaPrecioCarrito = document.getElementById(
          `Precio-total${buscaId}`
        );
        actualizaPrecioCarrito.innerHTML = `Precio Total: ${almacenaStorage[buscaPosicion].precioTotal }`

        break;
      case "restaDelCarrito":
        let almacenaValorCantres = document.getElementById(
          `valorCarrito${buscaId}`
        );
        if (almacenaValorCantres.value < 1) {
          Swal.fire({
            title: "Error!",
            text: "No se pueden ingresar numeros negativos",
            icon: "error",
            confirmButtonText: "De Acuerdo",
          });
        } else {
          almacenaValorCantres.value--;
          almacenaStorage[buscaPosicion].value = almacenaValorCantres.value;
          
          almacenaStorage[buscaPosicion].precioTotal = almacenaValorCantres.value * almacenaStorage[buscaPosicion].precio ;
          let UpdateStorageresta = JSON.stringify(almacenaStorage);
          localStorage.setItem("cartLS", UpdateStorageresta);
          
        let actualizaPrecioCarrito = document.getElementById(
          `Precio-total${buscaId}`
        );
        actualizaPrecioCarrito.innerHTML = `Precio Total: ${almacenaStorage[buscaPosicion].precioTotal }`

        }

        break;

      case "Eliminafila":
        almacenaStorage.splice(buscaPosicion, 1);
        let UpdateStorage = JSON.stringify(almacenaStorage);
        localStorage.setItem("cartLS", UpdateStorage);
        break;
    }
  });



  let BtnLimpiaConfirmacompra = document.getElementById("btnConfirmacion");
  BtnLimpiaConfirmacompra.addEventListener("click", (e) => {
    e.preventDefault();
    idAccion = e.target.id;
    if (idAccion == "confirmaCompra") {
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "Muchas gracias por elegirnos!! se enviará un mail con el pedido correspondiente.",
        showConfirmButton: true,
      });
    } else if (idAccion == "vaciaCarrito") {
      Swal.fire({
        title: "Está seguro de vaciar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, seguro",
        cancelButtonText: "No, no quiero",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Borrado!",
            icon: "success",
            text: "Carrito vaciado ",
          });
          let UpdateStorage = JSON.stringify(carrit);
          localStorage.removeItem("cartLS", UpdateStorage);
          carrit = [];
          modal.classList.remove("is-active");
        }
      });
    }
  });
}

logicaBotonesCarrito();

///////////////////////////////
//
// Filtros laterales
//
////////////////////////////////
function filterLeft(data, nombreCategoria) {
  if (nombreCategoria == "") {
    nombreCategoria = "Res";
  }

  let parentFilterLeft = document.getElementById("seccionProducts");
  parentFilterLeft.addEventListener("click", (e) => {
    console.log(e.target.id);
    idFilter = e.target.id;
    let element = document.getElementById("menu-Products");
    switch (idFilter) {
      case "MenorPrecio":
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        data.sort((a, b) => {
          if (a.precio > b.precio) {
            return 1;
          }
          if (a.precio < b.precio) {
            return -1;
          }
          return 0;
        });
        let limpiaMenorPrecio = document.getElementById("menu-Products");
        limpiaMenorPrecio.innerHTML = "";
        filtroPorCategoria(data, nombreCategoria);
        break;

      case "MayorPrecio":
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        data.sort((a, b) => {
          if (a.precio < b.precio) {
            return 1;
          }
          if (a.precio > b.precio) {
            return -1;
          }
          return 0;
        });
        let limpiaMayorPrecio = document.getElementById("menu-Products");
        limpiaMayorPrecio.innerHTML = "";
        filtroPorCategoria(data, nombreCategoria);
        break;

    }
  });
}
