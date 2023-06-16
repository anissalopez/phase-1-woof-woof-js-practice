//variables for DOM Elements 

const dogDiv = document.querySelector('#dog-bar');
const dogInfoDiv = document.querySelector('#dog-info');
let filterDogs = document.querySelector('#good-dog-filter');

//variable for puppy data 
let pups;

//Event Listeners 
document.addEventListener("DOMContentLoaded", fetchPups);
filterDogs.addEventListener("click", () => filterPups(pups));

function fetchPups(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then((data) => {
        pups = data;
        renderPups(pups);
    })
};

function renderPups(pups){
    pups.forEach((pup) => {
        const name = document.createElement('span');
        name.textContent = pup.name;
        dogDiv.appendChild(name);
        name.addEventListener("click", () => dogInfo(pup));
});
};

function filterPups(){
    if(filterDogs.textContent === `Filter good dogs: OFF`){
        filterDogs.textContent = `Filter good dogs: ON`
        dogDiv.textContent = ""
        pups.forEach((pup) => {
            if (pup.isGoodDog === true){
                const name = document.createElement('span');
                name.textContent = pup.name;
                dogDiv.appendChild(name);
                name.addEventListener("click", () => dogInfo(pup));
            };
        });
    }
    else if(filterDogs.textConent = `Filter good dogs: ON`){
        filterDogs.textContent = `Filter good dogs: OFF`;
        renderPups(pups);
    };
};

function dogInfo(pup){
    const img = document.createElement('img');
    const name = document.createElement('h2');
    const btn =  document.createElement('button');

    img.src = pup.image;
    name.textContent = pup.name;

    btn.textContent = pup.isGoodDog === true ? `Good Dog!` : `Bad Dog!`;

    dogInfoDiv.appendChild(img);
    dogInfoDiv.appendChild(name);
    dogInfoDiv.appendChild(btn);

    btn.addEventListener("click", () => {
        btn.textContent = btn.textContent === `Good Dog!` ? `Bad Dog!` : `Good Dog!`
        pup.isGoodDog = btn.textContent;

        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: 'PATCH',
             body: JSON.stringify({
             isGoodDog: pup.isGoodDog,
             }),
             headers: {
                 'Content-type': 'application/json; charset=UTF-8',
             },
        });
   });
};


