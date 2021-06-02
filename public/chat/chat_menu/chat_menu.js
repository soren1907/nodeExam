let username = "";

fetch("/api/get_username").then(res => {
    return res.json();
}).then(data => {
    username = data.username;
    document.getElementById("username").innerText = data.username;
}).catch(error => {
    console.log("error: " + error);
}); 

function goToRoom(room){	
	window.location.href = "/chat_room?username=" + username + "&room=" + room;
}