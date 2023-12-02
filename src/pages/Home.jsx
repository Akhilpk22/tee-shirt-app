import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import axios from "axios";
import './Home.css'

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  function filterProducts(searchTerm) {
    const filtered = data.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }
  
  useEffect(() => {
    filterProducts(searchTerm);
  },[searchTerm]);

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data)
      }catch(err){
        console.log(err);
      }
    }

    fetchData()

  },[])

  const dispatch = useDispatch()
  return (
    <>
    <div style={{marginTop:'100px'}} className="d-flex justify-content-end  align-items-center me-5 pe-5">
    <input  className='form-control w-25  ' type="text" placeholder='search product' value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  /> 
           <i style={{ marginLeft: '-35px' ,color: "#0d0f12"}}  class="fa-solid fa-magnifying-glass" ></i>
    </div>
    
    { searchTerm?<Row className="px-5 ms-3 " >
        {
          //conditional rendering
          filteredData?.length > 0 ? (
            filteredData?.map((product, index) => (
              <Col key={index} className="mb-5 product-shirt mt-5" sm={12} md={6} lg={4} xl={3}>
                <Card className="shadow rounded p-3 bg-white  text-black" style={{ width: "18rem" , height:"28rem"}}>
                  <Card.Img height={'200px'} variant="top" src={product?.image} />
                  <Card.Body className="overflow-y-hidden">
                    <Card.Title>{product?.title.slice(0,15)}...</Card.Title>
                    <Card.Text>
                      <p>{product?.description.slice(0,22)}...</p>
                      <h5>$ {product?.price}</h5>
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button className="btn btn-light">
                        <i className="fa-solid fa-heart text-danger me-2 fa-2x" onClick={()=>dispatch(addToWishlist(product))}></i>
                      </Button>
                      <Button className="btn btn-light">
                        <i className="fa-solid fa-cart-shopping text-success me-2 fa-2x" onClick={()=>dispatch(addToCart(product))}></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-danger fw-bold fs-4">Nothing to Display</p>
          )
        }
      </Row>
      :
      <Row className="px-5 ms-3 " >
        {
          //conditional rendering
          data?.length > 0 ? (
            data?.map((product, index) => (
              <Col key={index} className="mb-5 product-shirt mt-5" sm={12} md={6} lg={4} xl={3}>
                <Card className="shadow rounded p-3 bg-white  text-black" style={{ width: "18rem" , height:"28rem"}}>
                  <Card.Img height={'200px'} variant="top" src={product?.image} />
                  <Card.Body className="overflow-y-hidden">
                    <Card.Title>{product?.title.slice(0,15)}...</Card.Title>
                    <Card.Text>
                      <p>{product?.description.slice(0,22)}...</p>
                      <h5>$ {product?.price}</h5>
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button className="btn btn-light">
                        <i className="fa-solid fa-heart text-danger me-2 fa-2x" onClick={()=>dispatch(addToWishlist(product))}></i>
                      </Button>
                      <Button className="btn btn-light">
                        <i className="fa-solid fa-cart-shopping text-success me-2 fa-2x" onClick={()=>dispatch(addToCart(product))}></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-danger fw-bold fs-4">Nothing to Display</p>
          )
        }
      </Row>}
    </>
  );
}

export default Home;