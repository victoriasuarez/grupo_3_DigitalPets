import ProductList from './ProductList';
import {useState, useEffect} from 'react'

function Product() {
    const [products, setProducts] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3030/api/products')
            .then(res => res.json())
            .then(products => {
                setProducts(products.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const sortProducts = (columnName) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === columnName && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key: columnName, direction: direction });
    };

    useEffect(() => {
        if (sortConfig !== null) {
            setProducts(products.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }));
        }
    }, [sortConfig,products]);

    return (
        <>
            {/*<!-- PRODUCTS LIST -->*/}
            <h1 className="h3 mb-2 text-gray-800 ">Productos registrados en la Base de Datos</h1>

            {/*<!-- DataTales Example -->*/}
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                                <tr>
                                    <th style={{cursor: 'pointer'}} onClick={() => sortProducts('id')}>Id</th>
                                    <th style={{cursor: 'pointer'}} onClick={() => sortProducts('name')}>Nombre</th>
                                    <th style={{cursor: 'pointer'}} onClick={() => sortProducts('price')}>Precio</th>
                                    <th style={{cursor: 'pointer'}} onClick={() => sortProducts('stock')}>Stock</th>
                                    <th style={{cursor: 'pointer'}} onClick={() => sortProducts('discount')}>Descuento</th>
                                </tr>
                            </thead>
                            {/* <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Descuento</th>
                                </tr>
                            </thead> */}
                            <tbody>
                                {products.map((product, index) =>
                                    <ProductList  {...product} key={index} />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;