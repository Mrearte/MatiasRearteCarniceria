
    let bienvenida = document.getElementsByTagName("body");
            //Definimos el innerHTML del eboxmialemento con una plantilla de texto
        bienvenida.innerHTML = ` `;
        document.body.append(bienvenida);
        
        let login =  document.createElement("div") 
        document.getElementById("Login");
        login.innerHTML =
            `
            <div class="pantallaLogin">
            <h1>Bienvenidos a la Carniceria</h1>
            <img src="512.png" alt="">
            <form id="formulario">
                <select name="country">
                    <option value="Usuario">Usuario</option>
                    <option value="Cliente">Cliente</option>
                </select>
            <input type="submit" value="Enviar">
            </form> 
            </div>
            `;
        document.getElementById("Login").appendChild(login);
function llogin()
{
    let miFormulario = document.getElementById("formulario");
    miFormulario.addEventListener("submit", Bienvenida_form);


    function Bienvenida_form(e)
    {
        //Cancelamos el comportamiento del evento
        e.preventDefault();
        //Obtenemos el elemento desde el cual se disparó el evento
        let formulario_bienvenida = e.target
        // Validacion usuario o cliente
        if (formulario_bienvenida.children[0].value == "Usuario" ) 
        {
            let elimina = document.getElementById('Login');
            elimina.classList.add('is-hidden');
            let remo = document.getElementById('User')
            remo.classList.remove('is-hidden')
            ABM();


        } else 
        {
            let elimina = document.getElementById('Login');
            elimina.classList.add('is-hidden');
            let remo = document.getElementById('webcomplete')
            remo.classList.remove('is-hidden')
            MenuCategoria();
            menu_cart_dinamico();
            suma_btn();
            resta_btn();

        console.log("ho,a chiche");  
        }
    }    
}

llogin();

// Bienvenida_form();


function MenuCategoria() {
    // let cat = document.getElementById("menu_navbar");
    for (const categ of categoryList) {
        let contcat = document.createElement("a")
        contcat.setAttribute("class","Hoverstyle navbar-item" );
        contcat.innerHTML = `
                <span>${categ.name}</span>
        `
        document.getElementById("navbarcategory").appendChild(contcat);
    }
}






function Product(id, name, description, image, stock, precio, category) {
    this.id = id
    this.name = name
    this.description = description
    this.image = image
    this.stock = stock
    this.precio = precio
    this.category = category
}

const Product1 = new Product(0,"Carne Picada", "Carne picada de nuestra carniceria", "menu-cart/carnepicada.jpg", 100, 50, "Res");
const Product2 = new Product(1,"Pollo", "De nuestra granja el mejor pollo", "menu-cart/pollo.jpg", 100, 100, "Granja");
const Product3 = new Product(2,"Asado", "Tira de asado de nuestra carniceria", "menu-cart/asado.jpg", 100, 75, "Res");
const Product4 = new Product(3,"Nalga", "nalga de nuestra carniceria", "menu-cart/nalga.jpg", 100, 300, "Res");
const Product5 = new Product(4,"Chorizo", "chorizos....", "menu-cart/chori.jpg", 100, 300, "Embutidos");

const productList = [Product1, Product2, Product3, Product4,Product5];


function Category(id, name) {
    this.id = id
    this.name = name
}

const Category0 = new Category(0, "Res");
const Category1 = new Category(1, "Granja");
const Category2 = new Category(2, "Cerdo");
const Category3 = new Category(3, "Embutidos");
const Category4 = new Category(4, "Promociones");
// const productList = [Product1, Product2, Product3, Product4];
const categoryList = [Category0, Category1, Category2, Category3, Category4];






let contador = 0


function compra(corteCarne) {
    let cantidad = parseInt(prompt("Cuantos kg de " + corteCarne + " deseas comprar?"));
    const indice = productList.findIndex
        (
            (el) => el.name.includes(corteCarne)
        );
    let stock = productList[indice].stock
    if (cantidad > 0 && cantidad < stock) {
        productList[indice].stock -= cantidad;

        let precioTotal = productList[indice].precio * cantidad;
        alert(`Su compra de ${productList[indice].name} , por un total de ${cantidad} tiene un valor total de: ${precioTotal}`)
    } else {
        alert(`el stock para este producto es: ${productList[indice].stock}, ingrese una cantidad correcta`);
    }
}

function Inicio() {
    let Nombre = prompt("Hola que tal! Me dirias tu nombre?");
    return Nombre
}

function agregaCarrito() {
    let Validate = prompt("Deseas agregar algo a tu carrito?");
    return Validate;
}

function incorrecta() {
    alert("La cantidad es incorrecta pruebe nuevamente");
}

function fin() {
    alert("Gracias por su compra");
    i = + 100;
}




function consultaNombreProducto(nombre) {
    let nombrearreglo = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    //   const validanombre = productList.find ((el) => el.name === nombre);
    const indice = productList.findIndex((el) => el.name.includes(nombrearreglo));
    return indice;
}


// html dinamico 

function MenuCategoria() {
    // let cat = document.getElementById("menu_navbar");
    for (const categ of categoryList) {
        let contcat = document.createElement("a")
        contcat.setAttribute("class","Hoverstyle navbar-item " );
        contcat.innerHTML = `
                <span>${categ.name}</span>
        `
        document.getElementById("navbarcategory").appendChild(contcat);
    }
}



// menu cart dinamico
function menu_cart_dinamico() {
    let li = document.getElementById("menu_cart");
    for (const producto of productList) {
        let contenedor = document.createElement("div");
        // contenedor.setAttribute(id,id);
        contenedor.setAttribute("class", "column is-3 mx-2 mb-1 elimina");
        //Definimos el innerHTML del eboxmialemento con una plantilla de texto
        contenedor.innerHTML =
            `
            <div class='box boxmia'>
                <img src='${producto.image}' alt='' style='opacity:1;'>
                <h2 class='title is-size-5'>${producto.name}</h2>
                <h3 class='subtitle is-size-6'>${producto.description}​</h3>
                <p> Precio por kg: ${producto.precio}</p>
                <div class='has-text-centered'>
                <button class='button btn-dsp-agregar' class = 'Add'>Agregar</button>
                </div>
                <div class = 'has-text-centered ' >
                    <button id ='btnResta${producto.id}'  > - </button>
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
function suma_btn(){
//muy bien el forEach, aca estás recorriendo todo tu array
productList.forEach(product => {
    //Capturo el btn sumar id de cada elemento
    let btnSumar = document.getElementById(`btnSumar${product.id}`)
    //asigno evento a ese boton
    btnSumar.addEventListener('click', (e)=> {
        //sumatoria es igual al input, que arranca el value = 0 
        let sumatoria = document.getElementById(`Cant${product.id}`)
        //me aseguro que funciona el evento (desp borrar)
        console.log("funciona");
        //no hace falta usar el sumaCant, le pongo ++ al .value y listo
        return sumatoria.value++
    // alert(e.target)
    }) ;
});
}



function resta_btn(){
//muy bien el forEach, aca estás recorriendo todo tu array
productList.forEach(product => {
    //Capturo el btn sumar id de cada elemento
    let btnResta = document.getElementById(`btnResta${product.id}`)
    //asigno evento a ese boton
    btnResta.addEventListener('click', (e)=> {
        //sumatoria es igual al input, que arranca el value = 0 
        let sumatoriaa = document.getElementById(`Cant${product.id}`)
        //me aseguro que funciona el evento (desp borrar)
        console.log("resta");
        //no hace falta usar el sumaCant, le pongo ++ al .value y listo
        sumatoriaa.value--
    // alert(e.target)
    }) ;
});
}



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





function ABM() {
    let abm = document.getElementById("User");
    abm.innerHTML = `<div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">From</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Name">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-left has-icons-right">
          <input class="input is-success" type="email" placeholder="Email" value="alex@smith.com">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
    </div>
  </div>
  
  <div class="field is-horizontal">
    <div class="field-label"></div>
    <div class="field-body">
      <div class="field is-expanded">
        <div class="field has-addons">
          <p class="control">
            <a class="button is-static">
              +44
            </a>
          </p>
          <p class="control is-expanded">
            <input class="input" type="tel" placeholder="Your phone number">
          </p>
        </div>
        <p class="help">Do not enter the first zero</p>
      </div>
    </div>
  </div>
  
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Department</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <div class="select is-fullwidth">
            <select>
              <option>Business development</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">Already a member?</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <label class="radio">
            <input type="radio" name="member">
            Yes
          </label>
          <label class="radio">
            <input type="radio" name="member">
            No
          </label>
        </div>
      </div>
    </div>
  </div>
  
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Subject</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input class="input is-danger" type="text" placeholder="e.g. Partnership opportunity">
        </div>
        <p class="help is-danger">
          This field is required
        </p>
      </div>
    </div>
  </div>
  
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Question</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Explain how we can help you"></textarea>
        </div>
      </div>
    </div>
  </div>
  
  <div class="field is-horizontal">
    <div class="field-label">
      <!-- Left empty for spacing -->
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <button class="button is-primary">
            Send message
          </button>
        </div>
      </div>
    </div>
  </div>`
    // for (const producto of productList) {
    //     let contenedor = document.createElement("div");
    //     // contenedor.setAttribute(id,id);
    //     contenedor.setAttribute("class", "column is-3 mx-2 mb-1 elimina");
    //     //Definimos el innerHTML del eboxmialemento con una plantilla de texto
    //     contenedor.innerHTML =
    //         `
    //         <div class='box boxmia'>
    //             <img src='${producto.image}' alt='' style='opacity:1;'>
    //             <h2 class='title is-size-5'>${producto.name}</h2>
    //             <h3 class='subtitle is-size-6'>${producto.description}​</h3>
    //             <p> Precio por kg: ${producto.precio}</p>
    //             <div class='has-text-centered'>
    //             <button class='button btn-dsp-agregar' class = 'Add'>Agregar</button>
    //             </div>
    //             <div class = 'has-text-centered ' >
    //                 <button id ='btnResta${producto.id}'  > - </button>
    //                 <!--Le asigno id unica, mezclo texto con $llave para que todos los inputs y todos los button tenga id diferente--> 
    //                 <input  id="Cant${producto.id}" value = 0>
    //                 </input> 
    //                 <button id ='btnSumar${producto.id}' > + </button> 
    //             </div>
    //         </div>`;
    //     // document.body.appendChild(contenedor);
    //     document.getElementById("menu_cart").appendChild(contenedor)
    //     // habilitabtn();
    // }
}





if (Menu === 1) {
    let Nombre = Inicio();
    let Validate = agregaCarrito();
    if (Validate.toLowerCase() == 'si') { // 'SI' || Validate == 'si' || Validate == 'Si') {
        for (let i = 1; i <= 5; i++) {
            let corteCarne = prompt("Mucho gusto " + Nombre + " que corte estas buscando?");
            let corteCarnearreglo = corteCarne.charAt(0).toUpperCase() + corteCarne.slice(1).toLowerCase();
            const carne = productList.filter
                (
                    (el) => el.name.includes(corteCarnearreglo)
                );
            if (carne.length != 0) {
                if (carne[0].name != []) {
                    compra(carne[0].name);
                    let validate = prompt("Desea seguir comprando?");
                    if (validate.toLowerCase() == "si") {
                        let resto = 5 - i;
                        alert("Usted puede agregar hasta 5 items. Quedan " + resto + "intentos mas para comprar");
                        continue;
                    } else {
                        alert("Vuelva pronto!")
                        i = 6;
                        break;
                    }
                } else {
                    i = 6;
                    break;
                }
            } else {
                alert("no tenemos stock de ese producto");
                continue;
            }
        }
    }
    else {
        alert(Nombre + " Vuelva pronto!");
    }

} else if (Menu === 2) {

    // Menu productos
    let MenuUsuario = parseInt(prompt("Seleccione la opcion que desea ejecutar:  \n 1-Consulta de productos \n 2-Alta de productos \n 3-Eliminacion de productos \n 4-Modificacion de productos \n 5-Salir"));
    switch (MenuUsuario) {
        case 1:
            // code block
            let i = 0;
            for (products of productList) {
                alert(`- ${productList[i].name} , precio:  ${productList[i].precio} , stock: ${productList[i].stock} \n`)
                i++
            }
            break;
        case 2:
            // Alta de productos

            let nombre = prompt("Ingrese nuevo articulo");
            let indice = consultaNombreProducto(nombre);
            if (indice > 0) {
                alert(`${nombre} ya se encuentra en stock`)
                break;
            } else {


                let description = " description";
                let image = "Imagen";
                let precio = parseInt(prompt("Ingrese el precio"));
                let stock = parseInt(prompt("Ingrese stock para el producto"));
                let alta = prompt(`Se dara de alta el producto ${nombre} con un precio de ${precio} y stock de: ${stock} `)
                if (alta == 'si') {
                    let producto = new Product(nombre, description, image, precio, stock);
                    productList.push(producto);
                    console.log(productList)

                    //productList.push( Product { name: nombre, description: description, image: image, precio: precio, stock: stock })
                } else {
                    break;
                }
            }
            break;
        case 3:
            // Eliminar stock
            let elimina = prompt("Ingrese articulo a eliminar: ");
            let indiceelimina = consultaNombreProducto(elimina);
            if (indiceelimina > 0) {
                productList.splice(indiceelimina, 1);
                console.log(productList);
                break;
            } else {
                alert(`${elimina} no se encuentra en stock`)
            }

            break;
        case 4:
            // code block
            let modifica = prompt("Ingrese articulo a modificar el stock: ");
            let indicemodifica = consultaNombreProducto(modifica);
            if (indicemodifica > 0) {
                let stock = parseInt(prompt(`Ingrese nuevo stock`))
                productList[indicemodifica].stock = stock;
                console.log(productList);
                break;
            } else {
                alert(`${modifica} no se encuentra en stock`)
            }

            break;
    }
} else {
    alert("ingrese opcion deseada");
}
