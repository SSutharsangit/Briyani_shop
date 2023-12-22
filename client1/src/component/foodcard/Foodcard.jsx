import React from 'react'

function Foodcard({id,title,price,url,onAddToCart}) {
  return (
    <div>
        <div className="card" style={{ width: '18rem' }}>
      <img src={url} className="card-img-top" alt="foodphoto"  style={{height:"15rem"}}/>
      <div className="card-body row">
        <h5 className="card-title col-8">{title}</h5>
        <p className="card-text col-4">
         {price}
        </p>
        <button className="btn btn-warning" onClick={onAddToCart}>
        Add To Cart
        </button>

      </div>
    </div>
    </div>
  )
}

export default Foodcard