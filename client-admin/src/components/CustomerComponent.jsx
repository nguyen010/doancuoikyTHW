import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Customer extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      customer: null
    };
  }

  render() {
    const customers = this.state.customers.map((item) => (
      <tr key={item._id} onClick={() => this.trCustomerClick(item)}>

        <td>{item.username}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>

        {/* STATUS */}
        <td>
          {item.active === 1 ? (
            <span style={{ color: "green", fontWeight: "bold" }}>
              Active
            </span>
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Inactive
            </span>
          )}
        </td>

        {/* ACTION */}
        <td style={{ display: "flex", gap: "6px" }}>

          {item.active === 1 ? (
            <button
              className="btn btn-delete"
              onClick={(e) => this.lnkDeactiveClick(e, item)}
            >
              Deactivate
            </button>
          ) : (
            <button
              className="btn btn-add"
              onClick={(e) => this.lnkDeactiveClick(e, item)}
            >
              Activate
            </button>
          )}

          <button
            className="btn btn-update"
            onClick={(e) => this.lnkSendMailClick(e, item)}
          >
            Send Mail
          </button>

        </td>
      </tr>
    ));

    const orders = this.state.orders.map((item) => (
      <tr key={item._id}>
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer.name}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
      </tr>
    ));

    return (
      <div>

        {/* CUSTOMER LIST */}
        <h2>👤 Customer List</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers}
          </tbody>
        </table>

        {/* ORDER LIST */}
        {this.state.orders.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h2>🧾 Orders of Customer</h2>

            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders}
              </tbody>
            </table>
          </div>
        )}

      </div>
    );
  }

  componentDidMount() {
    this.apiGetCustomers();
  }

  // ================= EVENT =================

  trCustomerClick(item) {
    this.setState({ customer: item });
    this.apiGetOrdersByCustID(item._id);
  }

  lnkDeactiveClick(e, item) {
    e.stopPropagation();
    const id = item._id;
    const active = item.active === 1 ? 0 : 1;
    this.apiPutCustomerActive(id, active);
  }

  lnkSendMailClick(e, item) {
    e.stopPropagation();
    this.apiGetSendMail(item._id);
  }

  // ================= API =================

  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      this.setState({ customers: res.data });
    });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      this.setState({ orders: res.data });
    });
  }

  apiPutCustomerActive(id, active) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/active/' + id, { active }, config)
      .then((res) => {
        if (res.data) this.apiGetCustomers();
      });
  }

  apiGetSendMail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      alert(res.data.message || 'Mail sent!');
    });
  }
}

export default Customer;