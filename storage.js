//Clase crea un campo
class Storage {
  constructor(key) {
    this.key = key;
    this.createStorage(); //traigo la info actual
  }

  createStorage() {
    //creo arreglo vacio si no tiene nada
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }
  }

  parseStorage() {
    //traigo info del campo y aplico Jason
    return JSON.parse(localStorage.getItem(this.key));
  }

  saveStorage(storage) {
    //Guardo en el localStorage la info con clave e info
    localStorage.setItem(this.key, JSON.stringify(storage));
  }

  getNextId(storage) {
    //Creacion del id
    if (storage.length === 0) {
      //si el arreglo contiene algo envia 1
      return 1;
    }
    const orderedStorage = storage.sort((a, b) => a - b); //organizo de  menos a mayor
    return orderedStorage[orderedStorage.length - 1].id + 1; //retorno el id
  }

  // CRUD
  createItem(item) {
    const current = this.parseStorage(); //capturo info actual del local storage y asigno
    current.push(item); //asigno info del objeto actual
    this.saveStorage(current); //llamo funcion de guardar el localStorge
  }

  readItems() {
    return this.parseStorage();
  }

  updateItem(id, updateItem) {
    const current = this.parseStorage();
    const index = current.findIndex((item) => {
      return item.id === id;
    });

    if (index !== -1) {
      current[index].actividad = updateItem.actividad;
      current[index].descripcion = updateItem.descripcion;
      this.saveStorage(current);
    }
  }

  deleteItem(id) {
    const current = this.parseStorage();
    const index = current.findIndex((item) => {
      return item.id === id;
    });

    if (index !== -1) {
      current.splice(index, 1);
      this.saveStorage(current);
    }
  }
}
