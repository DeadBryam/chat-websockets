/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = setUserName();
window.addEventListener("beforeunload", function (e) {
    closeSession();
    (e || window.event).returnValue = null;
    return null;
});

var host = location.origin.replace(/^http/, 'ws');
host += "/testChatWS/chat/" + userName;

var socket = new WebSocket(host);
socket.onmessage = onMessage;

var userName;
socket.onopen = () => sendUser(userName);

function onMessage(event) {
    var chat = JSON.parse(event.data);
    console.log(chat.type);

    if (chat.type === "users") {
        printUser(chat);
    } else if (chat.type === "msg") {
        print(chat);
    } else if (chat.type === "remove") {
        document.getElementById(chat.user).remove();
    }
    bajarScroll();
}

function sendUser(us) {
    sendMsg(userName, "¡Se ha conectado!");
    var varchida = {
        type: "users",
        user: us
    };
    socket.send(JSON.stringify(varchida));
}

function sendMsg(user, message) {
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
    divConectados.setAttribute("id", msg.user);
    cont.appendChild(divConectados);

    var userConnect = document.createElement("p");
    userConnect.setAttribute("class", "username");
    userConnect.innerHTML = msg.user;
    divConectados.appendChild(userConnect);
}

function formSubmit() {
    var message = document.getElementById("txtMessage").value;
    sendMsg(userName, message);
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

function bajarScroll() {
    const sc = document.getElementById("chatArea");
    sc.scrollTop = sc.scrollHeight;
}

function closeSession() {
    var remove = {
        type: "remove",
        user: userName
    };
    sendMsg(userName, "¡Se ha desconectado!");
    socket.send(JSON.stringify(remove));
}

function setUserName() {
    userName = "";
    var n = location + "";
    n = n.replace(/.*html[?]/, "");

    if (n.includes("user=")) {
        n = n.replace("user=", "");
        userName = n;
    } else {
        location.href = (location + "").replace(/[/]chat.*/, "");
    }

    if (userName === "" || userName === null) {
        location.href = (location + "").replace(/[/]chat.*/, "");
    }


}