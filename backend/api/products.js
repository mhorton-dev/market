import express from "express";
const router = express.Router();

import {
  createProduct,
  getProducts,
  getProductById,
  getProductsByUserId,
  updateProduct,
  insertOrderProduct,
} from "../queries/products.js";

import { inserOrderProduct } from "../queries/products.js";

//all products
router.get(
  "/",
  async(async (req, res) => {
    try {
      req.body = {};
      const products = await getProducts();
      res.send(products);
    } catch (err) {
      console.error(`Error fetching all products: ${err}`);
      res.send(`Failed to fetch all products ${err}`);
    }
  })
);

//get product by product_id
router.get("/product/:product_id").get(async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await getProductById(product_id);

    res.status(201).send(product);
  } catch (err) {
    console.error(`Error with /product/:product_id route: ${err}`);
    res.send(`Error with /product/:product_id: ${err}`);
  }
});

//get products by user_id
router.route("user/:user_id").get(async (req, res) => {
  try {
    const { user_id } = req.params;
    const products = await getProductByUserId(user_id);

    res.json(products);
    res.status(201).send(product);
  } catch (err) {
    console.error(`Error with user/product/:product_id route: ${err}`);
    res.send(`Error with user/product/:product_id: ${err}`);
  }
});

//create product
router.post("/", async (req, res) => {
  try {
    const product = { title, product_description, price };

    if (!title || !product_description || !price) {
      return res
        .status(400)
        .json({ error: "Missing required fields in creat fetch" });
    }

    const peoduct = await createProduct(title, product_description, price);

    res.status(201).send(product);
  } catch (err) {
    console.error(`create product route error ${err}`);
    return res.status(500).json(`Error with create product route: ${err}`);
  }
});

//update product
router.put("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const updatedProduct = await updateProduct(product_id);
    return res.status(201).send(updatedProduct);
  } catch (err) {
    console.error(`Error on /:product_id update route ${err}`);
    res.send(`Error on /:product_id update route ${err}`);
  }
});

//add product to order
router.post(
  "/order_id:/products/product_id:",
  requireUser,
  async (req, res) => {
    try {
      const { orderId, productId } = req.params;
      const orderProduct = await insertOrderProduct(orderId, productId);
      res.status(201).json(orderProduct);
    } catch (err) {
      console.error(`Error adding product to order route ${err}`);
      res
        .status(500)
        .json({ error: `rror adding product to order route ${err}` });
    }
  }
);

export default router;
