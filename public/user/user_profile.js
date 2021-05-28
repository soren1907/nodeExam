fetch("/api/get_username").then(res => {
    return res.json();
}).then(data => {
    document.getElementById("username").innerText = "User : " + data.username;
}).catch(error => {
    console.log("error: " + error);
}); 

const message = document.getElementById('user-profile-message');

function deleteAccount(){
    const password = document.getElementById("confirm-delete").value
    fetch("/api/delete_account", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({password})
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.deleteSuccess == true){
            window.location.href = "/"
        } else {
            message.style.color= "red"
            message.innerText = 'Wrong username/password';
        }
    }).catch(error => {
        console.log(error);
    });
}

function signout(){
    fetch("/api/logout").then(res => {
        window.location.href = "/"
    });
}

function updatePassword(){
    const data = {
        oldPassword : document.getElementById("old_password").value,
        newPassword : document.getElementById("new_password").value
    }
    if(data.newPassword.length < 8){
        message.style.color= "red"
        message.innerText = 'New password too short';
        return;
    }
    fetch("/api/update_password", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(data)
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log("data: " + data)
        if (data.updateSuccess){
            message.style.color = "green"
            message.innerText = "Password updated"
        } else {
            message.style.color = "red"
            message.innerText = "Password not updated"
        }
    }).catch(error => {
        console.log(error);
    });
}