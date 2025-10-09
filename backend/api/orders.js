import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUsedId,
  insertOrderProduct,
} from "../queries/orders.js";

import requireUser from "../middleware/requireUser.js";

const router = express.Router();

//get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (err) {
    console.error(`Error fetching users in route /: ${err}`);
    res.status(500).json(`Error fetching users in route /: ${err}`);
  }
});

//get order by ID
router.get("/:id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await getOrderById(order_id);

    if (!order)
      return res.status(404).json({ error: `Order not found.  route /:id` });
    res.json(order);
  } catch (err) {
    console.error(`Error fetching order by ID: ${err}`);
    res.status(500).json({ error: `Failed to fetch order by id /:id ${err}` });
  }
});

//create order
router.post("/", requireUser, async (req, res) => {
  try {
    const { user } = req.body;
    const userId = req.userId;
    const order = await createOrder(userId, user);
    res.status(201).json(order);
  } catch (err) {
    console.error(`Error creating order on route :/: ${err}`);
    res.status(500).json(`Error creating order on route :/: ${err}`);
  }
});

//insert into orders_products table
router.post("/:order_id/products/:product_id", requireUser, async (req, res) => {
    try {
        const {order_id, product_id} = req.params;
        const {quantity} =  req.body
        const orderProduct = await insertOrderProduct(order_id, product_id, quantity)
        .res.status.(201).json(orderProduct);
    } catch (err) {
        console.error(`Error adding product to order route /:order_id/products/:product_id: ${err}`)       
    }
})
export default router