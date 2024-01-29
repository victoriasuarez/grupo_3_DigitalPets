import React from "react";

function LastProductnDb() {
    const [product, setProduct] = React.useState([
        
    ]);
    React.useEffect(() => {
        fetch(`http://localhost:3030/api/products/last-product`)
            .then(res => res.json())
            .then(response => {
                setProduct(response.data);
            })
            .catch(err => { console.log(err); });
    },[]);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto registrado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '40rem' }} src={`/images/${product.image}`} alt={product.name} />
                    </div>
                    <p>{product.description}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalles del producto</a>
                </div>
            </div>
        </div>
    );
}

export default LastProductnDb;