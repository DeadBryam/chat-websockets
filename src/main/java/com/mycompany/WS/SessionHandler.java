/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.WS;

import com.mycompany.res.Chat;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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

    private final List<Session> session = new ArrayList<>();
    private final List<Chat> chat = new ArrayList<>();
    private final List<String> users = new ArrayList<>();

    public void addSesion(Session se) {
        session.add(se);
        for (Chat messages : chat) {
            JsonObject addMsg = newMsg(messages);
            send(se, addMsg);
        }

        for (String us : users) {
            JsonObject addUs = newUser(us);
            send(se, addUs);
        }

        System.out.println(getMessages());
    }

    public void removeSession(Session se) {
        session.remove(se);
    }

    public List<Chat> getMessages() {
        return new ArrayList<>(chat);
    }

    /**
     *
     * @param msg
     */
    public void addMsg(Chat msg) {
        this.chat.add(msg);
        send2All(newMsg(msg));
    }

    public void addUser(String us) {
        if (!users.contains(us)) {
            this.users.add(us);
            send2All(newUser(us));
        }
    }

    public void removeUser(String us) {
        if (users.contains(us)) {
            this.users.remove(us);
            JsonProvider provider = JsonProvider.provider();
        JsonObject removeUser = provider.createObjectBuilder()
                .add("type", "remove")
                .add("user", us)
                .build();
            send2All(removeUser);
        }
    }
    
    public JsonObject newMsg(Chat msg) {
        JsonProvider provider = JsonProvider.provider();
        JsonObject addMsg = provider.createObjectBuilder()
                .add("type", "msg")
                .add("user", msg.getUser())
                .add("message", msg.getMessage())
                .build();
        return addMsg;
    }

    public JsonObject newUser(String user) {
        JsonProvider provider = JsonProvider.provider();
        JsonObject addUser = provider.createObjectBuilder()
                .add("type", "users")
                .add("user", user)
                .build();
        return addUser;
    }

    private void send2All(JsonObject msg) {
        for (Session s : session) {
            send(s, msg);
        }
    }

    public void send(Session se, JsonObject msg) {
        try {
            se.getBasicRemote().sendText(msg.toString());
        } catch (IOException e) {
            session.remove(se);
            Logger.getLogger(SessionHandler.class.getName()).log(Level.SEVERE, null, e);
        }
    }
}
