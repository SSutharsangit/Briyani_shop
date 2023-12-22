import React, { useState, useEffect } from 'react';
import Foodcard from '../../component/foodcard/Foodcard';
import axios from 'axios';

function Item({ fooditems, setFoodItems, handleCard }) {
  const [items, setItems] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (title, price) => {
    // Check if the product with the given title already exists
    const existingProduct = fooditems.find((product) => product.title === title);
  
    if (existingProduct) {
      // If the product exists, you may want to update its quantity or show a message
      setError('Product already in the cart!please check the card');
      setTimeout(() => setError(null), 5000);
    } else {
      // If the product doesn't exist, add it to the cart
      setFoodItems((prevFoodItems) => [
        ...prevFoodItems,
        { title, price, quantity: 1 },
      ]);
    }
  };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/item");
          setItems(response.data.data);
        } catch (err) {
          setError(err);
          setTimeout(() => setError(null), 5000);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='row'>
        <p className="text-center fs-3 fw-semibold" style={{ color: '#FFBF00', textDecoration: "underline" }}>Items</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {items.map((item) => (
          <div key={item.id} className="col-4" style={{ marginBottom: "20px" }}>
            <Foodcard
              id={item.id}
              title={item.title}
              price={item.price}
              url={item.imageUrl}
              onAddToCart={() => handleAddToCart(item.title, item.price)}
            />
          </div>
        ))}
      </div>
    );
  }
  

 

export default Item;
