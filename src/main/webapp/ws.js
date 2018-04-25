/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var socket = new WebSocket("wss://echo.websocket.org");
socket.onmessage = onMessage;

function onMessage(event){
    
    var msg = JSON.parse(event.data);
    divMsg(msg.sal);
}

function msg(saludo){
    
    var mensaje = {
        sal: saludo
    };
    
    socket.send(JSON.stringify(mensaje));
}

function divMsg(saludo){
    var cont = document.getElementById("divMsg");
    
    var div = document.createElement("label");
    div.innerHTML = "<b>"+saludo+"</b><br>";
    cont.appendChild(div);
}

function formSubmit(){
    msg(document.getElementById("txtB").value);
}




