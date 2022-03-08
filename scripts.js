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
        contcat.setAttribute("class","Hoverstyle navbar-item" );
        contcat.innerHTML = `
                <span>${categ.name}</span>
        `
        document.getElementById("navbarcategory").appendChild(contcat);
    }
}

MenuCategoria();


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
                    <button> - </button> 
                    <input  class= 'Cant' value = 0>
                    </input> 
                    <button id =  '${producto.id}' > + </button> 
                </div>
            </div>`;
        // document.body.appendChild(contenedor);
        document.getElementById("menu_cart").appendChild(contenedor)
        // habilitabtn();
    }
}
function suma_btn(){
    let suma_cant = 0;
productList.forEach(product => {
    let suma_busca = document.getElementById(product.id) 
    suma_busca.addEventListener('click', (e)=> {
         let sumatoria = document.getElementById(product.id)
        suma_cant++ 
        sumatoria.innerHTML = suma_cant;
    // alert(e.target)
    }) ;
});

}

// function agrega_num(){
//     suma_cant++
//     console.log(suma_busca);
//     console.log(suma_cant);

// }
// }





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


menu_cart_dinamico();

suma_btn();
// Al hacer click + se debera sumar y despues agregar el buton agregar
// function habilitabtn(){
//         let sum = 0; 
// let agregabutton = document.getElementsByClassName("agrega_btn"); 
// agregabutton.addEventListener("click",agregacant);
// function agregacant(){
//         sum++;
//         let agbtn = document.getElementsByClassName('Add');
//         agbtn.classList.remove("btn-dsp-agregar");
//         let addcant = document.getElementsByClassName('Cant');
//         addcant.innerHTML = `${sum}`;
//         console.log(sum);
// }
// }

// Inicio de aplicacion 
//let Menu = parseInt(prompt("Menu \n 1-Cliente \n 2-Usuario"));



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
