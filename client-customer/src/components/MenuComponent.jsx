import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import axios from 'axios';
import logo from '../assets/logovlu.png';
import MyContext from '../contexts/MyContext';

class Menu extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtKeyword: '',
      categories: []
    };

    this.btnSearchClick = this.btnSearchClick.bind(this);
  }

  render() {
    return (
      <div className="header">

        {/* ===== TOP BAR ===== */}
        <div className="header-top">

          {/* LOGO */}
          <div className="logo-box">
            <img src={logo} alt="logo" className="logo-img" />
            <span className="logo-text">VLUShop</span>
          </div>

          {/* SEARCH Ở GIỮA */}
          <form className="search-box center-search">
            <input
              type="text"
              placeholder="Search phone..."
              value={this.state.txtKeyword}
              onChange={(e) =>
                this.setState({ txtKeyword: e.target.value })
              }
            />
            <button onClick={(e) => this.btnSearchClick(e)}>
              🔍
            </button>
          </form>

          {/* USER */}
          <div className="user-box">
            {this.context.token === '' ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign-up</Link>
                <Link to="/active">Active</Link>
              </>
            ) : (
              <>
                Hello <b>{this.context.customer.name}</b>
                <Link to="/home" onClick={() => this.lnkLogoutClick()}>
                  Logout
                </Link>
                <Link to="/myprofile">Profile</Link>
                <Link to="/myorders">Orders</Link>
              </>
            )}

            <Link to="/mycart">
              🛒 Cart ({this.context.mycart.length})
            </Link>
          </div>

        </div>

        {/* ===== MENU BAR (DƯỚI) ===== */}
        <div className="header-main">

          <div className="menu-bar center-menu">
            <Link to="/home" className="menu-item">Home</Link>

            {this.state.categories.map((item) => (
              <Link
                key={item._id}
                to={'/product/category/' + item._id}
                className="menu-item"
              >
                {item.name}
              </Link>
            ))}
          </div>

        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories')
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch(err => console.error(err));
  }

  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // LOGOUT
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default withRouter(Menu);