import PropTypes from "prop-types";

function Product({ title, price }) {
    let styles = { backgroundColor: price>10000 ? "gray" : "" };
  return (
    <div className="Product" style={styles}>
      <h2>{title}</h2>
      <p>Price : {price}</p>
      {price > 10000 ? <p>discount : 5% </p> : null }
    </div>
  );
}

// function Product({ title , price }){
//     if (price >= 10000){
//         return(
//             <div className="Product">
//                 <h2>{ title }</h2>
//                 <p>Price : {price}</p>
//                 {/* <p>{features.map((feature)=> <l i>{feature}</li>)}</p> */}
//                 <p>Discount : 5%</p>
//             </div>
//         )
//     }
//     else{
//         return(
//             <div className="Product">
//                 <h2>{ title }</h2>
//                 <p>Price : {price}</p>
//                 {/* <p>{features.map((feature)=> <l i>{feature}</li>)}</p> */}
//             </div>
//         )
//     }

// }

Product.propTypes = {
  title: PropTypes.string,
  features: PropTypes.array,
  price: PropTypes.number,
};

export default Product;
