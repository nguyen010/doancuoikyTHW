import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  render() {
    return (
      <div className="login-page">

        <div className="login-card">
          <h2>Create Account ✨</h2>
          <p className="login-sub">Sign up to get started</p>

          <form>

            <input
              type="text"
              placeholder="Username"
              value={this.state.txtUsername}
              onChange={(e) => this.setState({ txtUsername: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              value={this.state.txtPassword}
              onChange={(e) => this.setState({ txtPassword: e.target.value })}
            />

            <input
              type="text"
              placeholder="Full Name"
              value={this.state.txtName}
              onChange={(e) => this.setState({ txtName: e.target.value })}
            />

            <input
              type="tel"
              placeholder="Phone"
              value={this.state.txtPhone}
              onChange={(e) => this.setState({ txtPhone: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              value={this.state.txtEmail}
              onChange={(e) => this.setState({ txtEmail: e.target.value })}
            />

            <button onClick={(e) => this.btnSignupClick(e)}>
              SIGN UP
            </button>

          </form>

          {/* BONUS */}
          <p style={{ marginTop: "10px", fontSize: "13px" }}>
            Already have an account? <a href="/login">Login</a>
          </p>

        </div>

      </div>
    );
  }

  // event handlers
  btnSignupClick(e) {
    e.preventDefault();

    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;

    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const account = {
        username: txtUsername,
        password: txtPassword,
        name: txtName,
        phone: txtPhone,
        email: txtEmail
      };

      this.apiSignup(account);
    } else {
      alert('Please input username, password, name, phone and email');
    }
  }

  // API call
  apiSignup(account) {
    axios.post('/api/customer/signup', account)
      .then((res) => {
        const result = res.data;
        alert(result.message);

        if (result.success === true) {
          this.props.navigate('/login'); // 👉 chuyển sang login
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Signup error");
      });
  }
}

export default withRouter(Signup);