//inicializar los movimientos desde el localStorage
let movements = JSON.parse(localStorage.getItem('movements')) || [];
let idCounter = movements.length ? Math.max(...movements.map(m => m.id)) + 1 : 1;

/*función que muestra u oculta la tabla
*dependiendo de si contiene movimientos o no
*/
function mostrarTabla(){
    const table = document.getElementById('movementsTable');
    if (movements.length > 0) {
        table.style.display = 'table'; //muestra la tabla si hay movimientos
    } else {
        table.style.display = 'none'; //oculta la tabla si no hay movimientos
    }
}

//función que agrega los movimientos
function addMovement(event){
    event.preventDefault(); //evita que se recargue la página

    const operator = document.getElementById('operator').value;
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const locationFrom = document.getElementById('locationFrom').value;
    const locationTo = document.getElementById('locationTo').value;
    const entity = document.getElementById('entity').value;
    /*si el movimiento es de configuracion, es 
    *decir, si se mueve un producto de una 
    *ubicación a otra,crea dos movimientos, 
    *primero el negativo y después el positivo
    */
    if (entity === 'Configuración'){         
        //crea un objeto movimiento negativo (extracción)
        const negativeMovement = {
            id: idCounter++,
            operator,
            product,
            quantity: -quantity,            //pone la cantidad en negativa
            locationFrom,
            locationTo,                 
            entity,
            timestamp: new Date().toLocaleString(),
        };
        //crea un objeto movimiento positivo (depósito)
        const positiveMovement = {
            id: idCounter++,
            operator,
            product,
            quantity: quantity,             //pone la cantidad positiva
            locationFrom,               
            locationTo,
            entity,
            timestamp: new Date().toLocaleString(),
        };

        //guardar ambos movimientos en el array
        movements.push(negativeMovement);
        movements.push(positiveMovement);
    }
    else{
        // Para envíos y recepciones, solo un movimiento
        const movement = {
            id: idCounter++,
            operator,
            product,
            quantity: entity === 'Enviamiento' ? -quantity : quantity, // Negativo para envío, positivo para recepción
            locationFrom: entity === 'Enviamiento' ? locationFrom : '', // Aplicar ubicación solo si es envío
            locationTo: entity === 'Recepción' ? locationTo : '', // Aplicar ubicación solo si es recepción
            entity,
            timestamp: new Date().toLocaleString(),
        };

        // Guardar el movimiento en el array
        movements.push(movement);
    }

    localStorage.setItem('movements', JSON.stringify(movements));
    updateTable();
    document.getElementById('movementForm').reset(); //resetea el formulario
}

//función que actualiza la tabla de movimientos
function updateTable(){
    const tableBody = document.querySelector('#movementsTable tbody');
    tableBody.innerHTML = '';       //limpia la tabla ya existente

    movements.forEach(movement => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movement.id}</td>
            <td>${movement.operator}</td>
            <td>${movement.product}</td>
            <td>${movement.quantity}</td>
            <td>${movement.locationFrom}</td>
            <td>${movement.locationTo}</td>
            <td>${movement.entity}</td>
            <td>${movement.timestamp}</td>
        `;
        tableBody.appendChild(row);
    });

    mostrarTabla();     //muestra u oculta la tabla después de cada actualización
}

//evento que maneja el formulario y añade el movimiento
document.getElementById('movementForm').addEventListener('submit', addMovement);

//función para limpiar el formulario al cargar la página
function vaciarCampos(){
    document.getElementById('operator').value = '';
    document.getElementById('product').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('locationFrom').value = '';
    document.getElementById('locationTo').value = '';
    document.getElementById('entity').value = '';
}

//limpia todos los campos al cargar la página y actualizar la tabla
document.addEventListener('DOMContentLoaded', function () {
    vaciarCampos();
    updateTable();
});