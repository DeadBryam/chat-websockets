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
socket.onopen = () => sendUser(userName);


function onMessage(event) {
    var chat = JSON.parse(event.data);
    
    if (chat.type === "users") {
        printUser(chat);
    } else {
        print(chat);
    }
}

function sendUser(us) {
    var varchida = {
        type: "users",
        user: us
    };
    socket.send(JSON.stringify(varchida));
}

function newMsg(user, message) {
    var Messag = {
        type: "msg",
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

function printUser(msg) {
    var cont = document.getElementById("conectados");

    var divConectados = document.createElement("div");
    divConectados.setAttribute("class", "connect");
    cont.appendChild(divConectados);

    var userConnect = document.createElement("span");
    userConnect.setAttribute("class", "username");
    userConnect.innerHTML = msg.user;
    divConectados.appendChild(userConnect);
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

    if (keyCode === 13) {
        formSubmit();
    }
}

function setUserName() {
    userName = prompt("Ingrese su nombre de usuario.");
}

