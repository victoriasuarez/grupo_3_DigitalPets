import { Link } from "react-router-dom";

function SideBar() {
    return (
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon">
                    <img className="w-100" src="/images/LogoDigitalPets.png" alt="Digital Pets" />
                </div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard - DigitalPets</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Acciones</div>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/last-product">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Último Producto</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Usuarios</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/products">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Productos</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/search">
                    <i className="fas fa-search"></i>
                    <span>Buscar</span>
                </Link>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    );
}

export default SideBar;