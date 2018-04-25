/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = setUserName();
var host = location.origin.replace(/^http/, 'ws');
host += "/Chat/chat";

var socket = new WebSocket(host);
socket.onmessage = onMessage;

var userName;

function onMessage(event){
    var chat = JSON.parse(event.data);
    print(chat);
}

function newMsg(user,message){
    var Messag = {
        user: user,
        message: message
    };
    socket.send(JSON.stringify(Messag));
}

function print(msg){
    var cont = document.getElementById("chatArea");
    
    var msgDiv = document.createElement("div");
    msgDiv.setAttribute("class","msgText");
    cont.appendChild(msgDiv);
    
    var msgUser = document.createElement("span");
    msgUser.setAttribute("class","username");
    msgUser.innerHTML = msg.user+":   ";
    msgDiv.appendChild(msgUser);
    
    var msgMessage = document.createElement("span");
    msgMessage.setAttribute("class","userMessage");
    msgMessage.innerHTML = msg.message;
    msgDiv.appendChild(msgMessage);
}

function formSubmit(){
    var form = document.getElementById("newMessageForm");
    var message = document.getElementById("txtMessage").value;
    newMsg(userName,message);
    document.getElementById("newMessageForm").reset();
}

function setUserName(){
    userName = prompt("Ingrese su nombre de usuario.");
}

