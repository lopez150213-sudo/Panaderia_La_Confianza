// Variables globales para controlar los datos en memoria
let carrito = [];
let total = 0;

// ==========================================
// FUNCIÓN NUEVA: FILTRAR POR CATEGORÍAS (PESTAÑAS)
// ==========================================
function filtrarCategoria(categoria, botonTocado) {
    // 1. Quitamos el color activo de todos los botones de navegación
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // 2. Le ponemos el color activo únicamente al botón que presionó el usuario
    botonTocado.classList.add('active');

    // 3. Seleccionamos todos los bloques de productos por su categoría
    const productosDiarios = document.querySelectorAll('.cat-diario');
    const productosVelas = document.querySelectorAll('.cat-velas');

    // 4. Si el usuario tocó "Pan Diario"
    if (categoria === 'diario') {
        productosDiarios.forEach(p => p.classList.remove('hidden')); // Los muestra
        productosVelas.forEach(p => p.classList.add('hidden'));    // Oculta las velas
    } 
    // Si el usuario tocó "Velas y Rezos"
    else if (categoria === 'velas') {
        productosDiarios.forEach(p => p.classList.add('hidden'));    // Oculta el pan diario
        productosVelas.forEach(p => p.classList.remove('hidden')); // Muestra las velas
    }
}

// 1. FUNCIÓN PARA AGREGAR PRODUCTOS
function agregarAlPedido(nombreProducto, precio) {
    const avisoVacio = document.getElementById('carrito-vacio');
    if (avisoVacio) avisoVacio.remove();

    carrito.push({ nombre: nombreProducto, precio: precio });
    actualizarPantallaDelPedido();
}

// 2. FUNCIÓN PARA ELIMINAR UN PRODUCTO ESPECÍFICO
function quitarDelPedido(indice) {
    carrito.splice(indice, 1);
    actualizarPantallaDelPedido();
}

// 3. FUNCIÓN QUE REDIBUJA EL CARRITO Y RECALCULA EL TOTAL
function actualizarPantallaDelPedido() {
    const lista = document.getElementById('lista-pedido');
    lista.innerHTML = "";
    total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p id="carrito-vacio">Aún no has agregado productos.</p>';
        document.getElementById('total-precio').innerText = "0.00";
        return;
    }

    carrito.forEach((item, indice) => {
        total += item.precio;

        const nuevoElemento = document.createElement('li');
        nuevoElemento.style.display = "flex";
        nuevoElemento.style.justifyContent = "space-between";
        nuevoElemento.style.alignItems = "center";
        nuevoElemento.style.padding = "8px 0";

        const textoProducto = document.createElement('span');
        textoProducto.innerText = `• ${item.nombre} - C$ ${item.precio}.00`;

        const botonQuitar = document.createElement('button');
        botonQuitar.innerText = "❌";
        botonQuitar.style.background = "none";
        botonQuitar.style.border = "none";
        botonQuitar.style.cursor = "pointer";
        botonQuitar.style.fontSize = "0.9rem";
        
        botonQuitar.onclick = function() {
            quitarDelPedido(indice);
        };

        nuevoElemento.appendChild(textoProducto);
        nuevoElemento.appendChild(botonQuitar);
        lista.appendChild(nuevoElemento);
    });

    document.getElementById('total-precio').innerText = total.toFixed(2);
}

// 4. FUNCIÓN QUE ABRE EL WHATSAPP CON EL TEXTO ARMADO
function enviarPorWhatsApp() {
    if (carrito.length === 0) {
        alert("Por favor, agrega al menos un producto a tu pedido.");
        return;
    }

    // Pon aquí tu número de teléfono real (con código de país sin el +)
    const numeroPanaderia = "50588610963"; 

    let textoMensaje = "¡Hola Panadería El Buen Sabor! 🍞 Me gustaría hacer el siguiente pedido:\n\n";
    
    carrito.forEach(item => {
        textoMensaje += `- ${item.nombre} (C$ ${item.precio}.00)\n`;
    });

    textoMensaje += `\n💰 *Total a pagar:* C$ ${total.toFixed(2)}`;

    const mensajeFormateado = encodeURIComponent(textoMensaje);
    const urlWhatsApp = `https://wa.me/${numeroPanaderia}?text=${mensajeFormateado}`;

    window.open(urlWhatsApp, '_blank');
}