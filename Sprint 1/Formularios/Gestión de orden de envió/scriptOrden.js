let ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];

// Crear la orden de envío
function crearOrden() {
    const nuevaOrden = obtenerDatosFormulario();

    const existeOrden = ordenes.some(orden => 
        orden.shipping_order_id === nuevaOrden.shipping_order_id && 
        orden.product_id === nuevaOrden.product_id
    );

    if (existeOrden) {
        alert("La orden de envío ya existe.");
    } else {
        ordenes[ordenes.length] = nuevaOrden;
        alert("Orden de envío creada.");
        guardarEnLocalStorage();
        vaciarFormulario();
        mostrarOrdenesEnPantalla();
    }
}

// Modificar la orden de envío
function modificarOrden(index) {
    const nuevaOrden = obtenerDatosFormulario();

    ordenes[index] = nuevaOrden;
    alert("Orden de envío modificada.");
    
    guardarEnLocalStorage();
    vaciarFormulario();
    mostrarOrdenesEnPantalla();
}

// Eliminar la orden de envío
function eliminarOrden(index) {
    ordenes.splice(index, 1); 
    alert("Orden de envío eliminada.");
    guardarEnLocalStorage();
    mostrarOrdenesEnPantalla();
}

// Mostrar las órdenes en pantalla como tabla
function mostrarOrdenesEnPantalla() {
    const listaOrdenes = document.getElementById('listaOrdenes');
    listaOrdenes.innerHTML = `
        <tr>
            <th>ID Envío</th>
            <th>ID Producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
        </tr>`; 

    // Bucle for en lugar de forEach
    for (let i = 0; i < ordenes.length; i++) {
        const orden = ordenes[i];
        const ordenHTML = `
            <tr>
                <td>${orden.shipping_order_id}</td>
                <td>${orden.product_id}</td>
                <td>${orden.quantity}</td>
                <td>
                    <button onclick="prepararModificacion(${i})">Modificar</button>
                    <button onclick="eliminarOrden(${i})">Eliminar</button>
                </td>
            </tr>`;
        listaOrdenes.innerHTML += ordenHTML;
    }
}

// Preparar la modificación de una orden
function prepararModificacion(index) {
    const orden = ordenes[index];
    document.getElementById('shippingOrderId').value = orden.shipping_order_id;
    document.getElementById('productId').value = orden.product_id;
    document.getElementById('quantity').value = orden.quantity;
    
    document.getElementById('crearOrden').style.display = 'none';
    const modificarBtn = document.getElementById('modificarOrden');
    modificarBtn.style.display = 'inline';
    modificarBtn.onclick = () => modificarOrden(index); 
}

// Obtener los datos del formulario
function obtenerDatosFormulario() {
    return {
        shipping_order_id: parseInt(document.getElementById('shippingOrderId').value),
        product_id: parseInt(document.getElementById('productId').value),
        quantity: parseInt(document.getElementById('quantity').value)
    };
}

// Vaciar el formulario
function vaciarFormulario() {
    document.getElementById('shippingOrderId').value = '';
    document.getElementById('productId').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('crearOrden').style.display = 'inline';
    document.getElementById('modificarOrden').style.display = 'none';
}

// Guardar en el Local Storage
function guardarEnLocalStorage() {
    localStorage.setItem('ordenes', JSON.stringify(ordenes));
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('crearOrden').addEventListener('click', crearOrden);
    mostrarOrdenesEnPantalla();
});
