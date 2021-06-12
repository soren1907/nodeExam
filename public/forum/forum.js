getMassages();

function getMassages(){

    fetch("/api/get_messages").then(res => {
        return res.json();
    }).then(data => {
        showMessage(data.messages)
    }).catch(error => {
        console.log("error: " + error);
    }); 
 
}

function showMessage(messageList) {
    console.log(messageList)
    let messages = document.getElementById("forum-body");

    messageList.map(data => {
        let content = document.createElement("PRE");
        content.appendChild(document.createTextNode(data.username + ": " + data.date + "\n" + data.message));
        messages.appendChild(content);
    })
} 


function sendMessage() {
    const date = new Date();
    let msg = document.getElementById("forum-message").value;

    msgFixed = msg.replace(/  +/g, ' ').trim();
    if(!msgFixed) {
        return
    }

    const data = {
        message: msgFixed,
        date: date.toLocaleString()
    };

    fetch("/api/send_message", {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json()) 
    .then(data => {

        if (data.messageSuccess == true){
            window.location.href = "/forum";
        } else {
           console.log("error: message not sent")
        }

    }).catch(error => {
        console.log(error);
    });
}