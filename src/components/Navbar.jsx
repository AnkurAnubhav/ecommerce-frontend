import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Ecommerce Store
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
                <Link to="/products" style={{ textDecoration: 'none' }}>Products</Link>
                <Link to="/cart" style={{ textDecoration: 'none' }}>Cart</Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;