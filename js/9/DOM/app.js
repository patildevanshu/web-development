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


// let links = document.querySelectorAll('.pubInfo a');

// for(let i=0; i< links.length ; i++){
//     links[i].style.color = "red";
// }

let heading = document.querySelector('h1');
// console.log(heading.classList);

// heading.classList.add("head"); // to add new class
// console.log(heading.classList.contains("head")); // to check class contain or not
// heading.classList.remove("head"); // to remove class
// heading.classList.toggle("head"); // togglr between add or remove \\\ add <->toggle <-> 


// adding new element in html

let newp = document.createElement('p');
newp.innerText = "hii i am new para.";


let body = document.querySelector('body');

body.appendChild(newp);
heading.appendChild(newp);
// copies were not created 


newp.append("this is text added by appending.");
heading.removeChild(newp);

heading.appendChild(newp);
newp.remove();