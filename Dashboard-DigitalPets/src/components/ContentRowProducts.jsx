import SmallCard from "./SmallCard";
import {useState,useEffect} from "react";
function ContentRowProducts() {
    const [metadataProduct, setProduct] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:3030/api/products/`)
            .then(res => res.json())
            .then(response => {
                setProduct(response.meta);
            })
            .catch(err => { console.log(err); });
    },[]);
    const [metadataUser, setUser] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:3030/api/users/`)
            .then(res => res.json())
            .then(response => {
                setUser(response.meta);
            })
            .catch(err => { console.log(err); });
    },[]);

    return (
        <div className="row">

            {/* <!-- Products in Data Base --> */}
            <SmallCard title="Productos en la Base de Datos" color="primary" quantity={metadataProduct.total} icon="fa-film" />

            {/* <!-- Users in Data Base --> */}
            <SmallCard title="Usuarios en la Base de Datos" color="success" quantity={metadataUser.total} icon="fa-award" />

            {/* <!-- Brands in Data Base --> */}
            <SmallCard title="Marcas registradas" color="warning" quantity={6} icon="fa-user" />
        </div>
    );
}

export default ContentRowProducts;