import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Navigate } from 'react-router-dom';
import logo from '../assets/logovlu.png';

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
    };
  }

  render() {
    if (this.context.token !== '') {
      return <Navigate to="/admin/home" replace />;
    }

    return (
      <div className="login-container">
        <div className="login-box">

          {/* 🔥 LOGO + BRAND */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            
            <img
              src={logo}
              alt="logo"
              style={{
                width: "65px",
                height: "65px",
                objectFit: "contain",
                marginBottom: "10px",
                borderRadius: "12px"
              }}
            />

            <h2 style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1e3a8a",
              margin: 0
            }}>
              VLU Phone
            </h2>

            <p style={{
              fontSize: "13px",
              color: "#6b7280",
              marginTop: "5px"
            }}>
              Admin Management System
            </p>

          </div>

          {/* INPUT USERNAME */}
          <input
            type="text"
            placeholder="👤 Username"
            value={this.state.txtUsername}
            onChange={(e) =>
              this.setState({ txtUsername: e.target.value })
            }
          />

          {/* INPUT PASSWORD */}
          <input
            type="password"
            placeholder="🔒 Password"
            value={this.state.txtPassword}
            onChange={(e) =>
              this.setState({ txtPassword: e.target.value })
            }
          />

          {/* BUTTON */}
          <button
            className="btn btn-edit"
            style={{
              width: '100%',
              marginTop: '12px',
              padding: "10px",
              fontWeight: "bold",
              fontSize: "15px"
            }}
            onClick={(e) => this.btnLoginClick(e)}
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  btnLoginClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;
    if (txtUsername && txtPassword) {
      this.apiLogin({ username: txtUsername, password: txtPassword });
    } else {
      alert('Please input username and password');
    }
  }

  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;