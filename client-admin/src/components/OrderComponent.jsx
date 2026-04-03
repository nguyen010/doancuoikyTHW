import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    // SAFE MAP (fix trắng)
    const orders = (this.state.orders || []).map((item) => (
      <tr key={item._id} onClick={() => this.trItemClick(item)}>

        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer?.name}</td>
        <td>{item.customer?.phone}</td>
        <td>{item.total}</td>

        {/* STATUS */}
        <td>
          {item.status === 'PENDING' && (
            <span style={{ color: 'orange', fontWeight: 'bold' }}>
              Pending
            </span>
          )}
          {item.status === 'APPROVED' && (
            <span style={{ color: 'green', fontWeight: 'bold' }}>
              Approved
            </span>
          )}
          {item.status === 'CANCELED' && (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              Canceled
            </span>
          )}
        </td>

        {/* ACTION */}
        <td style={{ display: "flex", gap: "5px" }}>
          {item.status === 'PENDING' && (
            <>
              <button
                className="btn btn-add"
                onClick={(e) => {
                  e.stopPropagation();
                  this.lnkApproveClick(item._id);
                }}
              >
                Approve
              </button>

              <button
                className="btn btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  this.lnkCancelClick(item._id);
                }}
              >
                Cancel
              </button>
            </>
          )}
        </td>
      </tr>
    ));

    // DETAIL
    let items = null;
    if (this.state.order && this.state.order.items) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id}>
          <td>{index + 1}</td>
          <td>{item.product.name}</td>
          <td>
            <img
              src={'data:image/jpg;base64,' + item.product.image}
              width="60"
              style={{ borderRadius: "6px" }}
              alt=""
            />
          </td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
        </tr>
      ));
    }

    return (
      <div style={{ display: "flex", gap: "30px" }}>

        {/* LEFT: ORDER LIST */}
        <div style={{ flex: 2 }}>
          <h2>🧾 Order List</h2>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders}
            </tbody>
          </table>
        </div>

        {/* RIGHT: ORDER DETAIL */}
        <div style={{ flex: 1 }}>
          {this.state.order && (
            <div className="card">
              <h3>📦 Order Detail</h3>

              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {items}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    );
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }

  apiGetOrders() {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/admin/orders', config).then((res) => {
      this.setState({ orders: res.data });
    });
  }

  apiPutOrderStatus(id, status) {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios
      .put('/api/admin/orders/status/' + id, { status }, config)
      .then((res) => {
        if (res.data) this.apiGetOrders();
      });
  }
}

export default Order;