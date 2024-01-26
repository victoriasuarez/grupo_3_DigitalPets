import PropTypes from 'prop-types';

function User(props) {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    {props.name}
                </div>
            </div>
        </div>
    );
}

User.propTypes = {
    name: PropTypes.string
};


export default User;