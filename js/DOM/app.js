// let smallImg = document.getElementsByClassName("oldImg");

// for(let i = 0 ; i<smallImg.length ; i++){
//     smallImg[i].src = "./Assets/Spider-Man.png";
// }

// document.getElementById("main-image");

// console.dir(document.querySelector('h1'));
// console.dir(document.querySelector('#main-image'));
// console.dir(document.querySelector('.oldImg'));
// console.dir(document.querySelector("div a"));
// console.dir(document.querySelectorAll("div a"));


let links = document.querySelectorAll('.pubInfo a');

for(let i=0; i< links.length ; i++){
    links[i].style.color = "red";
}