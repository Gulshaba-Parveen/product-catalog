import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="product-detail-container" style={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.5)', backgroundColor: 'pink' }}>
      {product ? (
        <div className="product-detail">
          <img src={product.image} alt={product.title} style={{ width: '30%', height: '10%' }} />
          <div className="product-details">
            <h2>{product.title}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
