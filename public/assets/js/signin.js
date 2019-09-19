$(document).ready(function(){
    // GET ALL EMPLOYEES
    //alert("hello world!")
    $('.signin-button').click(function(e){
        e.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        //alert(email, password)
        if(email == "admin@decagon.com" && password=="issa") {
          //  alert("Admin Signed In");
            window.location.href = "http://localhost:3000/index.html";
        }else{
    //alert ("Incorrect Credentials")
        }
       
    });
});