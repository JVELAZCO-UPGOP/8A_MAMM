module.exports = {
  mascotas: [
    { tipo: "Perro", nombre: "Trosky0", dueno: "Miguel" },
    { tipo: "Perro", nombre: "Trosky1", dueno: "Miguel" },
    { tipo: "Gato", nombre: "Flash", dueno: "Miguel" },
    { tipo: "Perro", nombre: "Trosky3", dueno: "Miguel" },
    { tipo: "Perro", nombre: "Trosky4", dueno: "Miguel" },
  ],
  veterinarias: [
    { nombre: "Alexandra", apellido: "Perez", documento: "1234567890" },
    { nombre: "Alexander", apellido: "Gómez", documento: "4234569999" },
    { nombre: "Julián", apellido: "Madrid", documento: "555666777" },
    { nombre: "Naryie", apellido: "Vasquez", documento: "1000666777" },
  ],
  duenos: [
    { nombre: "Alejandra", apellido: "Ramirez", documento: "12343333890" },
    { nombre: "Alexandra", apellido: "Fernandez", documento: "4234564321" },
    { nombre: "Julio", apellido: "Tamayo", documento: "456666777" },
    { nombre: "Natalia", apellido: "Gonzales", documento: "9000666777" },
  ],
  consultas: [
    {
      mascota: 0,
      veterinaria: 0,
      fechaCreacion: new Date(),
      fechaEdicion: new Date(),
      historia: "",
      diagnostico: "diagnostico",
    },
  ],
};
