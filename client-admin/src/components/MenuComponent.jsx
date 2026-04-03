import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import logo from '../assets/logovlu.png';

// 👉 wrapper để dùng hook trong class
function withLocation(ComponentClass) {
  return function (props) {
    const location = useLocation();
    return <ComponentClass {...props} location={location} />;
  };
}

class Menu extends Component {
  static contextType = MyContext;

  render() {
    const { pathname } = this.props.location;

    return (
      <div className="sidebar">

        {/* 🔥 LOGO + BRAND */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "30px"
        }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px"
            }}
          />
          <h2 style={{ margin: 0 }}>VLU Phone</h2>
        </div>

        {/* 🔥 MENU */}
        <Link
          to="/admin/home"
          className={pathname.includes('/home') ? 'active' : ''}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/product"
          className={pathname.includes('/product') ? 'active' : ''}
        >
          📱 Products
        </Link>

        <Link
          to="/admin/category"
          className={pathname.includes('/category') ? 'active' : ''}
        >
          📂 Category
        </Link>

        <Link
          to="/admin/order"
          className={pathname.includes('/order') ? 'active' : ''}
        >
          🧾 Orders
        </Link>

        <Link
          to="/admin/customer"
          className={pathname.includes('/customer') ? 'active' : ''}
        >
          👤 Customers
        </Link>

        {/* 🔥 USER */}
        <div style={{ marginTop: "30px" }}>
          <hr />
          <p style={{ marginTop: "15px" }}>
            Hello <b>{this.context.username}</b>
          </p>

          <button
            className="btn btn-delete"
            style={{ width: "100%" }}
            onClick={() => this.lnkLogoutClick()}
          >
            Logout
          </button>
        </div>

      </div>
    );
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default withLocation(Menu);