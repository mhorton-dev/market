import db from "../db/client.js";

export async function createOrder(user_id, note) {
  const sql = `INSERT INTO orders (user_id, note) VALUES ($1, $2) RETURNING *;`;

  const {
    rows: [order],
  } = await db.query(sql, [user_id, note]);

  return order;
}

export async function insertOrderProduct(order_id, product_id, quantity = 1) {
  const sql = `INSERT INTO orders_products (order_id, product_id, quantity)
   VALUES ($1, $2, $3) RETURNING *;`;

  const {
    rows: [orderProduct],
  } = await db.query(sql, [order, product_id, quantity]);

  return orderProduct;
}

export async function getOrders() {
  const sql = `SELECT * FROM orders`;

  const { rows: orders } = await db.query(sql);

  return orders;
}

export async function getOrderById(order_id) {
  const sql = `SELECT * FROM orders WHERE order_id = $1;`;

  const { rows: orders } = await db.query(sql, [order_id]);

  return order;
}

export async function getOrdersByUserId(user_id) {
  const sql = `SELECT * FROM orders WHERE user_id = $1;`;

  const {
    rows: [orders],
  } = await db.query(sql, [user_id]);

  return orders;
}
