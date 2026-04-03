import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }

  render() {
    const prods = this.state.products.map((item) => (
      <tr key={item._id} onClick={() => this.trItemClick(item)}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.category.name}</td>
        <td>
          <img
            src={`data:image/jpg;base64,${item.image}`}
            width="60"
            height="60"
            style={{ borderRadius: "6px" }}
            alt=""
          />
        </td>
      </tr>
    ));

    const pagination = Array.from(
      { length: this.state.noPages },
      (_, index) => {
        const page = index + 1;
        if (page === this.state.curPage) {
          return (
            <button key={index} className="btn btn-edit">
              {page}
            </button>
          );
        }
        return (
          <button
            key={index}
            className="btn"
            onClick={() => this.lnkPageClick(page)}
          >
            {page}
          </button>
        );
      }
    );

    return (
      <div style={{ display: "flex", gap: "30px" }}>
        
        {/* LEFT: PRODUCT LIST */}
        <div style={{ flex: 2 }}>
          <h2>📦 Product List</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>

            <tbody>
              {prods}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div style={{ marginTop: "15px", display: "flex", gap: "5px" }}>
            {pagination}
          </div>
        </div>

        {/* RIGHT: DETAIL FORM */}
        <div style={{ flex: 1 }}>
          <ProductDetail
            item={this.state.itemSelected}
            curPage={this.state.curPage}
            updateProducts={this.updateProducts}
          />
        </div>

      </div>
    );
  }

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  lnkPageClick(page) {
    this.setState({ itemSelected: null });
    this.apiGetProducts(page);
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  updateProducts = (products, noPages) => {
    this.setState({ products, noPages });
  };

  apiGetProducts(page) {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios
      .get(`/api/admin/products?page=${page}`, config)
      .then((res) => {
        const result = res.data;
        this.setState({
          products: result.products,
          noPages: result.noPages,
          curPage: result.curPage
        });
      });
  }
}

export default Product;