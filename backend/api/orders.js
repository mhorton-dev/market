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
