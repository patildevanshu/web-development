let addTask = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("input");

addTask.addEventListener("click" , function () {
    let item = document.createElement("li");
    item.innerText = inp.value;

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.classList.add("delete");

    item.appendChild(delBtn);
    ul.appendChild(item);
    inp.value = "";
});

ul.addEventListener("click" , function(event){
    if (event.target.nodeName == "BUTTON"){
        let par = event.target.parentElement;
        par.remove();
    }
    console.log("element deleted"); 
});

let delBtns = document.querySelectorAll(".delete");

// for(delBtn of delBtns){
//     delBtn.addEventListener("click" , function(){
//         console.log("element deleted"); 
//         let par = this.parentElement;
//         console.log(par);
//         par.remove();
//     })
// }