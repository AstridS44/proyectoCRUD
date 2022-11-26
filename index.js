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
  populateTable(users.readItems()); //llamo funcion usando datos traidos del loscalSatorge con la funcion read
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

function populateTable(users) {
  const tbody = document.getElementById("table-body"); //capturo info del cuerpo de la tabla
  tbody.innerHTML = ""; //le que vacie el cuerpo de la tabla
  users.forEach((user) => tbody.appendChild(createTr(user))); //ahora voy a recorrer mi objeto y le voy a enviar el dato a una fila de la tabla, aquí llamo esa funcion y le mando el dato
}

function createTr(user) {
  const tdHTML = `<td>${user.getId()}</td>
  <td>${user.getActividad()}</td>
  <td>${user.getDescripcion()}</td>
  <td><button id="btonborrar"  type="button" class="botoncito" >Borrar Actividad</button><td> `;
  const tr = document.createElement("tr");
  tr.innerHTML = tdHTML;
  return tr;
}

function Crearboton() {
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = "Editar";
  document.body.appendChild(button);
}
window.onload = () => {
  populateTable(users.readItems());
};
