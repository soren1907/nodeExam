// method runs when clicking the login button
function sendLoginData(){
    const data = {
        username: document.getElementById("username_login").value,
        password: document.getElementById("password_login").value
    }
    console.log(data)
    fetch("/api/login", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data)
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data.msg);
        if (data.loggedIn == true){
            window.location.href = "/"
        } else {
            console.log("login failed");
            var div = document.getElementById('login-error');
            div.innerHTML = 'Wrong username/password';
        }
    }).catch(error => {
        console.log(error + "addsdasd");
    });
}