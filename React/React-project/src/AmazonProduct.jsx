import "./Product.css";

import Price from "./Price";

export default function AmazonProduct({ title, idx }) {
  let oldPrice = ["12495", "11900", "1599", "599"];
  let newPrice = ["8999", "9199", "899", "299"];
  let description = [
    ["8,000 DPI" , "5 Programable Buttons"],
    ["Intuitive Surface" ,"Designed for ipad"],
    ["Designed for ipad" , "Intuitive Surface"],
    ["Wireless Mouse" , "optical Orientation"],
  ];
  return (
    <div className="Product">
      <h4>{title}</h4>
      <p>{description[idx][0]}</p>
      <p>{description[idx][1]}</p>
      <Price oldPrice={oldPrice[idx]} newPrice={newPrice[idx]} />
    </div>
  );
}
