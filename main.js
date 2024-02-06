// array productos

let productos = [
    {
        id: 1,
        nombre: "producto 1",
        precio: 1000,
        imagen: "https://picsum.photos/400/250?random=1",
    },
    {
        id: 2,
        nombre: "producto 2",
        precio: 2000,
        imagen: "https://picsum.photos/400/250?random=2",
    },
    { 
        id: 3,
        nombre: "producto 3",
        precio: 3000,
        imagen: "https://picsum.photos/400/250?random=3",
    },
    {
        id: 4,
        nombre: "producto 4",
        precio: 1000,
        imagen: "https://picsum.photos/400/250?random=4",
    },
    {
        id: 5,
        nombre: "producto 5",
        precio: 2000,
        imagen: "https://picsum.photos/400/250?random=5",
    },
    {
        id: 6,
        nombre: "producto 6",
        precio: 3000,
        imagen: "https://picsum.photos/400/250?random=6",
    },
    {
        id: 7,
        nombre: "producto 7",
        precio: 2000,
        imagen: "https://picsum.photos/400/250?random=7",
    },
    {
        id: 8,
        nombre: "producto 8",
        precio: 3000,
        imagen: "https://picsum.photos/400/250?random=8",
    },
        
];

//funcion para crear card e insertarla en html
const crearProducto = () =>{
    let contenedor = document.getElementById("contenedor");
    productos.forEach((producto,indice) => {
        let card = document.createElement("div");
        card.classList.add("col-sm-12","col-lg-3", "mb-3");
        card.innerHTML = ` <div class="card" >
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <a href="#" class="btn btn-primary" onClick="agregarAlCarrito(${indice})">Agregar al Carrito</a>
        </div>
        </div>`;
        contenedor.appendChild(card);
    });
};

crearProducto();

let carrito=[]; //carrito

//funcion para validar si esta el producto en carrito suma cantidad, sino que lo agregue y lo inserte 
const agregarAlCarrito = (indice) =>{
    const indiceEncontradoCarrito = carrito.findIndex((elemento)=>{
        return elemento.id === productos[indice].id
    });
    if(indiceEncontradoCarrito === -1){ // si el producto no lo encontro pq no lo agregue antes, que lo agregue al carrito
        const productoAgregar = productos[indice]
        productoAgregar.cantidad = 1;// agrego propiedad cantidad al objeto y arranca en 1
        carrito.push(productoAgregar); // lo agrego al carrito
        crearCarrito();
    }else{
       carrito[indiceEncontradoCarrito].cantidad +=1;
        crearCarrito();
    }

    // despues de modificar el carrito, lo guardo en localStorage
    guardarCarritoEnLocalStorage();
};

// funcion para crear carrito con productos agregados y sobtotal
let total = 0;
let bannerCarrito = document.getElementById("carrito");

const crearCarrito = ()=>{
    bannerCarrito.className = "carrito";//clase carrito
    bannerCarrito.innerHTML = "";//para que se borre y se vuelva a mostrar c lo nuevo
    if(carrito.length > 0){
        carrito.forEach((producto,indice) => {
           // total = total + producto.precio * producto.cantidad;
            const carritoContainer = document.createElement("div");
            carritoContainer.className = "producto-carrito"; //clase productos carrito
            carritoContainer.innerHTML =`
            <img class="car-img" src="${producto.imagen}"/>
            <div class= "product-details">${producto.nombre}</div>
            <div class= "product-details">Cantidad: ${producto.cantidad}</div>
            <div class= "product-details">Precio: $ ${producto.precio}</div>
            <div class= "product-details">Subtotal: $ ${producto.precio * producto.cantidad}</div>
            <button class="btn btn-info" id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>
            `;      
            bannerCarrito.appendChild(carritoContainer);    
        });
        
        const totalCarrito = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        const totalContainer = document.createElement("div");
        totalContainer.className = "total-carrito";
        totalContainer.innerHTML=`<div class= "total"> TOTAL $ ${totalCarrito}</div>
        <button class="btn btn-info finalizar" id="finalizar" onClick="finalizarCompra()"> Finalizar Compra</button>
        `;
        bannerCarrito.appendChild(totalContainer);
    }else{
        bannerCarrito.classList.remove("carrito");
    }
};

//funcion para eliminar producto ya agregado en el carrito

const removeProduct = (indice) => {
    carrito.splice(indice, 1);//borrar un elemento de la posicion indice
    crearCarrito();//para actualizar el carrito

    // despues de modificar el carrito, lo guardo en localStorage
    guardarCarritoEnLocalStorage();
};

//funcion para finalizar la compra

const finalizarCompra = () =>{
    const total = document.getElementsByClassName("total")[0].innerHTML;
    bannerCarrito.innerHTML="";
    const comprafinalizada = `<div class="compra-finalizada">
    <p class="compra-parrafo"> La compra ya casi es tuya!, debes abonar un ${total}</p> 
    <div class="datos-cliente">
    <p class="datos-parrafo"> Complete el formulario con sus datos para coordinar la entrega</p>
    <button class="btn btn-info formulario" id="formulario" onclick="mostrarFormulario()"> FORMULARIO </button>
    </div>`;
    bannerCarrito.innerHTML = comprafinalizada;

    // despues de finalizar la compra, guardar en localStorage
    guardarCarritoEnLocalStorage();

     // despues de finalizar la compra, borra el carrito del localStorage
     localStorage.removeItem('carrito');

    
};

//funcion para formulario envio

const mostrarFormulario = () => {
    bannerCarrito.innerHTML = "";
    const formulario =`    
    <h2> DATOS PARA EL ENVÍO </h2>   
    <div class="contact_secction-container p-5 form-control">    
     <div class="row">    
       <div class="contact_secction_item mb-3  ">    
        <label>Nombre</label><br>   
        <input type="text" id="nombre" placeholder="Nombre" />    
       </div>    
      <div class="contact_secction_item mb-3 ">    
       <label>E-mail</label><br>    
       <input type="text" id="mail" placeholder="E-mail" />    
      </div>
      <div class="contact_secction_item mb-3 ">
       <label>Telefono</label><br>
       <input type="text" id="telefono" placeholder="Telefono" />
      </div>
       <div class="contact_secction_item mb-3 ">
       <label>Domicilio</label><br>
       <input type="text" id="domicilio" placeholder="Domicilio" />
       </div>
      <div class="contact-button"> 
       <button type="button" class="btn btn-info envio" onclick="mostrarMensaje()">Confirmar</button>
      </div>
     </div>
    </div>   
    `;
    bannerCarrito.innerHTML = formulario;
}

// funcion mensaje de compra realizada

const mostrarMensaje = () => {
    const nombreCliente = document.getElementById("nombre").value;
    const domicilioCliente = document.getElementById("domicilio").value;
    bannerCarrito.innerHTML = "";
    let mensaje = `<div class="mensaje-final">Gracias ${nombreCliente} por su compra. En 48hs recibira su pedido en ${domicilioCliente}`;
    bannerCarrito.innerHTML = mensaje;
};

///local storage

const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};


const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        crearCarrito(); 
    }
};


cargarCarritoDesdeLocalStorage();
