/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  })
  this.modelo.preguntasEliminadas.suscribir(function() {
    contexto.reconstruirLista();
  })
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $('<li/>', { 'id': pregunta.id, 'class': 'list-group-item' }).text(pregunta.texto);
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.texto;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

    reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      var elementoRespuesta = $('[name="option[]"]');      
      elementoRespuesta.splice(-1, 1);
      elementoRespuesta.each(function() {
        //completar
        var respuesta = {
          texto: $(this).val(),
          votos: 0,
        }
        respuestas.push(respuesta);
      });
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //boton borrar pregunta
    e.botonBorrarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });
    //boton editar pregunta
    e.botonEditarPregunta.click(function() {
      var id = ($('.list-group-item.active').attr('id'));
      var tituloPregunta = prompt("Edite el nombre de la pregunta");

      if (tituloPregunta){
        contexto.controlador.editarPregunta(id, tituloPregunta);
      };
      contexto.reconstruirLista();
      contexto.limpiarFormulario();
    });
    //boton borrar todas las preguntas
    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodo();
      contexto.reconstruirLista();
      contexto.limpiarFormulario();
    });
    
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  }

};
