let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = []; // Nueva lista para las descripciones

// Esta función se invoca al momento de que el usuario hace clic
function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = parseFloat(document.getElementById('valorGasto').value.replace('.', '').replace(',', '.')); // Convertir a número
    let descripcionGasto = document.getElementById('descripcionGasto').value; // Capturar la descripción

    console.log(nombreGasto);
    console.log(valorGasto);
    console.log(descripcionGasto);

    // Verificar si el valor del gasto supera COP 600,000
    if (valorGasto > 600000) {
        alert(`¡Alerta! El gasto registrado (${nombreGasto}) es mayor a COP 600,000: COP ${valorGasto.toFixed(2)}`);
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionesGastos.push(descripcionGasto); // Almacenar la descripción

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = listaValoresGastos[posicion];
        const descripcionGasto = listaDescripcionesGastos[posicion]; // Obtener la descripción

        htmlLista += `<li>
                        <strong>${elemento}</strong> - COP ${formatNumber(valorGasto.toFixed(2))}<br>
                        <em>${descripcionGasto}</em> 
                        <button onclick="modificarGasto(${posicion});">Modificar</button>
                        <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                     </li>`;
        // Calculamos el total de gastos
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = formatNumber(totalGastos.toFixed(2));
    limpiar();
}

function modificarGasto(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion].toFixed(2).replace('.', ','); // Asegurarse de que el punto se mantenga para el formato
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];

    // Cambiar el botón de agregar a un botón de "Actualizar"
    const botonFormulario = document.getElementById('botonFormulario');
    botonFormulario.setAttribute('onclick', `actualizarGasto(${posicion});`);
    botonFormulario.innerText = 'Actualizar Gasto';
}

function actualizarGasto(posicion) {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = parseFloat(document.getElementById('valorGasto').value.replace('.', '').replace(',', '.')); // Convertir a número
    let descripcionGasto = document.getElementById('descripcionGasto').value; // Capturar la descripción

    listaNombresGastos[posicion] = nombreGasto;
    listaValoresGastos[posicion] = valorGasto;
    listaDescripcionesGastos[posicion] = descripcionGasto;

    // Volver a configurar el botón de agregar
    const botonFormulario = document.getElementById('botonFormulario');
    botonFormulario.setAttribute('onclick', 'clickBoton();');
    botonFormulario.innerText = 'Agregar Gasto';

    actualizarListaGastos();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = ''; // Limpiar el campo de descripción
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1); // Eliminar la descripción también
    actualizarListaGastos();
}

// Función para formatear números
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formato con puntos como separador de miles
}



