/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$('#page-home').live('pageinit', function(event){  
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    
    $('#intro').click(function() {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);            
    });
    
    $('div ul li a').click(function(event) {
        event.preventDefault();
        //alert('clicked : ' + $(this).attr('id'));
        var attrId = $(this).attr('id');

        if (attrId.indexOf("click") !== 0) {
            return;
        }
        
        var api = '#api' + attrId.substring(attrId.indexOf('-'));
        
        // hide all div's, show only this one
        $('.api-div').hide();
        $(api).show();
        
        // if small screen and portrait - close after tap
        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + api);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }
    }); 
    
    $('#listdivider').click(function(event) {
        event.preventDefault();
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    });
});
//Declaración de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;

// Guardamos en variables elementos para poder rescatarlos después sin tener que volver a buscarlos
cuerpo = document.getElementById("cuerpo"),
menuprincipal = document.getElementById("menuprincipal"),
wrapper = document.getElementById("wrapper");

var xhReq = new XMLHttpRequest();

var app = {
    // Constructor de la app
    initialize: function() {
     // Estado inicial mostrando capa cuerpo
     estado="cuerpo";
    
     // Creamos el elemento style, lo añadimos al html y creamos la clase cssClass para aplicarsela al contenedor wrapper
var heightCuerpo=window.innerHeight-46;
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.cssClass { position:absolute; z-index:2; left:0; top:46px; width:100%; height: '+heightCuerpo+'px; overflow:auto;}';
document.getElementsByTagName('head')[0].appendChild(style);

// Añadimos las clases necesarias
cuerpo.className = 'page center';
menuprincipal.className = 'page center';
wrapper.className = 'cssClass';

// Leemos por ajax el archivos opcion1.html de la carpeta opciones
xhReq.open("GET", "opciones/opcion1.html", false);
xhReq.send(null);
document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

// Leemos por ajax el archivos menu.html de la carpeta opciones
xhReq.open("GET", "opciones/menu.html", false);
xhReq.send(null);
document.getElementById("contenidoMenu").innerHTML=xhReq.responseText;

// Creamos los 2 scroll mediante el plugin iscroll, uno para el menú principal y otro para el cuerpo
myScroll = new iScroll('wrapper', { hideScrollbar: true });
myScrollMenu = new iScroll('wrapperMenu', { hideScrollbar: true });

        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
     // Ejecutamos la función FastClick, que es la que nos elimina esos 300ms de espera al hacer click
     new FastClick(document.body);
    },
    
};

// Función para añadir clases css a elementos
function addClass( classname, element ) {
    var cn = element.className;
    if( cn.indexOf( classname ) != -1 ) {
     return;
    }
    if( cn != '' ) {
     classname = ' '+classname;
    }
    element.className = cn+classname;
}

// Función para eliminar clases css a elementos
function removeClass( classname, element ) {
    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}

function menu(opcion){

// Si pulsamos en el botón de "menu" entramos en el if
if(opcion=="menu"){
if(estado=="cuerpo"){
cuerpo.className = 'page transition right';
estado="menuprincipal";
}else if(estado=="menuprincipal"){
cuerpo.className = 'page transition center';
estado="cuerpo";	
}
// Si pulsamos un botón del menu principal entramos en el else
}else{

// Añadimos la clase al li presionado
addClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);

// Recogemos mediante ajax el contenido del html según la opción clickeada en el menu
xhReq.open("GET", "opciones/opcion"+opcion+".html", false);
xhReq.send(null);
document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

// Refrescamos el elemento iscroll según el contenido ya añadido mediante ajax, y hacemos que se desplace al top
myScroll.refresh();
myScroll.scrollTo(0,0);

// Añadimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
cuerpo.className = 'page transition center';
estado="cuerpo";

// Quitamos la clase añadida al li que hemos presionado
setTimeout(function() {
removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
}, 300);

}

}
