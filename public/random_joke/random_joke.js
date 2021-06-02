newJoke();

function newJoke() {
    fetch("https://v2.jokeapi.dev/joke/Any")
    .then(response => response.json())
    .then(result => {
        const jokeDiv = document.getElementById("the-joke");
        const setup = document.getElementById("setup");
        const delivery = document.getElementById("delivery");
    
        if(result.type == "single") {
            setup.innerText = "";
            delivery.innerText = "";
            jokeDiv.innerText = result.joke;
        } else {
            jokeDiv.innerText = "",
            setup.innerText = result.setup;
            delivery.innerText = result.delivery;
        }
    });
}





