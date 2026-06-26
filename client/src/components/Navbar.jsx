import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Cartify</h2>
    
 <div>
  <Link to="/">Home</Link>

  <Link to="/products">Products</Link>

  <Link to="/login">Login</Link>

  <Link to="/register">Register</Link>

  <Link to="/cart">Cart</Link>

  <Link to="/orders">Orders</Link>
</div>
    </nav>
  );
}

export default Navbar;