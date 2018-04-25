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
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author bryan
 */

@ApplicationScoped
@ServerEndpoint("/chat")
public class ChatWebSocket {
    
    @Inject
    private SessionHandler sh;
    
    @OnOpen
    public void open(Session se){
        sh.addSesion(se);
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
    public void msg(String msg,Session se){
        try (JsonReader reader = Json.createReader(new StringReader(msg))) {
            JsonObject jsonMessage = reader.readObject();
            
            Chat chatMsg = new Chat();
            chatMsg.setUser(jsonMessage.getString("user"));
            chatMsg.setMessage(jsonMessage.getString("message"));
            sh.addMsg(chatMsg);
            
        } catch (Exception e) {
        }
    }
}
