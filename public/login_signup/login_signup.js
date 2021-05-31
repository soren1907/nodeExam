const message = document.getElementById('message')


function sendLoginData(){
    const data = {
        username: document.getElementById("username_login").value,
        password: document.getElementById("password_login").value
    }
    fetch("/api/login", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.loginSuccess == true){
            window.location.href = "/"
        } else {
            console.log("login failed");
            message.style.color = "red"
            message.innerText = 'Wrong username/password';
        }
    }).catch(error => {
        console.log(error);
    });
}

function sendSignupData(){
    const data = {
        username: document.getElementById("username_signup").value,
        password: document.getElementById("password_signup").value,
        password2: document.getElementById("password_signup2").value,
    }
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
    fetch("/api/signup", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data)
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.signupSuccess){
            message.style.color= "green"
            message.innerText = 'User was created';
        } else {
            message.style.color= "red"
            message.innerText = 'Username already exists';
        }
    }).catch(error => {
        console.log(error);
    });
}

