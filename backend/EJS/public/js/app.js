const btns = document.querySelectorAll("button");

for(btn of btns) {
    btn.addEventListener("click", function() {
        alert("Button clicked");
    });
}