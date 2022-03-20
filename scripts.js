

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

function Category(id, name) {
  this.id = id
  this.name = name
}

const Category0 = new Category(0, "Res");
const Category1 = new Category(1, "Granja");
const Category2 = new Category(2, "Cerdo");
const Category3 = new Category(3, "Embutidos");
const Category4 = new Category(4, "Promociones");
const categoryList = [Category0, Category1, Category2, Category3, Category4];

let contador = 0

//#region Funciones de Pantalla principal

function pantallPrincipal() {
let bienvenida = document.getElementsByTagName("body");
//Definimos el innerHTML con una plantilla de texto
bienvenida.innerHTML = ` `;
document.body.append(bienvenida);

let login = document.createElement("div")
document.getElementById("Login");
login.innerHTML =
  `
            <div class="pantallaLogin" id = "formulario">
            <h1>Bienvenidos a la Carniceria</h1>
            <img src="512.png" alt="">
            <form>
                <select name="country">
                    <option value="Usuario">Usuario</option>
                    <option value="Cliente">Cliente</option>
                </select>
            <input type="submit">
            </form> 
            </div>
            `;

            
document.getElementById("Login").appendChild(login);
}


function llogin() {
  pantallPrincipal() ;
  let miFormulario = document.getElementById("formulario");
  miFormulario.addEventListener("submit", Bienvenida_form);
  function Bienvenida_form(e) {
    //Cancelamos el comportamiento del evento
    e.preventDefault();
    //Obtenemos el elemento desde el cual se disparó el evento
    let formulario_bienvenida = e.target;
    console.log(formulario_bienvenida);
    // Validacion usuario o cliente
    if (formulario_bienvenida.children[0].value == "Usuario") {
      let elimina = document.getElementById('Login');
      elimina.classList.add('is-hidden');
      let remo = document.getElementById('User')
      remo.classList.remove('is-hidden')
      Alta();
      listaCategoria();
      submitProductoNuevo();
      // Modificacion();
      // NuevaModificacion();
      eliminaproductos();
    } else {
      let elimina = document.getElementById('Login');
      elimina.classList.add('is-hidden');
      let remo = document.getElementById('webcomplete')
      remo.classList.remove('is-hidden')
      MenuCategoria();
      menu_cart_dinamico();
      suma_btn();
      resta_btn();
      addtocart();
      muestraCarrito();

    }
  }
}


//#endregion



function consultaNombreProducto(nombre) {
  let nombrearreglo = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  //   const validanombre = productList.find ((el) => el.name === nombre);
  const indice = productList.findIndex((el) => el.name.includes(nombrearreglo));
  return indice;
}


// html dinamico 


//#region Menu navbar Categoria

function MenuCategoria() {
  // let cat = document.getElementById("menu_navbar");
  for (const categ of categoryList) {
    let contcat = document.createElement("a")
    contcat.setAttribute("class", "Hoverstyle navbar-item ");
    contcat.innerHTML = `
                <span>${categ.name}</span>
        `
    document.getElementById("navbarcategory").appendChild(contcat);
  }
}

//#endregion

//#region menu cart dinamico
function menu_cart_dinamico() {
  let li = document.getElementById("menu_cart");
  let newListProduct = JSON.parse(localStorage.getItem("nuevolistado"));
  for (const producto of newListProduct) {
    let contenedor = document.createElement("div");
    // contenedor.setAttribute(id,id);
    contenedor.setAttribute("class", "column is-3 mx-2 mb-1 elimina");
    //Definimos el innerHTML del eboxmialemento con una plantilla de texto
    contenedor.innerHTML =
      `
            <div class='box boxmia' >
                <img src='${producto.image}' alt='' style='opacity:1;'>
                <h2 class='title is-size-5'>${producto.name}</h2>
                <h3 class='subtitle is-size-6'>${producto.description}​</h3>
                <p> Precio por kg: ${producto.precio}</p>
                <div class='has-text-centered'>
                <button class='button btnadd${producto.id}' id = 'Add${producto.id}'>Agregar</button>
                </div>
                <div class = 'has-text-centered ' >
                    <button id ='btnResta${producto.id}'> - </button>
                    <!--Le asigno id unica, mezclo texto con $llave para que todos los inputs y todos los button tenga id diferente--> 
                    <input  id="Cant${producto.id}" value = 0>
                    </input> 
                    <button id ='btnSumar${producto.id}' > + </button> 
                </div>
            </div>`;
    // document.body.appendChild(contenedor);
    document.getElementById("menu_cart").appendChild(contenedor)
    // habilitabtn();
  }
}

function suma_btn() {
  //muy bien el forEach, aca estás recorriendo todo tu array
  productList.forEach(product => {
    //Capturo el btn sumar id de cada elemento
    let btnSumar = document.getElementById(`btnSumar${product.id}`)
    //asigno evento a ese boton
    btnSumar.addEventListener('click', (e) => {
      //sumatoria es igual al input, que arranca el value = 0 
      let sumatoria = document.getElementById(`Cant${product.id}`)
      //me aseguro que funciona el evento (desp borrar)
      console.log("funciona");
      //no hace falta usar el sumaCant, le pongo ++ al .value y listo
      return sumatoria.value++
      // alert(e.target)
    });
  });
}



function resta_btn() {
  //muy bien el forEach, aca estás recorriendo todo tu array
  productList.forEach(product => {
    //Capturo el btn sumar id de cada elemento
    let btnResta = document.getElementById(`btnResta${product.id}`)
    //asigno evento a ese boton
    btnResta.addEventListener('click', (e) => {
      //sumatoria es igual al input, que arranca el value = 0 
      let sumatoriaa = document.getElementById(`Cant${product.id}`)
      //me aseguro que funciona el evento (desp borrar)
      console.log("resta");
      //no hace falta usar el sumaCant, le pongo ++ al .value y listo
      sumatoriaa.value--
      // alert(e.target)
    });
  });
}
//#endregion



//#region Funciones De Carrito
let carrit = [];

function addtocart() {

  // productList.forEach(product => {
  for (const product of productList) {
    //Capturo el add id de cada elemento
    let addtocart = document.getElementById(`Add${product.id}`)
    //asigno evento a ese boton
    addtocart.addEventListener('click', (e) => {
      let addValue = document.getElementById(`Cant${product.id}`);
      carrit.push({ idProduct: product.id, value: addValue.value, 
        nombre: product.name, precioTotal: product.precio * addValue.value });
      // console.log(carrit)
    });
  }
}


function muestraCarrito() {

  // 
/*  busco todos los elementos que contengan el elemento Add */
  for (const product of productList) {
    let addtocart = document.getElementById(`Add${product.id}`)
    //asigno evento a ese boton
    addtocart.addEventListener('click', (e) => {
      /*en la funcion callback genero un for of para que me 
      recorra el array "carrit" que es el que guarda cada vez 
      que se agrega un nuevo item al carrito */
      console.log(carrit);
      let limpiaCarr = document.getElementById('cart');
      limpiaCarr.innerHTML = '';   
      for (const carr of carrit){
        let insertaCarrito = document.createElement("div");
        insertaCarrito.innerHTML = `<p> Producto: ${carr.nombre}  Total = ${carr.precioTotal  }  <br> 
          cantidad comprada=  ${carr.value}
        </p>`
        limpiaCarr.appendChild(insertaCarrito)
      }
  });
  }
}

function MenuCategoria() {
  // let cat = document.getElementById("menu_navbar");
  for (const categ of categoryList) {
    let contcat = document.createElement("a")
    contcat.setAttribute("class", "Hoverstyle navbar-item");
    contcat.innerHTML = `
                <span>${categ.name}</span>
        `
    document.getElementById("cart").appendChild(contcat);
  }
}

//#endregion





function listaCategoria() {
    let abm = document.getElementById("categ");
  for (const cat of categoryList){
    let insertaCat = document.createElement("option");
    insertaCat.innerHTML = `${cat.name}`
    document.getElementById('categ').appendChild(insertaCat)
  } 
}


//#region UserFunctions
function Alta(){
  let insertCuerpoAlta = document.createElement("div");
  insertCuerpoAlta.setAttribute("id", "pruebaSub" );
  insertCuerpoAlta.innerHTML = `
    <label> Ingrese el nombre del producto </label> 
    <input class="input is-danger" type="text" placeholder="Ingrese nombre producto" id = "nameAlta" value="">

    <label> Ingrese la descripcion del producto </label> 
    <input class="input is-danger" type="text" placeholder="Descripcion" id = "descriptionAlta" value="">

    
    <label> Ingrese imagen </label> 
    <input class="input is-danger" type="text" placeholder="imagen url" id = "imageAlta" value="">
    
    <label> Ingrese precio de  producto </label> 
    <input class="input is-danger" type="text" placeholder="precio" id = "priceAlta" value="">
    
    <label> Ingrese stock </label> 
    <input class="input is-danger" type="text" placeholder="stock" id = "stockAlta" value="">

    <div class="control">
    <button class="button is-link" id = "btnSubmitconClick" >Submit</button>
  </div>
  
  `;
  document.getElementById('Altatexto').appendChild(insertCuerpoAlta);

}

let JSONListaprod

function submitProductoNuevo(){

let registraAlta = document.getElementById('btnSubmitconClick');
  registraAlta.addEventListener('click' ,  (e) => {
        //Cancelamos el comportamiento del evento
        e.preventDefault();
        //Obtenemos el elemento desde el cual se disparó el evento
        let id = productList.length;
        // let form_Alta = e.target;
        let nombreAlta = document.getElementById('nameAlta');
        let descriptionAlta = document.getElementById('descriptionAlta');
        let imageAlta = document.getElementById('imageAlta');
        let priceAlta = document.getElementById('priceAlta') ;
        let stockAlta = document.getElementById('stockAlta')
        let productoAlta = new Product(id , nombreAlta.value, descriptionAlta.value, imageAlta.value, priceAlta.value, stockAlta.value);
        productList.push(productoAlta);
        console.log(productList)
        JSONListaprod = JSON.stringify(productList);
        localStorage.setItem("nuevolistado",JSONListaprod)
        alert("Creado con exito!")
        let sub = document.getElementById('formAlta');
  } )
}

let IsStoraged =  [];
/*
function Modificacion(){
  IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  if (IsStoraged != undefined )
  {
      let muestraPRoductaModificar  = document.getElementById('selecttoModify');
      for (const storage of IsStoraged){
        let muestraStorage = document.createElement("option");
        muestraStorage.setAttribute("value", `${storage.id}` );
        muestraStorage.innerHTML = `<span id = "valuestorage">${storage.name} </span>`
        muestraPRoductaModificar.appendChild(muestraStorage);
      }
      let showProductsToModify = document.getElementById(`selecttoModify`);
        showProductsToModify.addEventListener('change', (muestraIS)=>
        {
          let idValue = muestraIS.target.value
          let insertaModificacion = document.getElementById('ModificacionObjeto')
          insertaModificacion.innerHTML = `
          <div id = 'idStorageToModify'			>
          
          <input value='${IsStoraged[idValue].id}'			id='idtoModify'				></input>
          <input value='${IsStoraged[idValue].name}'			id='Modifyname'				></input>
          <input value='${IsStoraged[idValue].description}'	id='Modifydescription'		> </input>
          <input value='${IsStoraged[idValue].image}'			id='Modifyimage'				> </input>
          <input value='${IsStoraged[idValue].precio}'			id='Modifyprice'				> </input>
          <input value='${IsStoraged[idValue].stock}'			id='Modifystock'				> </input>
            <div class="control">
            <button class="button is-link" id = 'Modificarbtn' >Modificar</button>
          </div>
          </div>`;      
          
        })
      
      
  } else 
  {
        let muestraPRoductaModificar  = document.getElementById('selecttoModify');
        for (const prodModif  of productList){
          let muestraStorage = document.createElement("option");
          muestraStorage.innerHTML = `${prodModif.name}`
          muestraPRoductaModificar.appendChild(muestraStorage)
        }
  }



}
///////////////////////////// No puedo hacer funcionar la modificacion a un elemento en particular en el localStorage, me cambia todos los resultados

function NuevaModificacion(){
  let registraModificacion = document.getElementById('ModificacionObjeto')
  console.log(registraModificacion)
  registraModificacion.addEventListener('click' ,  (e) => 
  {
    //Cancelamos el comportamiento del evento
    e.preventDefault();
    //Obtenemos el elemento desde el cual se disparó el evento
    let id = document.getElementById('idtoModify');
    let nombremodify = document.getElementById('Modifyname');
    let descriptionModify = document.getElementById('Modifydescription');
    let imageModify = document.getElementById('Modifyimage');
    let priceModify = document.getElementById('Modifyprice') ;
    let stockModify = document.getElementById('Modifystock');
    id_obj = id.value
    let ModificarLocalStorage = {id: id_obj , name: nombremodify, description: descriptionModify, image:imageModify , precio:priceModify , stock: stockModify }
    let toJSON = JSON.stringify(ModificarLocalStorage)
    let newListProducttoMOdify = JSON.parse(localStorage.getItem("nuevolistado"));
    localStorage.setItem("nuevolistado", toJSON )
    console.log(toJSON)
  })
}


*/
function eliminaproductos(){
  IsStoraged = JSON.parse(localStorage.getItem("nuevolistado"));
  if (IsStoraged != undefined )
  {
      let muestraPRoductaModificar  = document.getElementById('selecttodele');
      for (const storage of IsStoraged){
        let muestraStorage = document.createElement("option");
        muestraStorage.setAttribute("value", `${storage.id}` );
        muestraStorage.innerHTML = `<span id = "valuestorage">${storage.name} </span>`
        muestraPRoductaModificar.appendChild(muestraStorage);
      }
      let showProductsToModify = document.getElementById(`selecttodele`); 
        showProductsToModify.addEventListener('click', (muestraIS)=>
        {
          let idValue = muestraIS.target.value
          let insertaModificacion = document.getElementById('eliminaObjeto')
          insertaModificacion.innerHTML = `
          <div id = 'idStorageToModify'			>
          
          <input value='${IsStoraged[idValue].id}'			id='idtoModify'				disabled></input>
          <input value='${IsStoraged[idValue].name}'			id='Modifyname'				disabled></input>
          <input value='${IsStoraged[idValue].description}'	id='Modifydescription'		disabled> </input>
          <input value='${IsStoraged[idValue].image}'			id='Modifyimage'				disabled> </input>
          <input value='${IsStoraged[idValue].precio}'			id='Modifyprice'				disabled> </input>
          <input value='${IsStoraged[idValue].stock}'			id='Modifystock'				disabled> </input>
            <div class="control">
            <button class="button is-link" id = 'Eliminabtn' >Eliminar</button>
          </div>
          </div>`;      
          // console.log(idValue)
          eliminaArrayLocStor(idValue)
        })
      
  } else 
  {
        let muestraPRoductaModificar  = document.getElementById('<selecttodele>');
        for (const prodModif  of productList){
          let muestraStorage = document.createElement("option");
          muestraStorage.innerHTML = `${prodModif.name}`
          muestraPRoductaModificar.appendChild(muestraStorage)
        }
  }

}

function eliminaArrayLocStor(idValue){
let btneliminar = document.getElementById('Eliminabtn');
btneliminar.addEventListener('click', () =>{ 
let objlocalStorage = JSON.parse(localStorage.getItem("nuevolistado"))
let indiceArray = objlocalStorage.findIndex(el => el.id == idValue)
objlocalStorage.splice(indiceArray,1)
let UPdateLocSto = JSON.stringify(objlocalStorage)
localStorage.setItem("nuevolistado",UPdateLocSto)
})
}

//#endregion

//#region Filtros a validar
  // Filtro lateral
function menorprecio() {
  //Ordena por mayor precio
  let boton = document.getElementById("menorprecio")
  boton.addEventListener("click", respuestaClick)
  console.log(boton)
  function respuestaClick() {
    let element = document.getElementById("cart");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    productList.sort((a, b) => {
      if (a.precio < b.precio) {
        return 1
      }
      if (a.precio > b.precio) {
        return -1;
      }
      return 0
    })
    menu_cart_dinamico();
  }
}

function mayorprecio() {

  //  Ordena de menor a mayor precio

  boton2 = document.getElementById("mayorprecio")
  boton2.addEventListener("click", clickMayorprecio)
  console.log(boton2)
  function clickMayorprecio() {
    boton = 0;
    let element = document.getElementById("cart");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    productList.sort((a, b) => {
      if (a.precio > b.precio) {
        return 1
      }
      if (a.precio < b.precio) {
        return -1;
      }
      return 0
    })
    menu_cart_dinamico();
  }
}



//#endregion

llogin(); 



function footer () {
  let footer = document.getElementById('footer')
  footer.innerHTML = `<div id='NewFooter'>
    <p> Pagina creada por <span>Matias Rearte</span></p>
  </div>`
}

footer();

//#region Region

// if (Menu === 1) {
//   let Nombre = Inicio();
//   let Validate = agregaCarrito();
//   if (Validate.toLowerCase() == 'si') { // 'SI' || Validate == 'si' || Validate == 'Si') {
//     for (let i = 1; i <= 5; i++) {
//       let corteCarne = prompt("Mucho gusto " + Nombre + " que corte estas buscando?");
//       let corteCarnearreglo = corteCarne.charAt(0).toUpperCase() + corteCarne.slice(1).toLowerCase();
//       const carne = productList.filter
//         (
//           (el) => el.name.includes(corteCarnearreglo)
//         );
//       if (carne.length != 0) {
//         if (carne[0].name != []) {
//           compra(carne[0].name);
//           let validate = prompt("Desea seguir comprando?");
//           if (validate.toLowerCase() == "si") {
//             let resto = 5 - i;
//             alert("Usted puede agregar hasta 5 items. Quedan " + resto + "intentos mas para comprar");
//             continue;
//           } else {
//             alert("Vuelva pronto!")
//             i = 6;
//             break;
//           }
//         } else {
//           i = 6;
//           break;
//         }
//       } else {
//         alert("no tenemos stock de ese producto");
//         continue;
//       }
//     }
//   }
//   else {
//     alert(Nombre + " Vuelva pronto!");
//   }

// } else if (Menu === 2) {

//   // Menu productos
//   let MenuUsuario = parseInt(prompt("Seleccione la opcion que desea ejecutar:  \n 1-Consulta de productos \n 2-Alta de productos \n 3-Eliminacion de productos \n 4-Modificacion de productos \n 5-Salir"));
//   switch (MenuUsuario) {
//     case 1:
//       // code block
//       let i = 0;
//       for (products of productList) {
//         alert(`- ${productList[i].name} , precio:  ${productList[i].precio} , stock: ${productList[i].stock} \n`)
//         i++
//       }
//       break;
//     case 2:
//       // Alta de productos

//       let nombre = prompt("Ingrese nuevo articulo");
//       let indice = consultaNombreProducto(nombre);
//       if (indice > 0) {
//         alert(`${nombre} ya se encuentra en stock`)
//         break;
//       } else {


//         let description = " description";
//         let image = "Imagen";
//         let precio = parseInt(prompt("Ingrese el precio"));
//         let stock = parseInt(prompt("Ingrese stock para el producto"));
//         let alta = prompt(`Se dara de alta el producto ${nombre} con un precio de ${precio} y stock de: ${stock} `)
//         if (alta == 'si') {
//           let producto = new Product(nombre, description, image, precio, stock);
//           productList.push(producto);
//           console.log(productList)

//           //productList.push( Product { name: nombre, description: description, image: image, precio: precio, stock: stock })
//         } else {
//           break;
//         }
//       }
//       break;
//     case 3:
//       // Eliminar stock
//       let elimina = prompt("Ingrese articulo a eliminar: ");
//       let indiceelimina = consultaNombreProducto(elimina);
//       if (indiceelimina > 0) {
//         productList.splice(indiceelimina, 1);
//         console.log(productList);
//         break;
//       } else {
//         alert(`${elimina} no se encuentra en stock`)
//       }

//       break;
//     case 4:
//       // code block
//       let modifica = prompt("Ingrese articulo a modificar el stock: ");
//       let indicemodifica = consultaNombreProducto(modifica);
//       if (indicemodifica > 0) {
//         let stock = parseInt(prompt(`Ingrese nuevo stock`))
//         productList[indicemodifica].stock = stock;
//         console.log(productList);
//         break;
//       } else {
//         alert(`${modifica} no se encuentra en stock`)
//       }

//       break;
//   }
// } else {
//   alert("ingrese opcion deseada");
// }

//#endregion