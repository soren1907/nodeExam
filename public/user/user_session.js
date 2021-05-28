//methods run at every route to if logged in or not
fetch("/api/get_session").then(res => {
    return res.json();
}).then(data => {
    if(data.session){ //true: session "user" found (logged in)
        
        document.getElementById("login-btn").innerText = "Sign out";
        document.getElementById("login-btn").onclick=function(){
            fetch("/api/logout").then(res => {
                console.log(res);
                window.location.href = "/"
            });
        }
        const userIcon = document.createElement("img");
        userIcon.src = "/resources/user.png"
        userIcon.style.width = "32px";
        userIcon.style.height = "32px";
        userIcon.onclick=function(){window.location.href = "/profile"};
        const link = document.getElementById("user-profile-icon")
        link.appendChild(userIcon)

    } else { //False: no session (not logged in) 
        document.getElementById("login-btn").onclick=function(){window.location.href = "/login"};
    }

}).catch(error => {
    console.log("error: " + error);
}); 