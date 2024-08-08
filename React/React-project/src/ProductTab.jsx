import Product from './Product.jsx';

function ProductTab(){
    // let features = [ "hi-tech" , "portable" , "durable" , "faster" ];
    // let features = [ <li>hi-tech</li> , <li>portable</li> , <li>durable</li> , <li>faster</li> ];
    // let option2 = { a :"hi-tech" , b :"portable" , c: "durable" , d: "faster" };
    // let obj = { a :"hi-tech" , b :"portable" , c: "durable" , d: "faster" };
    return (
        <div>
            <Product title="Phone"  price={9999} />
            <Product title="Computer"  price={60000} />
            <Product title="Laptop"  price={75000} />
        </div>
    );
}

export default ProductTab;