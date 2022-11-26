let actividadStorage = new Storage("actividad");

function createCampo() {
  const { actividad, descripcion } = getInputData();

  const isValid = [actividad, descripcion].every((input) => Boolean(input));

  if (!isValid) {
    alert("Llenar todos los campos");
    return;
  }
}

function showStorage() {}
//let datouno = document.getElementById("actividad").value;
//let datodos = document.getElementById("descripcion").value;

function deleteItem() {}

function updateItem() {}
