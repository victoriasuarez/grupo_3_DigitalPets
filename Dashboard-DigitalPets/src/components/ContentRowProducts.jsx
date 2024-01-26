import SmallCard from "./SmallCard";

function ContentRowProducts() {
    return (
        <div className="row">

            {/* <!-- Products in Data Base --> */}
            <SmallCard title="Products in Data Base" color="primary" quantity={21} icon="fa-film" />

            {/* <!-- Total awards --> */}
            <SmallCard title="Total awards" color="success" quantity={79} icon="fa-award" />

            {/* <!-- Actors quantity --> */}
            <SmallCard title="Actors quantity" color="warning" quantity={49} icon="fa-user" />
        </div>
    );
}

export default ContentRowProducts;