import db from "../db/client.js";

export async function createProduct(title, product_description, price) {
  const sql = `INSERT INTO products (title, product_description, price) 
    VALUES ($1, $2, $3) RETURNING*`;

  const {
    rows: [product],
  } = await db.query(sql, [title, product_desription, price]);

  return product;
}

export async function getProducts() {
  const sql = `SELECT * FROM products`;

  const { rows: products } = await db.query(sql);

  return products;
}

//get all products
export async function getProductById(product_id) {
  const sql = `SELECT * FROM products WHERE product_id = $1`;

  const { rows: product } = await db.query(sql, [product_id]);

  return product;
}

export async function updateProduct(productId, newValues) {
  try {
    const fields = [];
    const values = [];
    let index = 1;
    const { username, email, favorite_team, favorite_conference } = newValues;
    for (const [key, value] of Object.entries(newValues)) {
      // if request body doesn't include a field to update, ignore it.
      if (value !== undefined && value !== null) {
        fields.push(`${key} = $${index++}`); //need extra $ to make a literal $ when run.
      }
      values.push(value);
    }
    if (fields.length === 0) {
      `SELECT product_id, title, product_description, price FROM products ${[
        productId,
      ]}`;
      return product;
    }

    values.push(productId);

    const sql = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *;`;

    const {
      rows: [user],
    } = await db.query(sql, values);

    return { user };
  } catch (err) {
    console.error(`Error in updateUser: ${err.message}`);
    throw err;
  }
}
