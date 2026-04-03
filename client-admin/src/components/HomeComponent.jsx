import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h1 style={{ marginBottom: "20px" }}>📊 Admin Dashboard</h1>

        {/* STATS */}
        <div className="dashboard">
          <div className="card">
            <h3>📱 Products</h3>
            <h2>120</h2>
          </div>

          <div className="card">
            <h3>🧾 Orders</h3>
            <h2>45</h2>
          </div>

          <div className="card">
            <h3>👤 Customers</h3>
            <h2>30</h2>
          </div>

          <div className="card">
            <h3>💰 Revenue</h3>
            <h2>50M VND</h2>
          </div>
        </div>

        {/* RECENT PRODUCTS */}
        <div style={{ marginTop: "40px" }}>
          <h2>📦 Recent Products</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>iPhone 15 Pro</td>
                <td>30,000,000</td>
                <td>Apple</td>
              </tr>
              <tr>
                <td>Samsung S23</td>
                <td>20,000,000</td>
                <td>Samsung</td>
              </tr>
              <tr>
                <td>Xiaomi 13</td>
                <td>12,000,000</td>
                <td>Xiaomi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;