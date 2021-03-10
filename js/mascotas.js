const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const btnCerrar =  document.getElementById('btn-Cerrar');
const btnClose = document.getElementById ('btn-Close');
const listaMascotas = document.getElementById('lista-mascotas');
const EditarMascota = document.getElementById('exampleModalCenterTitle');

let mascotas = [
  {
    tipo: "Gato",
    nombre: "manchas",
    dueno: "Esteban"
  },
  {
    tipo: "Perro",
    nombre: "flash",
    dueno: "Jhon"
  }
];


function listarMascotas() {
  const htmlMascotas = mascotas.map((mascota, index)=>`
  <tr>
      <th scope="row">${index}</th>
      <td>${mascota.tipo}</td>
      <td>${mascota.nombre}</td>
      <td>${mascota.dueno}</td>
      <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
      </td>
    </tr>`).join("");
    listaMascotas.innerHTML = htmlMascotas;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    tipo: tipo.value,
    nombre: nombre.value,
    dueno: dueno.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion) {
    case 'Editar':
      mascotas[indice.value] = datos;
      break;
    default:
      mascotas.push(datos);
      break;
  }
  listarMascotas();
  resetModal();
}

function enviarDatoCerrar() {
  const accion = btnCerrar.innerHTML;
  switch(accion) {
    case  'Cerrar':
      EditarMascota.innerHTML = 'Nueva Mascota'
      btnGuardar.innerHTML = 'Editar'
      resetModal();
    break;  
  }
}


$("#btn-Close").on("click",function() {
  nombre.value = '';
  dueno.value = '';
  tipo.value = '';
  indice.value = '';
  EditarMascota.innerHTML = 'Nueva Mascota'
  resetModal();
});

function editar(index) {
  btnGuardar.innerHTML = 'Editar'
  btnCerrar.innerHTML = 'Cerrar'
  return function cuandoCliqueo() {
    if (btnGuardar.innerHTML == 'Editar'){
      EditarMascota.innerHTML = 'Ediar Mascota'
      $('#exampleModalCenter').modal('toggle');
      const mascota = mascotas[index];
      nombre.value = mascota.nombre;
      dueno.value = mascota.dueno;
      tipo.value = mascota.tipo;
      indice.value = index;
    }
    else if (btnCerrar.innerHTML == 'Cerrar'){
      btnGuardar.innerHTML = 'Editar'
    }
  }
}

function resetModal() {
  nombre.value = '';
  dueno.value = '';
  tipo.value = '';
  indice.value = '';
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
  return function clickEnEliminar() {
    var respuesta = confirm("Estas seguro de eliminar la mascota?");

    if (respuesta == true)
    {
      mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);    
      listarMascotas();  
    }
    else
    {
      return false;
    }
  }  
}

/*$('#exampleModalCenter').modal({
  keyboard: false  
})*/

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar.onclick = enviarDatoCerrar;
/*btnClose.onclick = enviarDatoClose;*/