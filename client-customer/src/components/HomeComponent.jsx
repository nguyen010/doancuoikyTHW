import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };  
  }

  // ===== SLIDE =====
  slide = (direction) => {
    if (this.sliderRef) {
      const scrollAmount = 300;
      this.sliderRef.scrollLeft += direction * scrollAmount;
    }
  };

  render() {
    const newprods = (this.state.newprods || []).map((item) => (
      <div key={item._id} className="product-card">
        <Link to={'/product/' + item._id}>
          <img  
            src={'data:image/jpeg;base64,' + item.image}
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

    const hotprods = (this.state.hotprods || []).map((item) => (
      <div key={item._id} className="product-card hot">
        <Link to={'/product/' + item._id}>
          <img
            src={'data:image/jpeg;base64,' + item.image}
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

        {/* ===== NEW PRODUCTS SLIDER ===== */}
        <h2 className="section-title hot-title">
          🔥 SẢN PHẨM MỚI
        </h2>

        <div className="slider-container">

          <button 
            className="slider-btn left"
            onClick={() => this.slide(-1)}
          >
            ❮
          </button>

          <div 
            className="slider"
            ref={(ref) => (this.sliderRef = ref)}
          >
            {newprods}
          </div>

          <button 
            className="slider-btn right"
            onClick={() => this.slide(1)}
          >
            ❯
          </button>

        </div>

        {/* ===== HOT PRODUCTS ===== */}
        {this.state.hotprods.length > 0 && (
          <>
            <h2 className="section-title hot-title">
              🔥 SẢN PHẨM BÁN CHẠY
            </h2>
            <div className="product-grid">
              {hotprods}
            </div>
          </>
        )}

      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new')
      .then((res) => {
        this.setState({ newprods: res.data });
      })
      .catch(err => console.error(err));
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot')
      .then((res) => {
        this.setState({ hotprods: res.data });
      })
      .catch(err => console.error(err));
  }
}

export default Home;