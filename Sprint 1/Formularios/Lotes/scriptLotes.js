let lots = JSON.parse(localStorage.getItem('lots')) || [];

// Crear un nuevo lot 
function crearLot() {
    const nuevoLot = obtenerDatosFormulario();

    if (lotExiste(nuevoLot.product_id)) {
        alert("El lot ya existe.");
    } else {
        lots.push(nuevoLot); 
        alert("Lot creado.");
        guardarEnLocalStorage();
        vaciarFormulario();
        mostrarLotsEnPantalla(); 
    }
}

// Modificar lot 
function modificarLot(index) {
    const datosModificados = obtenerDatosFormulario();

    lots[index] = datosModificados; 
    alert("Lot modificado.");
    guardarEnLocalStorage();
    vaciarFormulario();
    mostrarLotsEnPantalla(); 
}

// Eliminar un lot
function eliminarLot(index) {
    lots.splice(index, 1); 
    alert("Lot eliminado.");
    guardarEnLocalStorage();
    mostrarLotsEnPantalla(); 
}

// Mostrar los lots en pantalla como tabla
function mostrarLotsEnPantalla() {
    const listaLots = document.getElementById('listaLots');
    listaLots.innerHTML = ''; 

    // Bucle para añadir filas a la tabla
    for (let i = 0; i < lots.length; i++) {
        const lot = lots[i];
        const lotHTML = `
            <tr>
                <td>${lot.product_id}</td>
                <td>${lot.production_date}</td>
                <td>${lot.expiration_date}</td>
                <td>
                    <button onclick="prepararModificacion(${i})">Modificar</button>
                    <button onclick="eliminarLot(${i})">Eliminar</button>
                </td>
            </tr>`;
        listaLots.innerHTML += lotHTML;
    }
}

// Preparar la modificación de un lot
function prepararModificacion(index) {
    const lot = lots[index];
    document.getElementById('productId').value = lot.product_id;
    document.getElementById('productionDate').value = lot.production_date;
    document.getElementById('expirationDate').value = lot.expiration_date;

    
    document.getElementById('crearLot').style.display = 'none';
    const modificarBtn = document.getElementById('modificarLot');
    modificarBtn.style.display = 'inline';
    modificarBtn.onclick = () => modificarLot(index); 
}

// Obtener los datos
function obtenerDatosFormulario() {
    return {
        product_id: parseInt(document.getElementById('productId').value),
        production_date: document.getElementById('productionDate').value,
        expiration_date: document.getElementById('expirationDate').value
    };
}

// Verificar si el lot existe 
function lotExiste(product_id) {
    return lots.some(lot => lot.product_id === product_id);
}

// Vaciar formulario
function vaciarFormulario() {
    document.getElementById('productId').value = '';
    document.getElementById('productionDate').value = '';
    document.getElementById('expirationDate').value = '';

   
    document.getElementById('crearLot').style.display = 'inline';
    document.getElementById('modificarLot').style.display = 'none';
}

// Guardar en Local Storage
function guardarEnLocalStorage() {
    localStorage.setItem('lots', JSON.stringify(lots));
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('crearLot').addEventListener('click', crearLot);
    mostrarLotsEnPantalla(); 
});
