/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.respuestaVotada = new Evento(this);
  this.preguntaEditada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
  return this.ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    this.ultimoId = id;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se borra una pregunta con su id
  borrarPregunta: function(id) {
    if (!isNaN(id)){
      this.preguntas.splice((this.preguntas.id === id), 1);
      this.guardar();
      this.preguntaEliminada.notificar();
    } 
  },

  //se guardan las preguntas
  guardar: function(){
    //localstorage?
  },
  
  agregarVoto: function (nombrePregunta,respuestaSeleccionada) {
    //busco el elemento pregunta seleccionado
    var elementoPregunta = this.preguntas.find(x=> x.textoPregunta == nombrePregunta);
    //busco el elemento respueta seleccionada
    var elementoRespuesta = elementoPregunta.cantidadPorRespuesta.find(y=> y.texto == respuestaSeleccionada);
    //le sumo un voto
    elementoRespuesta.votos++;
    //Notificación y salvado
    this.guardar();
    this.respuestaVotada.notificar();
  },
  
  editarPregunta: function (id, tituloPregunta) {
    if (!isNaN(id)){
      this.preguntas[id-1].textoPregunta = tituloPregunta;
      this.guardar();
      this.preguntaEditada.notificar();
    } 
  },

  borrarTodasPreguntas: function () {

  },
};
