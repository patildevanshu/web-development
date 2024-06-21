let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("submitted")
});

// access data

// form.addEventListener("submit" , function(event){
//     event.preventDefault();

//     // let un = document.querySelector("#Username");
//     let un = this.elements[0];
//     console.dir(un);
//     console.log(un.value);

//     // let pw = document.querySelector("#password");
//     let pw = this.elements[1];
//     console.dir(pw);
//     console.log(pw.value);
// } );

let user = document.querySelector("#Username");

user.addEventListener("change", function (event) {
    event.preventDefault();
    console.log(" change event");
    console.log(user.value);
});
user.addEventListener("input", function (event) {
    event.preventDefault();
    console.log("input event");
    console.log(user.value);
});