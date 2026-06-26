import { useEffect, useState } from "react";
import API from "../api/axios";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("token");

    const products = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    await API.post(
      "/orders",
      {
        products,
        totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Order placed successfully!");

    fetchCart();
  } catch (error) {
    console.log(error);
    alert("Failed to place order");
  }
};

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="product-card"
            >
              <h3>{item.product.name}</h3>

              <p>{item.product.description}</p>

              <p>Price: ₹{item.product.price}</p>

              <p>Quantity: {item.quantity}</p>

              <p>
                <strong>
                  Subtotal: ₹
                  {item.product.price * item.quantity}
                </strong>
              </p>

              <button
                onClick={() =>
                  handleRemove(item.product._id)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Cart Summary</h2>

            <p>Total Items: {totalItems}</p>

            <h3>Total Amount: ₹{grandTotal}</h3>

           <button onClick={handleCheckout}>
               Proceed to Checkout
          </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;