import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/cart/add",
      {
        productId: product._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product added to cart!");
  } catch (error) {
    console.log(error);
    alert("Failed to add product");
  }
};

  return (
    <div className="container">
      <div className="product-details">
        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <h2>₹{product.price}</h2>

        <p>Category: {product.category}</p>

        <p>Stock: {product.stock}</p>

        <button onClick={handleAddToCart}>
           Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;