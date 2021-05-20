//methods run at every route to if logged in or not
fetch("/api/get_session").then(res => {
    return res.json();
}).then(data => {

    if(data.session == false){ //False: no session (not logged in)
        document.getElementById("login-btn").onclick=function(){window.location.href = "/login"};
    } else if(data.session == true){ //true: session "user" found (logged in)
        document.getElementById("login-btn").innerHTML = "Sign out";
        document.getElementById("login-btn").onclick=function(){
            fetch("/api/logout").then(res => {
                console.log(res);
                window.location.href = "/login"
            });
        }
    }
}).catch(error => {
    console.log("error: " + error);
});