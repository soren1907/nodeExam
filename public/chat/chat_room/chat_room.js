// creating the client socket and connecting to the server socket
const socket = io();

//getting username and room name from url parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const room = urlParams.get('room')
const username = urlParams.get('username')
const messageArea = document.getElementById("message-area")

//set room name in header
document.getElementById("room-name").innerText = room;

// Let server know when client joins room
socket.emit('joinRoom', {username, room});

//sending message to server
function sendMessage() {
    let msg = document.getElementById("send-message").value
    message = msg.replace(/\s+/g, ' ').trim()
    if(!message) {
        return
    }
    console.log(username, message, room)
    socket.emit('sendMessage', {username, message, room});
    document.getElementById("send-message").value = "";
}

// Message from server
socket.on('sendMessageBack', ({username, message}) => {
    console.log(username, message);
    showMessage(username, message);
  
    // Scroll down
    messageArea.scrollTop = messageArea.scrollHeight;
});

//Get number of users in a room
socket.on('onlineUsers', (numOfUsers) => {
    showNumOfUsers(numOfUsers)
});
 



function leaveRoom(){
    window.location.href = "/chat_menu"
}



function showMessage(username, message) {
    let messages = document.getElementById("message-area");
    let content = document.createElement("PRE")
    content.appendChild(document.createTextNode(username + ": " + message));
    messages.appendChild(content);
} 

function showNumOfUsers(numOfUsers) {

    document.getElementById("num-of-users").innerText = "Users online: " + numOfUsers;
 
}




 











