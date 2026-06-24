const Cart = require("../models/Cart");

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        products: [
          {
            product: productId,
            quantity,
          },
        ],
      });
    } else {
      cart.products.push({
        product: productId,
        quantity,
      });

      await cart.save();
    }

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get logged-in user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("products.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) =>
        item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.json({
      message: "Product removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};