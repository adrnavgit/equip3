//valida el nombre o razon social
function validarNombre(){
    const usernameField = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');

    if(!usernameField.checkValidity()){
        if(usernameField.validity.valueMissing){
            usernameError.textContent = "El nombre es obligatorio.";
        }
        else if(usernameField.validity.patternMismatch){
            usernameError.textContent = "El nombre debe tener entre 1 y 50 caracteres, empezar por mayúscula y solo pueden ser letras.";
        }
        usernameField.focus();
        return false;
    }
    else{   
        usernameError.textContent = "";
        return true;
    }
}
//valida el domicilio
function validarDomicilio(){
    const domicilioField = document.getElementById('domicilio');
    const domicilioError = document.getElementById('domicilioError');

    if(!domicilioField.checkValidity()){
        if(domicilioField.validity.valueMissing){
            domicilioError.textContent = "El domicilio es obligatorio.";
        }
        else if(domicilioField.validity.patternMismatch){
            domicilioError.textContent = "El domicilio no es válido.";
        }
        domicilioField.focus();
        return false;
    }
    else{
        domicilioError.textContent = "";
        return true;
    }
}
//valida el DNI
function validarDNI(){
    const dniField = document.getElementById('dni');
    const dniError = document.getElementById('dniError');

    if(!dniField.checkValidity()){
        if(dniField.validity.valueMissing){
            dniError.textContent = "El DNI/NIF es obligatorio.";
        }
        else if(dniField.validity.patternMismatch){
            dniError.textContent = "El DNI/NIF no es válido.";
        }
        dniField.focus();
        return false;
    }
    else{
        dniError.textContent = "";
        return true;
    }
}
//valida el teléfono
function validarTelefono(){
    const telefonoField = document.getElementById('telefono');
    const telefonoError = document.getElementById('telefonoError');

    if(!telefonoField.checkValidity()){
        if(telefonoField.validity.valueMissing){
            telefonoError.textContent = "El teléfono es obligatorio.";
        }
        else if(telefonoField.validity.patternMismatch){
            telefonoError.textContent = "El teléfono no es válido.";
        }
        telefonoField.focus();
        return false;
    }
    else{
        telefonoError.textContent = "";
        return true;
    }
}
//valida el correo
function validarCorreo(){
    const correoField = document.getElementById('correo');
    const correoError = document.getElementById('correoError');

    if(!correoField.checkValidity()){
        if(correoField.validity.valueMissing){
            correoError.textContent = "El correo es obligatorio.";
        }
        else if(correoField.validity.patternMismatch){
            correoError.textContent = "El correo no es válido.";
        }
        correoField.focus();
        return false;
    }
    else{
        correoError.textContent = "";
        return true;
    }
}
/*reune todas las anteriores funciones y las pone
*junto a una variable para marcar el primer error
*/
function validar(){
    let primerError = null;     //almacena el primer error que dé en los campos

    if(!validarNombre() && !primerError) primerError = document.getElementById('username');
    if(!validarDomicilio() && !primerError) primerError = document.getElementById('domicilio');
    if(!validarDNI() && !primerError) primerError = document.getElementById('dni');
    if(!validarTelefono() && !primerError) primerError = document.getElementById('telefono');
    if(!validarCorreo() && !primerError) primerError = document.getElementById('correo');

    if(primerError){
        primerError.focus();    //hace focus en el primer campo incorrecto
        return false;
    }
    return true;

}
//carga y retorna el objeto clientes
function cargarClientes(){
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];    //coge los clientes almacenados en el local storage y los devuelve
    return clientes;
}
//guarda los clientes en el local storage
function guardarClientes(clientes){
    localStorage.setItem('clientes', JSON.stringify(clientes));     //guarda en un objeto el cliente
}
//actualiza toda la tabla con los nuevos clientes
function actualizarTabla(){
    const tabla = document.getElementById('clientesTable').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; //limpia toda la tabla antes de agregar todas las filas

    const clientes = cargarClientes(); //carga en una constante todos los clientes
    let numId = 0;

    //comprueba si hay clientes para decidir si mostrar la tabla
    if(clientes.length > 0){
        clientes.forEach((cliente, index) => { //por cada cliente crea una linea
            const nuevaFila = tabla.insertRow();
            //por cada campo añadido crea una columna
            nuevaFila.insertCell(0).textContent = numId += 1;
            nuevaFila.insertCell(1).textContent = cliente.nombre;
            nuevaFila.insertCell(2).textContent = cliente.domicilio;
            nuevaFila.insertCell(3).textContent = cliente.dni;
            nuevaFila.insertCell(4).textContent = cliente.telefono;
            nuevaFila.insertCell(5).textContent = cliente.correo;

            //crea el botón para modificar el cliente
            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Modificar';
            botonModificar.onclick = function() {
                modificarCliente(index);
            };
            nuevaFila.insertCell(6).appendChild(botonModificar);

            //crea el botón para eliminar los clientes (dar de baja)
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Dar de baja';
            botonEliminar.onclick = function() {
                eliminarCliente(index);
            };
            nuevaFila.insertCell(7).appendChild(botonEliminar);
        });
        document.getElementById('clientesTable').style.display = ''; //muestra la tabla
    }
    else{
        document.getElementById('clientesTable').style.display = 'none'; //oculta la tabla si no hay clientes
    }
}
//función que vacía todos los campos del formulario
function vaciarCampos(){        
    document.getElementById('username').value = '';
    document.getElementById('domicilio').value = '';
    document.getElementById('dni').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';
}
 //función que añade un cliente a la tabla (dar de alta)
function darDeAlta(){          
    if(validar()){
        const nombre = document.getElementById('username').value;
        const domicilio = document.getElementById('domicilio').value;
        const dni = document.getElementById('dni').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;

        const clientes = cargarClientes();

        //inicializa la variable para el mensaje de error
        let mensajeError = "";

        //verifica si ya existe un cliente con el mismo DNI
        const dniExistente = clientes.some(cliente => cliente.dni === dni);
        if(dniExistente) {
            mensajeError += "Ya existe un cliente con el mismo DNI.\n";
        }

        //verifica si ya existe un cliente con el mismo teléfono
        const telefonoExistente = clientes.some(cliente => cliente.telefono === telefono);
        if(telefonoExistente) {
            mensajeError += "Ya existe un cliente con el mismo teléfono.\n";
        }

        //verifica si ya existe un cliente con el mismo correo
        const correoExistente = clientes.some(cliente => cliente.correo === correo);
        if(correoExistente) {
            mensajeError += "Ya existe un cliente con el mismo correo.\n";
        }

        //si hay algún error, muestra el mensaje y evita que se guarde el cliente
        if(mensajeError) {
            alert(mensajeError);
            return;  //detiene la función si hay algun duplicado
        }

        const cliente = { nombre, domicilio, dni, telefono, correo };
        clientes.push(cliente);         //agrega un nuevo cliente al array
        guardarClientes(clientes);      //guarda en localStorage
        actualizarTabla();              //actualiza la tabla
        vaciarCampos();                 //limpia todo el formulario
    }
}
//función para modificar un cliente en específico
function modificarCliente(index){
    const clientes = cargarClientes();      //carga los clientes del localStorage
    const cliente = clientes[index];        //obtiene el cliente seleccionado

    //carga los datos en los campos del formulario
    document.getElementById('username').value = cliente.nombre;
    document.getElementById('domicilio').value = cliente.domicilio;
    document.getElementById('dni').value = cliente.dni;
    document.getElementById('telefono').value = cliente.telefono;
    document.getElementById('correo').value = cliente.correo;

    document.getElementById('modificarIndex').value = index;

    document.getElementById('guardarCambios').style.display = 'inline';
}
/*función que se utiliza en el botón que 
*aparece para modificar los clientes
*/
function guardarModificacionClientes(){
    const index = document.getElementById('modificarIndex').value;
    if (index !== ''){
        const clientes = cargarClientes();

        const nuevoDNI = document.getElementById('dni').value;
        const nuevoTelefono = document.getElementById('telefono').value;
        const nuevoCorreo = document.getElementById('correo').value;

        //verifica si el nuevo DNI, teléfono o correo ya está en la tabla con otro cliente
        let mensajeError = "";
        
        const dniExistente = clientes.some((cliente, idx) => cliente.dni === nuevoDNI && idx != index);
        if (dniExistente) {
            mensajeError += "Ya existe un cliente con el mismo DNI.\n";
        }

        const telefonoExistente = clientes.some((cliente, idx) => cliente.telefono === nuevoTelefono && idx != index);
        if (telefonoExistente) {
            mensajeError += "Ya existe un cliente con el mismo teléfono.\n";
        }

        const correoExistente = clientes.some((cliente, idx) => cliente.correo === nuevoCorreo && idx != index);
        if (correoExistente) {
            mensajeError += "Ya existe un cliente con el mismo correo.\n";
        }

        //si hay algún error muestra el mensaje para la modificación
        if (mensajeError) {
            alert(mensajeError);
            return;     //no continua modificando
        }

        //actualizar el cliente con los datos modificados
        clientes[index].nombre = document.getElementById('username').value;
        clientes[index].domicilio = document.getElementById('domicilio').value;
        clientes[index].dni = document.getElementById('dni').value;
        clientes[index].telefono = document.getElementById('telefono').value;
        clientes[index].correo = document.getElementById('correo').value;

        //guarda los clientes actualizados en el localStorage
        guardarClientes(clientes);
        actualizarTabla();
        vaciarCampos();
        document.getElementById('modificarIndex').value = '';  //limpia el índice
        document.getElementById('guardarCambios').style.display = 'none';
        alert("Cliente guardado!");
    }
    else{
        alert("Tienes que modificar algún cliente!");
    }
}
/*función para eliminar el cliente seleccionado
*se le pasa indice para indicarle el cliente en concreto
*/
function eliminarCliente(indice){
    let clientes = cargarClientes();
    clientes.splice(indice, 1);         //elimina el cliente del array
    guardarClientes(clientes);          //actualizar el localStorage con el array recien eliminado
    actualizarTabla();
}
//función que se inicializa cuando se carga la página
document.addEventListener('DOMContentLoaded', function(){
    const campoOculto = document.createElement('input');            //crea un nuevo campo de input
    campoOculto.type = 'hidden';                                    //define el tipo de campo como 'hidden' (oculto)
    campoOculto.id = 'modificarIndex';
    document.getElementById('userForm').appendChild(campoOculto);   //agrega el campo 'campoOculto' al formulario con id 'userForm'
    vaciarCampos();
    actualizarTabla();                                              //carga y actualiza la tabla al cargar la página
});