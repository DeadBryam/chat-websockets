/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.WS;

import com.mycompany.res.Chat;
import java.io.StringReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author bryan
 */

@ApplicationScoped
@ServerEndpoint(value = "/chat/{user}")
public class ChatWebSocket {
    private Chat chatMsg;
    
    @Inject
    private SessionHandler sh;
    
    @OnOpen
    public void open(Session se,@PathParam("user") String user){
        sh.addSesion(se,user);
    }
    
    @OnClose
    public void close(Session se){
        sh.removeSession(se);
    }
    
    @OnError
    public void Error(Throwable error){
        Logger.getLogger(ChatWebSocket.class.getName()).log(Level.SEVERE,null,error);
    }
    
    @OnMessage
    public void msg(String msg,Session se,@PathParam("user") String user){
        try (JsonReader reader = Json.createReader(new StringReader(msg))) {
            JsonObject jsonMessage = reader.readObject();
            
            switch (jsonMessage.getString("type")) {
                case "msg":
                    chatMsg = new Chat();
                    //chatMsg.setUser(jsonMessage.getString("user"));
                    chatMsg.setUser(user);
                    chatMsg.setMessage(jsonMessage.getString("message"));
                    sh.addMsg(chatMsg);
                    break;
                case "users":
                    //sh.addUser(jsonMessage.getString("user"));
                    sh.addUser(user);
                    break;
                case "remove":
                    //sh.removeUser(jsonMessage.getString("user"));
                    sh.removeUser(user);
                    break;
                default:
                    break;
            }
            
        } catch (Exception e) {
        }
    }
    
}
