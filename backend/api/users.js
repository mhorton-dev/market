import express from "express";
const router = express.Router();

import requireBody from "../middleware/requireBody";
import requireUser from "../middleware/requireUser";

import {
  createUser,
  getUsers,
  getUserByUsername,
  getUserById,
  updateUser,
} from "../queries/users.js";

import { createToken, verifyToken } from "../utils/jwt.js";

//return all users
router.get("/").get(async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (err) {
    console.error(`Error with users route ${err}`);
    res.send(`Error with users route ${err}`);
  }
});

//register user
router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await createUser(username, password);

      if (!user || !user.user_id) {
        return res
          .status(400)
          .json({ error: " User registration route failed" });
      }

      const token = createToken({ id: user.user_id });
      res.status(201).json({ token });
    } catch (err) {
      console.error(`Error registering: ${err}`);
      res.status(500).json({ error: "Registration route failed" });
    }
  }
);

//user login
router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await getUserByUsername(username);

      if (!user) {
        return res.status(401).json({
          error: "Invalid username, or password during login",
        });
      }
      const token = createToken({ user_id: user.user_id });
      res.status(200).json({ token });
    } catch (err) {
      console.error(`Login error" ${err}`);
      res.status(500).json({ error: "Something went wrong with user login" });
    }
  }
);

router.get("/me", requireUser, async (req, res) => {
  try {
    const { password, ...safeUser } = req.user; // strip sensitive user data
    res.json(safeUser);
  } catch (err) {
    console.error("error fetching /me route:", err);
    res.status(500).json({ error: "error fetching /me route" });
  }
});

router.put("/me", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    console.log(`PUT user/me endpoint user: ${req.user}`);
    console.log(`PUT user/me endpoint body sent: ${req.body}`);

    const updatedUser = await updateUser(userId, updates);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating /me:", err);
    res.status(500).json({ error: "Error updating /me:" });
  }
});

router.put("/edit", requireUser, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { username } = payload;
    const newPayload = { username };
    const editedUser = await updateUser(user_id, newPayload);
    res.status(200).json(editedUser);
    res.json(editedUser);
  } catch (err) {
    console.error(`Error editing user /edit ${err}`);
    res.send(`Error editing user /edit ${err}`);
  }
});

export default router;
