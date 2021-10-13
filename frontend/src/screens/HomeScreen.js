import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';


const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const { data } = await axios.get('/api/products');
    //   setProducts(data);
    // }
    // fetchProducts();

    //async await does not work 'webpack?'
    try {
      axios.get('/api/products')
        .then((resp) => setProducts(resp.data))
    }
    catch (error) {
      console.log('Error in homeScreen: ', error);
    }
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
};


export default HomeScreen;