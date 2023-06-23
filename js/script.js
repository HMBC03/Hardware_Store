const wrapper = document.querySelector(".wrapperMini"); // Selecciona el elemento con la clase "wrapperMini"
const carousel = document.querySelector(".carouselMini"); // Selecciona el elemento con la clase "carouselMini"
const firstCardWidth = carousel.querySelector(".cardMini").offsetWidth; // Obtiene el ancho del primer elemento con la clase "cardMini" dentro del carousel
const arrowBtns = document.querySelectorAll(".wrapperMini i"); // Selecciona todos los elementos <i> dentro del elemento con la clase "wrapperMini"
const carouselChildrens = [...carousel.children]; // Obtiene todos los elementos hijos del carousel y los convierte en un array

let isDragging = false; // Bandera para indicar si se está arrastrando
let isAutoPlay = true; // Bandera para indicar si se reproduce automáticamente
let startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth); // Calcula la cantidad de tarjetas visibles en el carousel

// Inserta copias de las últimas tarjetas al inicio del carousel para el desplazamiento infinito
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Inserta copias de las primeras tarjetas al final del carousel para el desplazamiento infinito
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition"); // Agrega una clase para deshabilitar las transiciones del carousel
carousel.scrollLeft = carousel.offsetWidth; // Establece la posición de desplazamiento inicial para ocultar las tarjetas duplicadas en Firefox
carousel.classList.remove("no-transition"); // Remueve la clase para habilitar las transiciones del carousel

// Agrega event listeners a los botones de flecha para desplazar el carousel hacia la izquierda o la derecha
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true; // Indica que se ha comenzado a arrastrar
    carousel.classList.add("dragging"); // Agrega una clase para indicar que se está arrastrando
    startX = e.pageX; // Guarda la posición inicial del cursor
    startScrollLeft = carousel.scrollLeft; // Guarda la posición inicial de desplazamiento del carousel
}

const dragging = (e) => {
    if (!isDragging) return; // Si no se está arrastrando, retorna
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX); // Actualiza la posición de desplazamiento del carousel basado en el movimiento del cursor
}

const dragStop = () => {
    isDragging = false; // Indica que se ha dejado de arrastrar
    carousel.classList.remove("dragging"); // Remueve la clase que indica que se está arrastrando
}

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition"); // Agrega una clase para deshabilitar las transiciones del carousel
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth); // Realiza un desplazamiento al final del carousel si se encuentra en el inicio
        carousel.classList.remove("no-transition"); // Remueve la clase para habilitar las transiciones del carousel
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition"); // Agrega una clase para deshabilitar las transiciones del carousel
        carousel.scrollLeft = carousel.offsetWidth; // Realiza un desplazamiento al inicio del carousel si se encuentra en el final
        carousel.classList.remove("no-transition"); // Remueve la clase para habilitar las transiciones del carousel
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Si la ventana es más pequeña que 800 o la reproducción automática está desactivada, retorna
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500); // Realiza un desplazamiento automático del carousel cada 2500 ms
}
autoPlay();

carousel.addEventListener("mousedown", dragStart); // Agrega un event listener para el evento "mousedown" en el carousel
carousel.addEventListener("mousemove", dragging); // Agrega un event listener para el evento "mousemove" en el carousel
document.addEventListener("mouseup", dragStop); // Agrega un event listener para el evento "mouseup" en el documento
carousel.addEventListener("scroll", infiniteScroll); // Agrega un event listener para el evento "scroll" en el carousel
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId)); // Agrega un event listener para el evento "mouseenter" en el wrapper para detener la reproducción automática
wrapper.addEventListener("mouseleave", autoPlay); // Agrega un event listener para el evento "mouseleave" en el wrapper para reanudar la reproducción automática











var carritoVisible = false; // Variable que indica si el carrito de compras está visible o no

// Verificar el estado de carga del documento
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready); // Esperar a que el DOM se haya cargado completamente antes de llamar a la función 'ready'
} else {
    ready(); // El DOM ya se ha cargado, llamar directamente a la función 'ready'
}

function ready() {
    // Configurar eventos para los botones de eliminar item del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Configurar eventos para los botones de aumentar la cantidad de un item en el carrito
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Configurar eventos para los botones de disminuir la cantidad de un item en el carrito
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Configurar eventos para los botones de agregar items al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Configurar evento para el botón de pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

function pagarClicked() {
    // Función que se ejecuta cuando se hace clic en el botón de pagar
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra completada',
        showConfirmButton: false,
        timer: 1500
      })

    // Vaciar el carrito de compras
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }

    // Actualizar el total del carrito y ocultarlo
    actualizarTotalCarrito();
    ocultarCarrito();
}

function agregarAlCarritoClicked(event) {
    // Función que se ejecuta cuando se hace clic en un botón de agregar al carrito
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;

    // Agregar el item al carrito de compras
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    // Hacer visible el carrito de compras
    hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
    // Función que muestra el carrito de compras y ajusta el diseño
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    // Función que agrega un item al carrito de compras
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Verificar si el item ya está en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    // Crear el contenido HTML del item en el carrito
    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <button class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
  `;

    // Agregar el item al carrito de compras
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Configurar eventos para los botones de eliminar, aumentar y disminuir la cantidad del item en el carrito
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizar el total del carrito
    actualizarTotalCarrito();
}

function sumarCantidad(event) {
    // Función que incrementa la cantidad de un item en el carrito
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    // Función que disminuye la cantidad de un item en el carrito
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event) {
    Swal.fire({
        title: '¿Esta seguro?',
        text: "Se eliminara un producto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar.'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Producto eliminado de su carrito',
                'success'
            )
            // Función que elimina un item del carrito
            var buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            actualizarTotalCarrito();
            ocultarCarrito();
        }
    })

}

function ocultarCarrito() {
    // Función que oculta el carrito de compras si está vacío
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function actualizarTotalCarrito() {
    // Función que actualiza el total del carrito de compras
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    // Calcular el total sumando los precios de todos los items en el carrito
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }

    total = Math.round(total * 100) / 100;

    // Mostrar el total en el carrito de compras
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}
