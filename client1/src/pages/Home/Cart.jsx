import React, { useEffect, useState } from 'react';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

function Cart({ fooditems, setFoodItems}) {
  const [products, setProducts] = useState(fooditems);
  const navigate=useNavigate();

  // Initialize quantities state for each product
  const initialQuantities = products.reduce((acc, product) => {
    acc[product.title] = 1; 
    return acc;
  }, {});
  const [quantities, setQuantities] = useState(initialQuantities);


  const handleIncrease = (title) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [title]: (prevQuantities[title] || 0) + 1,
    }));
  };

  const handleDecrease = (title) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [title]: Math.max((prevQuantities[title] || 0) - 1, 0),
    }));
  };

  const calculateTotal = (product) => {
    const quantity = quantities[product.title]; 
    return quantity * product.price;
  };

  const calculateSubtotal = () => {
    return products.reduce((subtotal, product) => {
      return subtotal + calculateTotal(product);
    }, 0);
  };

  const handleRemove = (title) => {
    const updatedProducts = products.filter((product) => product.title !== title);
    setProducts(updatedProducts);
    setFoodItems(updatedProducts);
  };
  const userdata = localStorage.getItem('userdata');
  const user = JSON.parse(userdata);
  const transformOrderDetails = (products, subtotal, userdata) => {
    const transformedOrderDetails = {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
      },
      products: products.map((product) => ({
        item: product.title, 
        quantity: quantities[product.title],
      })),
      subtotal: subtotal,
      
    };
  
    return transformedOrderDetails;
  };
  const handlemakepayment = () => {
  
    if (!userdata) {
      navigate('/login');
    } else {
      const orderDetails = transformOrderDetails(products, calculateSubtotal(), user);
      axios.post('http://localhost:5000/order',orderDetails)
       .then((response) => {
         if (response.data && response.data.success) {
           
          setProducts([]);
          setFoodItems([]);

         Swal.fire({
           position: 'center',
          icon: 'success',
         title: 'Your Order has been saved',
         showConfirmButton: false,
          timer: 1500,
           });
         } else {
         
          console.error('Order creation failed:', response.data);
      }
       })
         .catch((err) => {
         console.log(err.message);
   });
    }
  };
  
  
  return (
    <div>
      <p className="text-center fs-3 fw-semibold" style={{ color: '#FFBF00' }}>
        Shopping cart
      </p>
      <hr style={{ color: '#FFBF00' }} />
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">PRODUCT</th>
            <th scope="col">PRICE</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">TOTAL</th>
            <th scope="col">REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{product.title}</th>
              <td>{product.price}</td>
              <td>
                <div className="quantity-selector">
                  <button
                    type="button"
                    className="btn border border-black"
                    onClick={() => handleDecrease(product.title)}
                  >
                    -
                  </button>
                  <button type="button" className="btn">
                    {quantities[product.title] || 0}
                  </button>
                  <button
                    type="button"
                    className="btn border border-black"
                    onClick={() => handleIncrease(product.title)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{calculateTotal(product)}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleRemove(product.title)}>
                  <RemoveCircleOutlinedIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text text-end fs-3 fw-semibold">SubTotal: {calculateSubtotal()}</p>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-warning" onClick={handlemakepayment}>
          Make Payment
        </button>
      </div>
    </div>
  );
}

export default Cart;
