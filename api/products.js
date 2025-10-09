import express from "express";
const router = express.Router();

export default router;

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../queries/products.js";

//all products
router.route("/").get(async (req, res) => {
  try {
    req.body = {};
    const products = await getProducts();
    res.send(products);
  } catch (err) {
    console.error(`All games router error: ${err}`);
    res.send(`All games endpoint error ${err}`);
  }
});

//get product by id
router.route("/product/:id").get(async (req, res) => {
  try {
    const user = req.user;
    const { product_id } = req.params;
    const product = await getProductById(product_id);

    res.status(201).send(product);
  } catch (err) {
    console.error(`Error with /product/:id route: ${err}`);
    res.send(`Error with /product/:id: ${err}`);
  }
});

//update product
router.route("/product/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProduct(id);
    return res.status(201).send(updatedProduct);
  } catch (err) {
    console.error(`Error on /product:id update route ${err}`);
    res.send(`Error on product:id update route ${err}`);
  }
});

//create product
router.post("/product", async (req, res) => {
  try {
    const product = createProduct(title, product_description, price);

    return res.status(201).send(product);
  } catch (err) {
    console.error(`route error ${err}`);
    return res.status(500).json(`Error with create product route: ${err}`);
  }
});
