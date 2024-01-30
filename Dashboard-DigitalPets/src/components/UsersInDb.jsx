import React from "react";
import User from "./User";

class UsersInDb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            titleMouseOver: false
        };
    }

    componentDidMount() {
        fetch('http://localhost:3030/api/users')
            .then(res => res.json())
            .then(users => {
                this.setState({ usersList: users.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleMouseOverTitle = () => {
        this.setState({ titleMouseOver: !this.state.titleMouseOver });
    };

    render() {
        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800" onMouseOver={this.handleMouseOverTitle}>Usuarios registrados en la Base de Datos</h5>
                    </div>
                    <div className={`card-body ${this.state.titleMouseOver ? 'bg-secondary' : ''}`}>
                        <div className="row">
                            {this.state.usersList.map((user, index) =>
                                <User name={user.firstName} key={index} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersInDb;
