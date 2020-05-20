/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },
  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    console.log(nombrePregunta);
    console.log(respuestaSeleccionada);
    this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
  }
};
