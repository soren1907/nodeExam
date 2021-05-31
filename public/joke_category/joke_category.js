const joke1 = document.getElementById("joke1");
const joke2 = document.getElementById("joke2");
const joke3 = document.getElementById("joke3");
const categoryHeader = document.getElementById("category-name");
let currentCategory = ""

getJokes("programming");

function getJokes(category) {

    categoryHeader.innerText = category
    currentCategory = category
    fetch("https://v2.jokeapi.dev/joke/" + category + "?amount=3")
    .then(response => response.json())
    .then(result => {

        clearJokes();
        if(result.jokes[0].type == "single"){
            joke1.innerText = result.jokes[0].joke
        } else {
            joke1.innerText = result.jokes[0].setup + ".. " + result.jokes[0].delivery
        }

        if(result.jokes[1].type == "single"){
            joke2.innerText = result.jokes[1].joke
        } else {
            joke2.innerText = result.jokes[1].setup + ".. " + result.jokes[1].delivery
        }

        if(result.jokes[2].type == "single"){
            joke3.innerText = result.jokes[2].joke
        } else {
            joke3.innerText = result.jokes[2].setup + ".. " +result.jokes[2].delivery
        }
    });
}

function clearJokes(){
    joke1.innerText = ""
    joke2.innerText = ""
    joke3.innerText = ""
}

function moreJokes(){
    getJokes(currentCategory);
}