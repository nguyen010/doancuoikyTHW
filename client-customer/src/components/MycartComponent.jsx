import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext;

  render() {
    const { mycart } = this.context;

    return (
      <div className="cart-container">

        {/* HEADER */}
        <h2 className="cart-title">🛒 Giỏ hàng của bạn</h2>

        {/* EMPTY */}
        {mycart.length === 0 ? (
          <div className="cart-empty">
            <h3>🛒 Giỏ hàng trống</h3>
            <p>Hãy thêm sản phẩm để bắt đầu mua sắm</p>

            <button
              className="btn-shop"
              onClick={() => this.props.navigate('/home')}
            >
              Mua ngay
            </button>
          </div>
        ) : (
          <div className="cart-content">

            {/* LIST */}
            <div className="cart-list">
              {mycart.map((item, index) => (
                <div key={item.product._id} className="cart-item">

                  <img
                    src={'data:image/jpg;base64,' + item.product.image}
                    className="cart-img"
                    alt=""
                  />

                  <div className="cart-info">
                    <h4>{item.product.name}</h4>
                    <p>{item.product.price.toLocaleString()} VND</p>

                    {/* QUANTITY */}
                    <div className="qty-box">
                      <button onClick={() => this.updateQty(item, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => this.updateQty(item, 1)}>+</button>
                    </div>
                  </div>

                  <div className="cart-right">
                    <h4>
                      {(item.product.price * item.quantity).toLocaleString()} VND
                    </h4>

                    <button
                      className="btn-remove"
                      onClick={() => this.lnkRemoveClick(item.product._id)}
                    >
                      Xóa
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="cart-summary">
              <h3>Tổng đơn</h3>

              <p>
                Tổng tiền:
                <b>
                  {' '}
                  {CartUtil.getTotal(mycart).toLocaleString()} VND
                </b>
              </p>

              <button
                className="btn-buy"
                onClick={() => this.lnkCheckoutClick()}
              >
                Thanh toán
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }

  // ===== UPDATE QUANTITY =====
  updateQty(item, change) {
    const mycart = [...this.context.mycart];
    const index = mycart.findIndex(x => x.product._id === item.product._id);

    if (index !== -1) {
      mycart[index].quantity += change;

      if (mycart[index].quantity <= 0) {
        mycart.splice(index, 1);
      }

      this.context.setMycart(mycart);
    }
  }

  // REMOVE
  lnkRemoveClick(id) {
    if (window.confirm('Xóa sản phẩm?')) {
      const mycart = this.context.mycart.filter(x => x.product._id !== id);
      this.context.setMycart(mycart);
    }
  }

  // CHECKOUT
  lnkCheckoutClick() {
    if (window.confirm('Xác nhận thanh toán?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;

        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      }
    }
  }

  apiCheckout(total, items, customer) {
    const body = { total, items, customer };
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.post('/api/customer/checkout', body, config).then((res) => {
      if (res.data) {
        alert('Đặt hàng thành công!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      }
    });
  }
}

export default withRouter(Mycart);