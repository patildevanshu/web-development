import "./Product.css";

import Price from "./Price";

export default function AmazonProduct({title , price}){
    return (
        <div className="Product">
            <p>Title</p>
            <p>Description</p>
            <Price/>
        </div>
    )
}