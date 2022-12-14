const tareas = new Storage("tareas", Tarea.fromObject);

function crearCampo() {
  const id = generateId(); //llamo funcion para crear el id (está con método random cambiar)
  const { actividad, descripcion } = getInputData();
  //usando método every
  const isValid = [actividad, descripcion].every((input) => Boolean(input));

  if (!isValid) {
    //si todo el arreglo no tiene info enviar alert
    alert("Aún no completado la información");
    return;
  }

  const newTarea = new Tarea(id, actividad, descripcion); //llamo clase creación de usuario enviando parametros
  tareas.createItem(newTarea); //llamo clase de crear item y le envío el objeto
  populateTable(tareas.readItems()); //llamo funcion usando datos traidos del loscalSatorge con la funcion read
  cleanInputs(); //limpio el formulario
}

function generateId() {
  const numeros = "0123456789";
  let resultado = "";
  for (let i = 0; i < 3; i++) {
    resultado += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }
  return "ACT" + resultado;
}

function destroy(event) {
  const { id } = getDataTr(event);
  tareas.deleteItem(id);
  populateTable(tareas.readItems());
}

function edit(event) {
  const { id, actividad, descripcion } = getDataTr(event);
  fillInputs(id, actividad, descripcion);
}

function guardarCambios(event) {
  const { id, actividad, descripcion } = getInputData(event);
  tareas.updateItem(id, (tarea) => new Tarea(tarea.id, actividad, descripcion));
  cleanInputs();
  populateTable(tareas.readItems());
}

function getDataTr(icon) {
  const tr = icon.closest("tr"); //con esta funcion encuentro exactamente el tr
  const [id, actividad, descripcion] = Array.from(tr.children)
    .slice(0, -1) //me trae el contenido del arreglo excepto el último dato
    .map((input) => input.innerText); //trae el contenido de cada elemento
  return { id, actividad, descripcion }; //retorno la info
}

function getInputData() {
  const formData = new FormData(document.getElementById("formu")); //traigo la informacion actual del formulario
  return {
    id: formData.get("id"),
    actividad: formData.get("actividad"),
    descripcion: formData.get("descripcion"),
  }; //guardo  la info que tuve de cada campo
}

function cleanInputs() {
  //limpio el formulario
  document.getElementById("formu").reset();
}

function fillInputs(id, actividad, descripcion) {
  document.querySelector('input[name="id"]').value = id; //mando el valor del id, este esta oculto no es visibel
  document.querySelector('input[name="actividad"]').value = actividad; //mando la info de la actividad
  document.querySelector('textarea[name="descripcion"]').value = descripcion; //mando la info de la descripcion
}

function populateTable(tareas) {
  const tbody = document.getElementById("table-body"); //capturo info del cuerpo de la tabla
  tbody.innerHTML = ""; //le que vacie el cuerpo de la tabla
  tareas.forEach((tarea) => tbody.appendChild(createTr(tarea))); //ahora voy a recorrer mi objeto y le voy a enviar el dato a una fila de la tabla, aquí llamo esa funcion y le mando dato de cada clave
}

function createTr(tarea) {
  //llamo a estas funciones que me retornan los valosres de actividad y descripcion y creo 2 botones editar y eliminar, cada uno llama a dicha funcion
  const tdHTML = `
  <td>${tarea.getId()}</td>
  <td>${tarea.getActividad()}</td>
  <td>${tarea.getDescripcion()}</td>
  <td><button  id="btonborrar"  type="button" class="botoncito2" onclick='edit(this)' >Editar<br> Actividad</button></td>
  <td> <button  id="btonborrar"  type="button" class="botoncito4" onclick='destroy(this)' >Eliminar<br> Actividad</button></td> `;
  const tr = document.createElement("tr"); //creo un elemento tipo fila
  tr.innerHTML = tdHTML; //le envio el contenido
  return tr; //retorno este tr al cuerpo de la tabla
}

window.onload = () => {
  populateTable(tareas.readItems());
};

/*function botonactualizar() {
  let botonguardar = document.getElementsByClassName("botoncito3");
  botonguardar.setAttribute("style", " visibility:visible");
}*/
