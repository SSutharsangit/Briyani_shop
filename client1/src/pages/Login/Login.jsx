import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formdata, setFormdata] = useState({
    username: '',
    password: '',
  });
  const [response, setResponse] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/auth/login", formdata);
      if (response.data.success) {
        navigate("/");
        localStorage.setItem('userdata', JSON.stringify(response.data.rest));
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className='container' style={{ maxWidth: '400px',marginTop:"60px"  }}>
      <p className='text-center fw-semibold fs-3'>Sign In</p>

      <div className="mb-3">
        <label htmlFor="Email1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          aria-describedby="emailHelp"
          value={formdata.Username}
          onChange={handleInputChange}
        />
        <p style={{ color: 'red' }}>
          {error === "User not found" ? "User not found" : ""}
        </p>
      </div>
      <div className="mb-3">
        <label htmlFor="Password1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={formdata.password}
          onChange={handleInputChange}
        />
        <p style={{ color: 'red' }}>
          {error === "Incorrect password" ? "Incorrect password" : ""}
        </p>
      </div>
      <div className="row my-6">
        <button type="submit" className="btn btn-primary my-2" disabled={loading}>
          {loading ? 'Signing In...' : 'SIGN IN'}
        </button>
      </div>
      <p>
        Don't Have an account?
        <Link to="/Signup">
          <span className='text-primary'>Sign up</span>
        </Link>
      </p>
    </form>
  );
}

export default Login;
