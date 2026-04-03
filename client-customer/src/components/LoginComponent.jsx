import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    return (  
      <div className="login-page">

        <div className="login-card">
          <h2>Đăng Nhập 👋</h2>
          <p className="login-sub">Login to your account</p>

          <form>
            <input
              type="text"
              placeholder="Username"
              value={this.state.txtUsername}
              onChange={(e) =>
                this.setState({ txtUsername: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={this.state.txtPassword}
              onChange={(e) =>
                this.setState({ txtPassword: e.target.value })
              }
            />

            <button onClick={(e) => this.btnLoginClick(e)}>
              LOGIN
            </button>
          </form>

          {/* 🔥 THÊM SIGNUP LINK */}
          <p className="login-link">
            Bạn chưa có tài khoản?{" "}
            <span onClick={() => this.props.navigate('/signup')}>
              Đăng ký ngay
            </span>
          </p>

        </div>

      </div>
    );
  }

  // event handlers
  btnLoginClick(e) {
    e.preventDefault();

    const username = this.state.txtUsername;
    const password = this.state.txtPassword;

    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  // api
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;

      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}

const LoginWithRouter = withRouter(Login);
export default LoginWithRouter;