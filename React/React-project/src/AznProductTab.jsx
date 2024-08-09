import AmazonProduct from "./AmazonProduct";

export default function AznProductTab(){
    return (
        <div>
            <AmazonProduct title="Logitch MX Master"  price={75000} />
            <AmazonProduct title="Apple Pencil (Gen-2)"  price={60000} />
            <AmazonProduct title="Zebronics Zeb-transformer"  price={60000} />
            <AmazonProduct title=""  price={60000} />
            <AmazonProduct title="Phone"  price={60000} />
        </div>
    );
}