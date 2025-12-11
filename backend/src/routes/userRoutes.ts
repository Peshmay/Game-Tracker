import { Router } from "express";
import multer from "multer";
import { createUser, getUsers, getUserById, deleteUser } from "../controllers/userController";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", upload.single("profilePic"), createUser);
router.delete("/:id", deleteUser);

export default router;
