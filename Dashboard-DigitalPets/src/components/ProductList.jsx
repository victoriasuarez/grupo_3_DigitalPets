import PropTypes from 'prop-types';

function ProductList(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td>{props.stock}</td>
      <td>{props.discount}</td>
    </tr>
  );
}

ProductList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,  
  price: PropTypes.number,
  stock: PropTypes.number,
  discount: PropTypes.number
};

export default ProductList;