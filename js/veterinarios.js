const tipo = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const btnCerrar =  document.getElementById('btn-Cerrar');
const listaVeterinarias = document.getElementById('lista-veterinarias');
const EditarVeterinario = document.getElementById('exampleModalCenterTitle');

let veterinarias = [
  {
    nombre: "Naryie",
    apellido: "Vasquez",
    pais: "Colombia",
    identificacion: "1234567890"
  },
  {
    nombre: "Juan David",
    apellido: "Marín",
    pais: "Mexico",
    identificacion: "1234567899"
  }
];


function listarVeterinarias() {
  const htmlVeterinarias = veterinarias.map((veterinaria, index)=>`<tr>
      <th scope="row">${index}</th>
      <td>${veterinaria.identificacion}</td>
      <td>${veterinaria.pais}</td>
      <td>${veterinaria.nombre}</td>
      <td>${veterinaria.apellido}</td>
      <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
      </td>
    </tr>`).join("");
    listaVeterinarias.innerHTML = htmlVeterinarias;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    nombre: nombre.value,
    apellido: apellido.value,
    pais: pais.value,
    identificacion: identificacion.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion) {
    case 'Editar':
      veterinarias[indice.value] = datos;
      break;
    default:
      veterinarias.push(datos);
      break;
  }
  listarVeterinarias();
  resetModal();
}

function enviarDatoCerrar() {
  const accion = btnCerrar.innerHTML;
  switch(accion) {
    case  'Cerrar':
      EditarVeterinario.innerHTML = 'Nuevo Veterinario/a'
      btnGuardar.innerHTML = 'Editar'
      resetModal();
    break;  
  }
}

function editar(index) {
  btnGuardar.innerHTML = 'Editar'
  btnCerrar.innerHTML = 'Cerrar'
  return function cuandoCliqueo() {
    if (btnGuardar.innerHTML == 'Editar'){
      EditarVeterinario.innerHTML = 'Ediar Veterinario/a'
    $('#exampleModalCenter').modal('toggle');
    const veterinaria = veterinarias[index];
    indice.value = index;
    nombre.value = veterinaria.nombre;
    apellido.value = veterinaria.apellido;
    pais.value = veterinaria.pais;
    identificacion.value = veterinaria.identificacion;
    }
    else if (btnCerrar.innerHTML == 'Cerrar'){
      btnGuardar.innerHTML = 'Editar'
    }
  }
}

function resetModal() {
  indice.value = '';
  nombre.value = '';
  apellido.value = '';
  pais.value = '';
  identificacion.value = '';
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
  return function clickEnEliminar() {
    veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria)=>indiceVeterinaria !== index);
    listarVeterinarias();
  }
}

$("#btn-Close").on("click",function() {
  indice.value = '';
  nombre.value = '';
  apellido.value = '';
  pais.value = '';
  identificacion.value = '';
  EditarVeterinario.innerHTML = 'Nuevo Veterinario/a'
});

listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar.onclick = enviarDatoCerrar;