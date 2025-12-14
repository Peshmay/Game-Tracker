import { Router } from "express";
import multer from "multer";
import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController";

const upload = multer({ dest: "uploads/" });
const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", getUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id (includes sessions + game)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: User + sessions
 *       404:
 *         description: Not found
 */
router.get("/:id", getUserById);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create user (multipart/form-data)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [email, firstName, lastName]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid data
 */
router.post("/", upload.single("profilePic"), createUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user and sessions
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       500:
 *         description: Error deleting user
 */
router.delete("/:id", deleteUser);

export default router;
