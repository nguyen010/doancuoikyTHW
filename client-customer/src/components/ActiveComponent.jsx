import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }

  render() {
    return (
      <div className="login-page">

        <div className="login-card">
          <h2>Activate Account 🔐</h2>
          <p className="login-sub">Enter your ID and activation token</p>

          <form>

            <input
              type="text"
              placeholder="User ID"
              value={this.state.txtID}
              onChange={(e) =>
                this.setState({ txtID: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Activation Token"
              value={this.state.txtToken}
              onChange={(e) =>
                this.setState({ txtToken: e.target.value })
              }
            />

            <button onClick={(e) => this.btnActiveClick(e)}>
              ACTIVATE
            </button>

          </form>

        </div>

      </div>
    );
  }

  // event handlers
  btnActiveClick(e) {
    e.preventDefault();

    const id = this.state.txtID;
    const token = this.state.txtToken;

    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }

  // call API
  apiActive(id, token) {
    const body = { id: id, token: token };

    axios.post('/api/customer/active', body)
      .then((res) => {
        const result = res.data;

        if (result) {
          alert('OK BABY!');
        } else {
          alert('SORRY BABY!');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Active error');
      });
  }
}

export default Active;