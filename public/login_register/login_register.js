const message = document.getElementById('message');

function sendLoginData(){
    const data = {
        username: document.getElementById("username-login").value,
        password: document.getElementById("password-login").value
    };
    fetch("/api/login", {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.loginSuccess == true){
            window.location.href = "/";
        } else {
            message.style.color = "red";
            message.innerText = 'Wrong username/password';
        }
    }).catch(error => {
        console.log(error);
    });
}

function sendRegisterData(){
    const data = {
        username: document.getElementById("username-register").value,
        password: document.getElementById("password-register").value,
        password2: document.getElementById("password-register2").value,
    };
    if(data.password.length < 8){
        message.style.color= "red"
        message.innerText = 'Password too short';
        return;
    }
    if(data.password != data.password2){
        message.style.color= "red"
        message.innerText = 'Passwords do not match';
        return;
    }
    fetch("/api/register", {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify(data)
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.registerSuccess){
            message.style.color= "green";
            message.innerText = 'User was created';
        } else {
            message.style.color= "red";
            message.innerText = 'Username already exists';
        }
    }).catch(error => {
        console.log(error);
    });
}

