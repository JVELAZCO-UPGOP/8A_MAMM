const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const indice = document.getElementById("indice");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const btnCerrar =  document.getElementById('btn-Cerrar');
const btnClose = document.getElementById ('btn-Close');
const listaMascotas = document.getElementById("lista-mascotas");
const EditarMascota = document.getElementById('exampleModalCenterTitle');
const url = "https://veterinaria-bakend.vercel.app/mascotas";

let mascotas = [];

async function listarMascotas() {
  try {
    const respuesta = await fetch(url);
    const mascotasDelServer = await respuesta.json();
    if (Array.isArray(mascotasDelServer)) {
      mascotas = mascotasDelServer;
    }
    if (mascotas.length > 0) {
      const htmlMascotas = mascotas
        .map(
          (mascota, index) => `<tr>
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
    </tr>`
        )
        .join("");
      listaMascotas.innerHTML = htmlMascotas;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
      Array.from(document.getElementsByClassName("eliminar")).forEach(
        (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
      );
      return;
    }
    listaMascotas.innerHTML = `<tr>
        <td colspan="5" class="lista-vacia">No hay mascotas</td>
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
      tipo: tipo.value,
      nombre: nombre.value,
      dueno: dueno.value,
    };
    let method = "POST";
    let urlEnvio = url;
    const accion = btnGuardar.innerHTML;
    if (accion === "Editar") {
      method = "PUT";
      mascotas[indice.value] = datos;
      urlEnvio = `${url}/${indice.value}`;
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
      listarMascotas();
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
      EditarMascota.innerHTML = 'Editar Mascota'
    $("#exampleModalCenter").modal("toggle");
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    dueno.value = mascota.dueno;
    tipo.value = mascota.tipo;
    indice.value = index;
    }
    else if (btnCerrar.innerHTML == 'Cerrar'){
      btnGuardar.innerHTML = 'Editar'
    }
  };
}

function resetModal() {
  nombre.value = "";
  dueno.value = "";
  tipo.value = "";
  indice.value = "";
  btnGuardar.innerHTML = "Crear";
}

function eliminar(index) {
  const urlEnvio = `${url}/${index}`;
  return async function clickEnEliminar() {
    var respuesta = confirm("Estas seguro de eliminar la mascota?");
    try {
      if (respuesta == true)
      {
        const respuesta = await fetch(urlEnvio, {
          method: "DELETE",
        });
        if (respuesta.ok) {
          listarMascotas();
          resetModal();
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

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnCerrar.onclick = enviarDatoCerrar;
