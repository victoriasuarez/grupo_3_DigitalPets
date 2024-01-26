import ProductList from './ProductList';

const products = [
    {
        id: 1,
        name: 'Nombre producto',
        price: 2,
        stock: 3,
        discount: 4,
    },
    {
        id: 2,
        name: 'Nombre producto2',
        price: 4,
        stock: 5,
        discount: 6,
    }
];

function Product() {
    return (
        <>
            {/*<!-- PRODUCTS LIST -->*/}
            <h1 className="h3 mb-2 text-gray-800 ">All the products in the Database</h1>

            {/*<!-- DataTales Example -->*/}
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Descuento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((Product, index) =>
                                    <ProductList  {...Product} key={index} />
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