/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = setUserName();
var host = location.origin.replace(/^http/, 'ws');
host += "/testChatWS/chat";

var socket = new WebSocket(host);
socket.onmessage = onMessage;

var userName;

function onMessage(event) {
    var chat = JSON.parse(event.data);
    print(chat);
}

function newMsg(user, message) {
    var Messag = {
        user: user,
        message: message
    };
    socket.send(JSON.stringify(Messag));
}

function print(msg) {
    var cont = document.getElementById("chatArea");

    var msgDiv = document.createElement("div");
    if (msg.user === userName) {
        msgDiv.setAttribute("class", "msgMe");
    } else {
        msgDiv.setAttribute("class", "msgSelf");
    }
    cont.appendChild(msgDiv);

    var msgUser = document.createElement("span");
    msgUser.setAttribute("class", "username");
    msgUser.innerHTML = msg.user + ":   ";
    msgDiv.appendChild(msgUser);

    var msgMessage = document.createElement("span");
    msgMessage.setAttribute("class", "userMessage");
    msgMessage.innerHTML = msg.message;
    msgDiv.appendChild(msgMessage);
}

function formSubmit() {
    var form = document.getElementById("newMessageForm");
    var message = document.getElementById("txtMessage").value;
    newMsg(userName, message);
    document.getElementById("txtMessage").value = " ";
}

function pulsar(e) {
    if (window.event)
        keyCode = window.event.keyCode;
    else if (e)
        keyCode = e.which;

    if(keyCode === 13){
        formSubmit();
    }
}

function setUserName() {
    userName = prompt("Ingrese su nombre de usuario.");
}

