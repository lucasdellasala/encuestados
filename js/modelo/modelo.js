/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se borra una pregunta con su id
  borrarPregunta: function(id) {
    //Averiguar por qué me devuelve id NaN, qué significa, y por qué no estoy pudiendo borrar la pregunta con .splice()
    //Id es NaN porque le estoy asignando mal el id x algun motivo a cada pregunta que creo
    //Parece que es porque obtenerUltimoId no existe.
    console.log(id);
    this.preguntas.splice(id,1);
    this.guardar();
    this.preguntaBorrada.notificar();
    console.log(id);
  },

  //se guardan las preguntas
  guardar: function(){
  },
};
