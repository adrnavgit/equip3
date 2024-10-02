//inicializa los envíos desde el localStorage
let envios = JSON.parse(localStorage.getItem('envios')) || [];
let idCounter = envios.length ? Math.max(...envios.map(e => e.id)) + 1 : 1;

function mostrarTabla(){
    const tablaEnvios = document.getElementById('tablaEnvios');
    if (envios.length > 0) {
        tablaEnvios.style.display = 'table'; //muestra la tabla
    }
    else{
        tablaEnvios.style.display = 'none'; //oculta la tabla
    }
}

function addEnvio(event){
    event.preventDefault(); //eviita que se recargue la página

    const cliente = document.getElementById('cliente').value;
    const producto = document.getElementById('producto').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = parseInt(document.getElementById('cantidad').value, 10);
    const idProducto = parseInt(document.getElementById('id').value, 10);
    const estado = document.getElementById('estado').value;
    const operario = document.getElementById('operario').value;
    const transportista = document.getElementById('transportista').value;
    const fecha = new Date().toLocaleString();          //fecha y hora del momento en el que se hace el envío

    //valida que todos los campos requeridos estén completos
    if (!cliente || !producto || !descripcion || !cantidad || !idProducto || !estado || !operario || !transportista) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    //carga todos los envíos desde localStorage
    envios = cargarEnvios();

    //sirve para verificar si ya existe un envío con el mismo id de producto
    const idExistente = envios.some(envio => envio.idProducto === idProducto);
    if (idExistente) {
        alert("Ya existe una orden de envío con este ID!");
        return;
    }

    //crear el objeto llamado envio
    const envio = {
        id: idCounter++,
        cliente,
        producto,
        descripcion,
        cantidad,
        idProducto,
        estado,
        operario,
        fecha,
        transportista
    };

    //guarda el objeto envio en el array y en el localStorage
    envios.push(envio);
    localStorage.setItem('envios', JSON.stringify(envios));

    //actualiza la tabla, resetea el formulario y muestra la tabla
    updateTable();
    document.getElementById('formEnvio').reset();
    mostrarTabla();
}

function cargarEnvios(){
    //carga los envíos desde localStorage
    return JSON.parse(localStorage.getItem('envios')) || [];
}

//sirve para actualizar la tabla
function updateTable(){
    const tbody = document.querySelector('#tablaEnvios tbody');
    tbody.innerHTML = ''; //limpia la tabla ya existente

    //vuelve a cargar los envíos desde localStorage y los almacena en una constante
    const enviosActualizados = cargarEnvios();

    enviosActualizados.forEach(envio => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${envio.id}</td>
            <td>${envio.cliente}</td>
            <td>${envio.producto}</td>
            <td>${envio.descripcion}</td>
            <td>${envio.cantidad}</td>
            <td>${envio.idProducto}</td>
            <td>${envio.estado}</td>
            <td>${envio.operario}</td>
            <td>${envio.fecha}</td>
            <td>${envio.transportista}</td>
        `;
        tbody.appendChild(row);
    });
    mostrarTabla();
}

//función que vacia todos los campos del formulario
function vaciarCampos(){
    document.getElementById('cliente').value = '';
    document.getElementById('producto').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('id').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('operario').value = '';
    document.getElementById('transportista').value = '';
}

//evento que maneja el formulario para que guarde los datos al darle al botón
document.getElementById('formEnvio').addEventListener('submit', addEnvio);

/*función que se ejecuta cuando se carga la página,
*básicamente vacía el formulario, actualiza la 
*tabla y la muestra en caso de que tenga datos
*/
document.addEventListener('DOMContentLoaded', function (){
    vaciarCampos();
    updateTable();
    mostrarTabla();
});