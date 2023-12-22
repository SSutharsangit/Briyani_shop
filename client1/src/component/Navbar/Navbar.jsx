import React from 'react';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const navStyle = {
    height: '60px',
    backgroundColor: '#e3f2fd',
  };

  const navbarBrandStyle = {
    color: '#FFBF00',
    fontSize: '2rem',
  };
  const navigate=useNavigate();
  const userdata =localStorage.getItem('userdata');
  const user= JSON.parse(userdata);
  const handleLogout=()=>{
    console.log("hiiii");
    navigate("/");
    localStorage.removeItem('userdata');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" style={navStyle}>
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" style={navbarBrandStyle}>
            JBriyani
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavLink to="/" className="nav-link" activeClassName="active-link">
                <button type="button" className="btn btn-outline-warning" style={{ marginRight: '30px' }}>
                  Home
                </button>
              </NavLink>
              <NavLink to="/items" className="nav-link" activeClassName="active-link">
                <button type="button" className="btn btn-outline-warning" style={{ marginRight: '30px' }}>
                  Items
                </button>
              </NavLink>
              <NavLink to="/cart" className="nav-link" activeClassName="active-link">
                <button type="button" className="btn btn-outline-warning" style={{ marginRight: '30px' }}>
                  Cart
                </button>
              </NavLink>
              <NavLink to="/about" className="nav-link" activeClassName="active-link">
                <button type="button" className="btn btn-outline-warning">
                  About
                </button>
              </NavLink>
            </ul>
            {user ? (
            <div style={{ display: "flex", alignItems: "center" }}>
            {user.profile && <img src={user.profile} alt="User Profile" style={{ marginRight: '10px', borderRadius: '50%', width: '40px', height: '40px' }} />}
            <p style={{ marginRight: '10px' }}>{user.username}</p>
            <button type="button" className="btn btn-warning" onClick={handleLogout}>
              Logout
            </button>
          </div>
) : (
  <>
    <Link to="/signup">
      <button type="button" className="btn btn-warning" style={{ marginRight: '10px' }}>
        Signup
      </button>
    </Link>
    <Link to="/login">
      <button type="button" className="btn btn-warning">
        Login
      </button>
    </Link>
  </>
)}

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
