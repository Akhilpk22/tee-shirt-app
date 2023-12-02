import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart, removeFromCart } from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartArray = useSelector((state) => state.cartReducer);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate()

  const getCartTotal = () => {
    if (cartArray.length > 0) {
      setTotal(cartArray.map((item) => item.price).reduce((p1, p2) => p1 + p2));
    } else {
      setTotal(0);
    }
  };

  const handleCart = () =>{
    dispatch(emptyCart())
    alert("Order successfully Placed... Thank you for purchasing with us!!!")
    navigate('/')

  }

  useEffect(() => {
    getCartTotal();
  }, [cartArray]);

  return (
    <div className="container mb-5" style={{ marginTop: "100px" }}>
      {cartArray?.length > 0 ? (
        <div className="row mt-5">
          <div className="col-lg-7">
            <table className="table shadow border text-center">
              <thead>
                <tr>
                  <th  style={{color:"white"}}>#</th>
                  <th  style={{color:"white"}}>Name</th>
                  <th  style={{color:"white"}}>Product</th>
                  <th  style={{color:"white"}}>Price</th>
                  <th  style={{color:"white"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartArray.map((product, index) => (
                  <tr  key={index}>
                    <td  style={{color:"white"}}>{index + 1}</td>
                    <td style={{color:"white"}}>{product?.title}</td>
                    <td>
                      <img
                        height={"100px"}
                        width={"100px"}
                        src={product.image}
                        alt=""
                      />
                    </td>
                    <td  style={{color:"white"}}>$ {product?.price}</td>
                    <td>
                      <i
                        className="fa-solid fa-trash text-danger me-2"
                        onClick={() => dispatch(removeFromCart(product.id))}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-4">
            <div className="border p-3 rouded shadow">
              <h1 className="text-primary">Cart Summary</h1>
              <h4 className="mt-3">
                Total Products :
                <span className="text-danger fw-bolder fs-2 ms-3">{cartArray.length}</span>
              </h4>
              <h4 className="mt-3">
                Total Price :
                <span className="text-danger fw-bolder fs-2 ms-3">$ {total}</span>
              </h4>
              <div className="d-grid mt-5">
                <button className="btn btn-success rounded" onClick={handleCart}>Check Out</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "60vh" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img
            height={"250px"}
            src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif"
            alt=""
          />
          <h3 className="fw-bolder text-white text-primary">Your Cart is Empty!!!</h3>
          <Link
            style={{ textDecoderation: "none",backgroundColor:"grey" }}
            className="btn btn-success rounded mt-3"
            to={"/"}
          >
            Back To Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
