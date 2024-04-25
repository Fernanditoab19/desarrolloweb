// Plugin de juego de memoria para jQuery
// Autor: Fernando Aponte
// https://github.com/frenski/quizy-memorygame
//
// (c) 2012-2013 http://yane.fr/
// Licencia MIT
// ***

// Hack para IE para indexOf
if(!Array.indexOf){
  Array.prototype.indexOf = function(obj){
   for(var i=0; i<this.length; i++){
    if(this[i]==obj){
     return i;
    }
   }
   return -1;
  }
}


(function($) {

  var initData = ''; // Más tarde permitirá cambiar esto sobre la marcha
  var initOpts = {}

  var methods = {

      init : function(options) {

        // VARIABLES **************************************************************
      // ************************************************************************

      // Guarda el registro de los elementos iniciales y las opciones
        initData = $(this).html();
        initOpts = options;

        // Obtiene los parámetros
        var opts = $.extend({}, $.fn.quizyMemoryGame.defaults, options);

         // Guarda el número de cartas
        var itemsNum = $(this).children('ul').children('li').length;

       // Guarda aquí los elementos correctos seleccionados (después de tener una coincidencia)
        var correctItems = new Array();

        
       // Guarda los ids de coincidencia = qué elementos coinciden
        var matches = new Array();

         // Guarda el HTML interno de los elementos (para ocultarlos del inspector web, etc.)
        var inHtml = new Array();

        // Una clase de selector para las cartas
        var itemsClass = 'quizy-mg-item';

        // Guarda la clase y el id del elemento seleccionado
        var selItemClass = '';
        var selItemId = -1;

        // Guarda el número de clics para un turno: puede ser 0, 1 o 2
        var numClicks = 0;

       // Guarda el número total de clics en general
        var numTotalClicks = 0;

       // Guarda el número de coincidencias y el número de segundos para el resumen
        var numMatches = 0;
        var numSeconds = 0;

        // Una variable de temporizador
        var gameTimer;

       // Variables de los parámetros del plugin (definidos y descritos al final)
        var delayShow = opts.openDelay;
        var w = opts.itemWidth;
        var h = opts.itemHeight;
        var m = opts.itemsMargin;
        var rowNum = Math.ceil(itemsNum/opts.colCount);
        var random = opts.randomised;

        // FUNCTIONS **************************************************************
        // ************************************************************************

         // Una función para manejar el clic en el elemento
        var handleClick = function(){
          // Comienza el temporizador
          if(numTotalClicks==0) gameTimer = setInterval(incTime,1000);
          // Cuenta los clics
          numTotalClicks ++;
         // Guarda la clase del elemento clicado
          var tId = $(this).attr('id');
          var tdIdNum = parseInt(tId.substring(itemsClass.length,tId.length));
          var tClass = matches[tdIdNum];
         // Llama a la función de desvinculación (hace que el botón esté inactivo)
          unbindClick($(this));
          showItem($(this),tdIdNum);
            // Si es el primer clic de dos (voltear la primera carta)
          if(numClicks==0){
            numClicks ++ ;
            selItemClass = tClass;
            selItemId = tId;
           // Si es el segundo clic de dos (voltear la segunda carta)
          }else if(numClicks == 1){
            numClicks = 0;
           // Si ambas tienen la misma clase = TENEMOS una coincidencia
            if(tClass == selItemClass){
              showResIcon('correct');
              unbindClick($('.'+tClass));
              // Añade las cartas volteadas al array de elementos correctos
              correctItems.push(tId);
              correctItems.push(selItemId);
              // Incrementa el número de coincidencias correctas

              numMatches ++ ;
              // Si todas las cartas están volteadas y el juego está completo
              if(numMatches == itemsNum/2){
                //Detiene el temporizador
                clearInterval(gameTimer);
                // Si se establece el resumen del juego, agrega la información y la muestra.
                if(opts.gameSummary){
                  $('div#quizy-game-summary').
                      children('div#gs-column2').
                      html(numSeconds+'<br>'+opts.textSummaryTime);
                  $('div#quizy-game-summary').
                      children('div#gs-column3').
                      html(numTotalClicks+'<br>'+opts.textSummaryClicks);
                  $('div#quizy-game-summary').delay(2000).fadeIn(1000);
                }
                // Si está configurado, realiza una llamada AJAX y envía los parámetros necesario
                if(opts.onFinishCall!=''){
                  opts.onFinishCall({ clicks: numTotalClicks, time: numSeconds } );
                }
              }
              // Si no tienen la misma clase = NO TENEMOS una coincidencia
            }else{
              showResIcon('wrong');
              unbindClick($('div.'+itemsClass));
              // Voltea las cartas nuevamente
              hideItem($('div#'+selItemId));
              hideItem($(this));
              // Después de cierto tiempo, vuelve a agregar el evento de clic a la carta
              setTimeout( function(){
                $('.'+itemsClass).each(function(){
                  var myId = $(this).attr('id');
                  if(correctItems.indexOf(myId) == -1){
                    bindClick($(this));
                  }
                });
              }, delayShow+opts.animSpeed+250);
            }
          }
        }

         // Elimina un clic de un elemento
        var unbindClick = function(el){
          el.unbind('click');
          el.css('cursor','default');
        }

        // Agrega un clic a un elemento
        var bindClick = function(el){
          el.bind('click',handleClick);
          el.css('cursor','pointer');
        }

        // Muestra el elemento con una animación diferente/basada en la configuración
        var showItem = function(el,id){
          var topId = el.children('div.quizy-mg-item-top').attr('id');
          switch(opts.animType){
            default:
            case 'fade':
              addInFullHTML(el,id);
              $('#'+topId).fadeOut(opts.animSpeed);
            break;
            case 'flip':
              el.flip({
                direction:opts.flipAnim,
                speed: opts.animSpeed,
                content: el.children('div.quizy-mg-item-bottom'),
                color:'#777',
                onEnd: function(){
                  addInHTML(el,id);
                }
              });
            break;
            case 'scroll':
              addInFullHTML(el,id);
              $('#'+topId).animate({height: 'toggle', opacity:0.3},opts.animSpeed);
            break;
          }
        }

        // Oculta el elemento con una animación diferente/basada en la configuración
        var hideItem = function(el){
          var topId = el.children('div.quizy-mg-item-top').attr('id');
          switch(opts.animType){
            default:
            case 'fade':
              $('#'+topId).delay(delayShow).fadeIn(opts.animSpeed, function(){
                removeInHTML(el);
              });
            break;
            case 'flip':
              setTimeout( function(){
               el.revertFlip();
              }, delayShow);
              setTimeout( function(){
               removeInHTML(el);
              }, delayShow+opts.animSpeed*4);
            break;
            case 'scroll':
              $('#'+topId).delay(delayShow).
                          animate({height: 'toggle', opacity:1},opts.animSpeed,
                          function(){
                            removeInHTML(el);
                          });
            break;
          }
        }

        //muestra el mensaje correcto o incorrecto
        var showResIcon = function(type){
          if(opts.resultIcons){
            var el;
            var time = Math.round(delayShow/3);
            if(type=='wrong'){
              el = $('div#quizy-mg-msgwrong');
            }else if(type=='correct'){
              el = $('div#quizy-mg-msgcorrect');
            }
            el.delay(time).fadeIn(time/2).delay(time/2).hide("explode", time/2);
          }
        }

         // Funciones de tiempo
        var incTime = function(){
          numSeconds ++;
        }

        // Función para agregar el HTML interno
        var addInFullHTML = function(el,id){
          el.children('.quizy-mg-item-bottom')
            .children('.mgcard-show')
            .html(inHtml[id]);
        }

        var addInHTML = function(el,id){
          el.children('.mgcard-show')
            .html(inHtml[id]);
        }

        var removeInHTML = function(el){
          el.children('.quizy-mg-item-bottom').children('.mgcard-show').html('');
        }

        // INICIALIZACIÓN PRINCIPAL **************************************************************
      // ************************************************************************
      // Oculta los elementos <li>
        $(this).children('ul').hide();

        // Hace que el contenedor sea lo suficientemente grande
        $(this).css({height:rowNum*(h+m)+'px'});

        // Crea un array para randomizar los elementos (si se establece randomised en true)
        // y crea un array de HTML interno vacío
				if(random){
					var ranArr = Array();
	        for(var j=0; j< itemsNum; j++){
	          inHtml[j] = '';
	          ranArr.push(j);
	        }
				}
        // Genera todos los elementos, basados en los datos en los elementos <li>
				var j=0;
        var i=0;
        while(i<itemsNum){

          
        // Aleatoriza la carta: elige un elemento con una clave aleatoria y
        // lo elimina del array aleatorio (si randomised es true)
					if(random){
          	var pick = Math.floor(Math.random()*ranArr.length);
          	j = ranArr[pick];
          	ranArr.splice(pick,1);
					}else{
						j = i;
					}
          // Obtiene los datos de cada elemento <li>
          var inEl = $(this).children('ul').children('li').eq(j);

          
         // Calcula la posición de cada elemento
          var xRatio = (i+opts.colCount)%opts.colCount;
          var yRatio = Math.floor(i/opts.colCount);
          var l = xRatio*(w+m);
          var t = yRatio*(h+m);
   
          // Agrega el HTML interno al array
          inHtml[j] = inEl.html();

          // Adjunta las cartas al elemento
          $(this).append('<div id="'+itemsClass+j+'" class="'+itemsClass+
          '" style="width:'+
          w+'px; height:'+h+'px; left:'+l+'px; top:'+t+'px">' +
          '<div class="quizy-mg-item-bottom"><div class="mgcard-show">'+
          '</div></div><div id="quizy-mg-item-top'+j+
          '" class="quizy-mg-item-top" style="width:'+
          w+'px; height:'+h+'px;"></div></div>');
          i++;

          // Agrega el id de coincidencia del elemento al array de coincidencias
          matches[j] = inEl.attr('class');

        }

        // Elimina los elementos <li> iniciales
        $(this).children('ul').remove();

        // Agrega los íconos para el resultado después de cada coincidencia
        if(opts.resultIcons){
          $(this).append('<div id="quizy-mg-msgwrong"'+
          ' class="quizy-mg-notification-fly quizy-mg-notification-fly-neg"></div>'+
          '<div id="quizy-mg-msgcorrect" class="quizy-mg-notification-fly '+
          ' quizy-mg-notification-fly-pos"></div>');
          // Posiciona los íconos de resultado en el centro del contenedor div
          var xMid = $(this).width()/2 -
                      $('div.quizy-mg-notification-fly').width()/2;
          var yMid = $(this).height()/2 -
                      $('div.quizy-mg-notification-fly').height()/2 -
                      opts.itemsMargin/2;
          $('div.quizy-mg-notification-fly').css({top:yMid+'px',left:xMid+'px'});
        }

         // Adjunta el div de resumen del juego si está establecido en las opciones.
        if(opts.gameSummary){

          var gameEl = $(this);

          gameEl.append('<div id="quizy-game-summary"><div class="gs-column" id="gs-column1">'+
                          opts.textSummaryTitle+
                          '</div><div class="gs-column" id="gs-column2"></div>'+
                          '<div class="gs-column" id="gs-column3"></div>'+
                          '<div class="quizy-game-clear"></div></div>');
          // Posiciona el div de resumen en el centro del contenedor div
          var xMid = gameEl.width()/2 -
                      $('div#quizy-game-summary').width()/2;
          var yMid = gameEl.height()/2 -
                      $('div#quizy-game-summary').height()/2 -
                      opts.itemsMargin/2;
          $('div#quizy-game-summary').css({top:yMid+'px',left:xMid+'px'});

          // Adjunta el botón de repetir si está establecido en las opciones.
          if(opts.replayButton){
            $('#quizy-game-summary').append('<div id="gs-replaybut">'+
                                            opts.replayButtonText+'</div>');
          }

          // Appends the close button
          $('#quizy-game-summary').append('<div id="gs-closebut">'+
                                          opts.closeButtonText+'</div>');

          // Adjunta el botón de cerrar
          $('div#gs-closebut').click(function(){
            $(this).parent().fadeOut();
          });

          // Agrega un evento de clic al botón de cerrar para que se elimine al hacer clic
          $('div#gs-replaybut').click(function(){
            gameEl.quizyMemoryGame('restart');
          });

        }

        // Agrega un evento de clic al botón de repetir
        $('.quizy-mg-item').click(handleClick);

        if(opts.onLoadCall!=''){
          opts.onLoadCall();
        }

      },

      destroy : function( ) {
        $(this).empty();
      },

      restart: function( ){
        methods.destroy.apply( this );
        $(this).append(initData);
        methods.init.call( this, initOpts );
      }

  };


  $.fn.quizyMemoryGame = function(optionsMethods) {

    if ( methods[optionsMethods] ) {
        return methods[ optionsMethods ].apply( this, arguments);
    } else if ( typeof optionsMethods === 'object' || ! optionsMethods ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  optionsMethods + ' does not exist on jQuery.tooltip' );
    }

  }
  // script.js

$(document).ready(function() {
  // Manejo del envío del formulario
  $('#user-form').submit(function(event) {
    event.preventDefault(); // Prevenir la recarga de la página
    var name = $('#name').val();
    var age = $('#age').val();
    // Ocultar el formulario y mostrar el juego
    $('#container').children().hide();
    $('#game-container').show();
    // Mostrar los datos del usuario
    $('.stats-container').after('<div id="user-info"><h2>Datos del usuario:</h2><p>Nombre: ' + name + '</p><p>Edad: ' + age + '</p></div>');
  });

  var wins = 0;
  var fails = 0;
  var failedAttempts = 0;

  var quizyParams = {
    itemWidth: 156,
    itemHeight: 156,
    itemsMargin: 40,
    colCount: 4,
    animType: 'flip',
    flipAnim: 'tb',
    animSpeed: 250,
    resultIcons: true,
    randomised: true,
    onFail: function () {
      fails++;
      failedAttempts++;
      $('#fails').text(fails);
      $('#failed-attempts').text(failedAttempts);
    },
    onSuccess: function () {
      wins++;
      $('#wins').text(wins);
    }
  };

  $('#tutorial-memorygame').quizyMemoryGame(quizyParams);

  // Reiniciar el juego
  $('#restart').click(function (e) {
    e.preventDefault();
    $('#tutorial-memorygame').quizyMemoryGame('restart');
    wins = 0;
    fails = 0;
    failedAttempts = 0;
    $('#wins').text(wins);
    $('#fails').text(fails);
    $('#failed-attempts').text(failedAttempts);
  });
});


  $.fn.quizyMemoryGame.defaults = {itemWidth: 156, itemHeight: 156, itemsMargin:10, colCount:4, animType:'scroll', animSpeed:250, openDelay:2500, flipAnim:'rl', resultIcons:true, gameSummary:true, randomised:true, textSummaryTitle:'Your game summary', replayButton:true, replayButtonText:'Replay', closeButtonText:'Close', textSummaryClicks:'clicks', textSummaryTime:'seconds', onFinishCall:'', onLoadCall:''}


})(jQuery);
