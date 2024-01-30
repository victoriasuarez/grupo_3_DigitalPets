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
    }, [keyword]);

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
                    <div className="row products">
                        <div className="col-12">
                            <h2>Productos para la palabra: {keyword}</h2>
                        </div>
                        {/* Listado de productos */}
                        {
                            products.length > 0 && products.map((product, i) => {

                                return (
                                    <div className="conteiner" key={i}>
                                        
                                            <article>
                                                <h5 className="product-name">{product.name} </h5>
                                                <img src={`images/${product.image}`} alt={product.name}/>
                                                    <div className="product-details">
                                                        <p className="price">${product.price}</p>
                                                        <p className="stock">Stock: {product.stock}</p>
                                                    </div>

                                            </article>
                                            
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
