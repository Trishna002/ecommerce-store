import { useEffect, useState } from "react";
import API from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Yet</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="product-card"
          >
            <h3>Order #{order._id.slice(-6)}</h3>

            <p>Status: {order.status}</p>

            <p>Total: ₹{order.totalPrice}</p>

            <h4>Products</h4>

            {order.products.map((item) => (
              <div key={item.product._id}>
                <p>
                  {item.product.name} × {item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;