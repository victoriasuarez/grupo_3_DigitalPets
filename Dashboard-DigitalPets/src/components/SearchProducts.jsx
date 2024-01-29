import React from "react";

function SearchProducts() {
    const [products, setProducts] = React.useState([
        
    ]);
    const [keyword, setKeyword] = React.useState('');




    const handleSearch = React.useCallback((event) => {
        event.preventDefault();
        fetch(`http://localhost:3030/api/products/search?s=${keyword}`)
            .then(res => res.json())
            .then(data => {
                if (data.Search) {
                    setProducts(data.Search);
                }
                if (data.Error) {
                    setProducts([]);
                }
            })
            .catch(err => { console.log(err); });
    }, [keyword]);

    React.useEffect(() => {
        fetch(`http://localhost:3030/api/products/search?s=${keyword}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.Search);
            })
            .catch(err => { console.log(err); });
    });

    return (
        <div className="container-fluid">
            {

                <>
                    <div className="row my-4">
                        <div className="col-12 col-md-6">
                            {/* Buscador */}
                            <form onSubmit={handleSearch}>
                                <div className="form-group">
                                    <label htmlFor="">Buscar por nombre:</label>
                                    <input type="text" className="form-control" onChange={(event) => setKeyword(event.target.value)} />
                                </div>
                                <button className="btn btn-info">Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>Productos para la palabra: {keyword}</h2>
                        </div>
                        {/* Listado de productos */}
                        {
                            products.length > 0 && products.map((product, i) => {
                                const pathImage = '/public/images/'+product.image;
                                return (
                                    <div className="col-sm-6 col-md-3 my-4" key={i}>
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h5 className="m-0 font-weight-bold text-gray-800">{product.name}</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <img
                                                        className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                                        
                                                        src={pathImage}
                                                        alt={product.name}
                                                        style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <p>{product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {products.length === 0 && <div className="alert alert-warning text-center">No se encontraron productos</div>}
                </>
            }
        </div>
    );
}

export default SearchProducts;
