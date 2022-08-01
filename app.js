const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')


let carrito = []





document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    vaciarElCarrito(`Carrito Vacio`)
    actualizarCarrito()
})




stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `<div class="col-12 mb-2"
                    <div class="card">
                    <img src="${producto.img}" class="card-img-top" alt="imagen">
                    <div class="card-body">
                    <h5 class="card-title"><strong>${producto.nombre}</strong></h5>
                    <p class="card-text">${producto.desc}</p>
                    <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
                    <button id="agregar${producto.id}" class="btn btn-primary boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
                    </div> 
                    </div>
  </div>
   
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        agregarProdAlCarrito(`Se agrego ${producto.nombre} al carrito`)

    })
})

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }

    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)


}

const agregarProdAlCarrito = (mensaje) => {
    Swal.fire({
        icon: 'success',
        position: 'center',
        title: mensaje,
        showConfirmButton: false,
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        background: '#D5F1E5',
        color: '#151515',
    })
}
const vaciarElCarrito = (mensaje) => {
    Swal.fire({
        icon: 'warning',
        position: 'center',
        title: mensaje,
        showConfirmButton: false,
        toast: true,
        timer: 4000,
        timerProgressBar: true,
        background: '#D5F1E5',
        color: '#151515',
    })
}