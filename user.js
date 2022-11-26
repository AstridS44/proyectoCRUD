class User {
  constructor(id, actividad, descripcion) {
    //Creo objeto usuario con 3 parametros
    this.id = id;
    this.actividad = actividad;
    this.descripcion = descripcion;
  }

  static fromObject(data) {
    return new User(data["id"], data["actividad"], data["descripcion"]);
  }
  getId() {
    return this.id;
  }

  getActividad() {
    return this.actividad;
  }

  getDescripcion() {
    return this.descripcion;
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      actividad: this.actividad,
      descripcion: this.descripcion,
    });
  }
}
