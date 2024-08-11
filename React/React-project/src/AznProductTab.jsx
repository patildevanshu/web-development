import AmazonProduct from "./AmazonProduct";

export default function AznProductTab(){
    let styles = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        // gap: '10px'
    }
    return (
        <div style={styles}>
            <AmazonProduct title="Logitch MX Master" idx={0} />
            <AmazonProduct title="Apple Pencil (Gen-2)" idx={1} />
            <AmazonProduct title="Zebronics Zeb-transformer" idx={2} />
            <AmazonProduct title="Petronics Toad 26" idx={3} />
        </div>
    );
}