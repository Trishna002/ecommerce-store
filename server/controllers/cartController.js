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
      // Check if product already exists
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({
          product: productId,
          quantity,
        });
      }

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

    const item = cart.products.find(
      (product) =>
        product.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.products = cart.products.filter(
        (product) =>
          product.product.toString() !== req.params.productId
      );
    }

    await cart.save();

    res.json(cart);
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
