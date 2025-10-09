import express from "express";
const router = express.Router();

export default router;

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
router.route("/").get(async (req, res) => {
  try {
    req.body = {};
    const games = await getUsers();
    res.send(games);
  } catch (err) {
    console.error(`Error with users route ${err}`);
    res.send(`Error with users route ${err}`);
  }
});

//register user
router.post("/register", requireBody(["username", "password"]));
async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await createUser(username, password);

    if (!user || !user.user_id) {
      return res.status(400).json({ error: " User registration failed" });
    }
    const token = createToken(user.user_id);
    res.status(201).json({ token });
  } catch (err) {
    console.error(`Error registering: ${err}`);
    res.status(500).json({ error: "Something went wrong registering user" });
  }
};

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
      rest.status(500).json({ error: "Something went wrong with user login" });
    }
  }
);

router.get("/me", requireUser, async (req, res) => {
  try {
    const { password, ...safeUser } = req.user; // strip sensitive user data
    res.json(safeUser);
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Auth error" });
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
    console.error("Error in PUT /users/me:", err);
    res.status(500).json({ error: "Error updating user" });
  }
});

router.put("/edit", async (req, res) => {
  try {
    const { id } = req.user;
    // const { username, email, favoriteTeam, favoriteConf } = req.body; // Add password later
    const payload = req.body;
    const { username, email, favoriteTeam, favoriteConf } = payload;

    const newPayload = {
      username: username,
    };
    console.log("payload", payload);
    console.log("New payload", newPayload);

    const editedUser = updateUser(user_id, newPayload);
    res.status(200).send(editedUser);
  } catch (err) {
    console.error(`Error editing user ${err}`);
    res.send(`Error editing user ${err}`);
  }
});
