import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <div className="container">
    <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signin">Sign in</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign up</Link>
        </li>

      </ul>
    </div>
    
    </>
  );
}

export default Navbar;
