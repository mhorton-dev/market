import bcrypt from "bcrypt";
import db from "../db/client.js";

export async function createUser(username, password) {
  const sql = `INSERT INTO users (username, password)
        VALUES $1, $2) RETURNING *`;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUsers() {
  const sql = `SELECT * FROM users`;

  const { rows: users } = db.query(sql);

  return users;
}

export async function getUserByUsername(username) {
  const sql = `SELECT * FROM users WHERE username = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;

  const validPW = await bcrypt.compare(password, user.password);
  if (!validPW) return null;
  return user;
}

export async function getUserById(user_id) {
  const sql = "SELECT * FROM users WHERE user_id = $1";

  const {
    rows: [user],
  } = await db.query(sql, [user_id]);
  return user;
}

export async function updateUser(userId, newValues) {
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
      `SELECT id, username, email, favorite_team, favorite_conference FROM user ${[
        userId,
      ]}`;
      return user;
    }

    values.push(userId);

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
