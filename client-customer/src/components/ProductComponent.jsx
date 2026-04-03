import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const prods = this.state.products.map((item) => (
      <div key={item._id} className="product-card">
        <Link to={'/product/' + item._id}>
          <img
            src={'data:image/jpg;base64,' + item.image}
            alt={item.name}
          />
        </Link>

        <h3>{item.name}</h3>

        <p className="price">
          {item.price.toLocaleString()} VND
        </p>

        <Link to={'/product/' + item._id}>
          <button className="btn-buy">View</button>
        </Link>
      </div>
    ));

    return (
      <div className="home-container">
        <h2 className="section-title">📱 ALL PRODUCTS</h2>

        <div className="product-grid">
          {prods}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;

    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    } else {
      this.apiGetProducts();
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;

    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (
      params.keyword &&
      params.keyword !== prevProps.params.keyword
    ) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // APIs
  apiGetProducts() {
    axios.get('/api/customer/products').then((res) => {
      this.setState({ products: res.data });
    });
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      this.setState({ products: res.data });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      this.setState({ products: res.data });
    });
  }
}

const ProductWithRouter = withRouter(Product);
export default ProductWithRouter;