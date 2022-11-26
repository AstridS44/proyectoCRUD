const users = new Storage("users", User.fromObject);

function createCampo() {
  const id = generateId(); //llamo funcion para crear el id (está con método random cambiar)
  const { actividad, descripcion } = getInputData();
  //usando método every
  const isValid = [actividad, descripcion].every((input) => Boolean(input));

  if (!isValid) {
    //si todo el arreglo no tiene info enviar alert
    alert("Aún no completado la información");
    return;
  }

  const newUser = new User(id, actividad, descripcion); //llamo clase creación de usuario enviando parametros
  users.createItem(newUser); //llamo clase de crear item y le envío el objeto
}

function getInputData() {
  const formData = new FormData(document.getElementById("formu")); //traigo la informacion actual del formulario
  return {
    id: formData.get("id"),
    actividad: formData.get("actividad"),
    descripcion: formData.get("descripcion"),
  }; //guardo  la info que tuve de cada campo
}
function showStorage() {}
//let datouno = document.getElementById("actividad").value;
//let datodos = document.getElementById("descripcion").value;

function deleteItem() {}

function updateItem() {}

function generateId() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  for (let i = 0; i < 5; i++) {
    resultado += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return resultado;
}
