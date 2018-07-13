/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function formSubmit(){
      var user = document.getElementById("txtUser").value;
      if(user === null || user === ""){
        alert("Ingrese un usuario");
      }else{
        location.href = location+"chat-page.html?user="+user;
      }
}


