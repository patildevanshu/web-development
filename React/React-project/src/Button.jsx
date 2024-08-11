function doSomething(){
    console.log("clicked");
}
function handleMouseOver(){
    console.log("mouseOver");
}
function handleDblClick(){
    console.log("dblClick");
}

export default function Button(){
    return(
        <div>
            <button onClick={doSomething}>Cick me!</button>
            <p onMouseOver={handleMouseOver} >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore blanditiis voluptatum a, iusto ipsam aliquid cum commodi, corporis quae accusamus reprehenderit doloribus incidunt voluptas dicta ipsa enim, illum delectus vel!
            </p>
            <button onDoubleClick={handleDblClick} >Double Click me</button>
        </div>
    )
}