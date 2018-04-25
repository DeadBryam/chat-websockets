/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.WS;

import com.mycompany.res.Messages;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.ApplicationScoped;
import javax.json.JsonObject;
import javax.json.spi.JsonProvider;
import javax.websocket.Session;

/**
 *
 * @author bryan
 */
@ApplicationScoped
public class SessionHandler {
    
    JsonObject lastMsg;
    private final Set<Session> session = new HashSet<>();
    private final Set<Messages> msg = new HashSet<>();
    
    public void addSesion(Session se){
        session.add(se);
        for (Messages messages : msg) {
            JsonObject addMsg = newMsg(messages);
            send(se, addMsg);
        }
        
    }
    
    public void removeSession(Session se) {
        session.remove(se);
    }
    
    public List<Messages> getMessages(){
        return new ArrayList<>(msg);
    }
    
    public void addMsg(Messages msg){
        this.msg.add(msg);
    }
    
    public JsonObject newMsg(Messages msg){
        JsonProvider provider = JsonProvider.provider();
        JsonObject addMsg = provider.createObjectBuilder()
                .add("user", msg.getUser())
                .add("message", msg.getMessage())
                .build();
        lastMsg = addMsg;
        return addMsg;
    }
    
    public void showMsgs(){
        send2All(lastMsg);
    }
            
    private void send2All(JsonObject msg){
        for (Session s : session) {
            send(s, msg);
        }
    }
    
    public void send(Session se,JsonObject msg){
        try {
            se.getBasicRemote().sendText(msg.toString());
        } catch (IOException e) {
            session.remove(se);
            Logger.getLogger(SessionHandler.class.getName()).log(Level.SEVERE, null, e);
        }
    }
}
