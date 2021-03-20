const nombre = document.getElementById("nombre");
const documento = document.getElementById("documento");
const apellido = document.getElementById("apellido");
const indice = document.getElementById("indice");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const btnCerrar =  document.getElementById('btn-Cerrar');
const btnClose = document.getElementById ('btn-Close');
const listaDuenos = document.getElementById("lista-duenos");
const EditarMascota = document.getElementById('exampleModalCenterTitle');
const url = "https://veterinaria-bakend.vercel.app/duenos";

let duenos = [];

async function listarDuenos() {
  try {
    const respuesta = await fetch(url);
    const duenosDelServer = await respuesta.json();
    if (Array.isArray(duenosDelServer)) {
      duenos = duenosDelServer;
    }
    if (duenos.length > 0) {
      const htmlDuenos = duenos
        .map(
          (dueno, index) => `<tr>
      <th scope="row">${index}</th>
      <td>${dueno.documento}</td>
      <td>${dueno.nombre}</td>
      <td>${dueno.apellido}</td>
      <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
      </td>
    </tr>`
        )
        .join("");
      listaDuenos.innerHTML = htmlDuenos;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
      Array.from(document.getElementsByClassName("eliminar")).forEach(
        (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
      );
      return;
    }
    listaDuenos.innerHTML = `<tr>
    <td colspan="5" class="lista-vacia">No hay dueños</td>
  </tr>`;
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

async function enviarDatos(evento) {
  evento.preventDefault();
  try {
    const datos = {
      nombre: nombre.value,
      apellido: apellido.value,
      documento: documento.value,
    };
    const accion = btnGuardar.innerHTML;
    let urlEnvio = url;
    let method = "POST";
    if (accion === "Editar") {
      urlEnvio += `/${indice.value}`;
      method = "PUT";
    }
    const respuesta = await fetch(urlEnvio, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
      mode: "cors",
    });
    if (respuesta.ok) {
      listarDuenos();
      resetModal();
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

function enviarDatoCerrar() {
  const accion = btnCerrar.innerHTML;
  switch(accion) {
    case  'Cerrar':
      EditarMascota.innerHTML = 'Nuevo Dueño'
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
  EditarMascota.innerHTML = 'Nuevo Dueño'
  resetModal();
});

function editar(index) {
  btnGuardar.innerHTML = 'Editar'
  btnCerrar.innerHTML = 'Cerrar'
  return function cuandoCliqueo() {
    if (btnGuardar.innerHTML == 'Editar'){
      EditarMascota.innerHTML = 'Editar Dueño'
    $("#exampleModalCenter").modal("toggle");
    const dueno = duenos[index];
    indice.value = index;
    nombre.value = dueno.nombre;
    apellido.value = dueno.apellido;
    documento.value = dueno.documento;
  }
  else if (btnCerrar.innerHTML == 'Cerrar'){
    btnGuardar.innerHTML = 'Editar'
  }
    
  };
}

function resetModal() {
  indice.value = "";
  nombre.value = "";
  apellido.value = "";
  documento.value = "";
  btnGuardar.innerHTML = "Crear";
}

function eliminar(index) {
  const urlEnvio = `${url}/${index}`;
  return async function clickEnEliminar() {
    var respuesta = confirm("Estas seguro de eliminar el Dueño?");
    try {
      if (respuesta == true)
      {
      const respuesta = await fetch(urlEnvio, {
        method: "DELETE",
        mode: "cors",
      });
      if (respuesta.ok) {
        listarDuenos();
      }
      }
      else
      {
        return false;
      }
    } catch (error) {
      console.log({ error });
      $(".alert").show();
    }
  };
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar.onclick = enviarDatoCerrar;
