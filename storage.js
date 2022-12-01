//Clase crea un campo
class Storage {
  constructor(key, converter) {
    this.key = key;
    this.converter = converter;
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
    this.createStorage();
    return JSON.parse(localStorage.getItem(this.key)).map((i) =>
      this.converter(i)
    );
  }

  saveStorage(storage) {
    //Guardo en el localStorage la info con clave e info
    this.createStorage();
    localStorage.setItem(this.key, JSON.stringify(storage));
  }

  getItemIfExists(id, current) {
    const index = current.findIndex((item) => item.id === id);
    if (index !== -1) {
      return [current[index], index]; //si es igual al que traido me retorna el un arreglo con el objeto y su indice
    }
    return null;
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

  updateItem(id, updateFunc) {
    const current = this.parseStorage(); //traigo info del local storage y paso el jason
    const item = this.getItemIfExists(id, current); //llamo a la funcion para que me compare el indice, le envio el actual

    if (!!item) {
      //si existe el id
      const [currentItem, index] = item;
      current[index] = updateFunc(currentItem); //reemplazo la informacion
      this.saveStorage(current); //guardo informacion en el localstorage
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
