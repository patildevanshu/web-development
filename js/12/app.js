let url = "https://catfact.ninja/fact";
let url2 = "https://dog.ceo/api/breeds/image/random";

let btn = document.querySelector("#facct");

btn.addEventListener("click" , async () => {
    let fact = await getFact();
    console.log(fact);

    let res = document.querySelector("#factss");
    res.innerText = fact;
});

async function getFact(){
    try {
        let res = await axios.get(url);
        return res.data.fact;
    } catch (error) {
        console.log("Error - " , error);
        return "No Fact Found";
    }
}


let btn2 = document.querySelector("#imgg");

btn2.addEventListener("click" , async () => {
    let link = await getImg();
    console.log(link);

    let ress = document.querySelector("#imggg");
    ress.setAttribute("src", link);
});

async function getImg(){
    try {
        let res = await axios.get(url2);
        return res.data.message;
    } catch (error) {
        console.log("Error - " , error);
        return "No image Found";
    }
}









// adding just a comment

// fetch(url)
// .then((response) => {
//     console.log(response);
//     return response.json();
// })
// .then((data) => {
//     console.log(data);
// })
// .catch((err) => {
//     console.log("error -" , err);
// })