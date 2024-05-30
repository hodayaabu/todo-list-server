import express from "express";
import {
  getTasks,
  removeTask,
  addTask,
  updateTask,
} from "./task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.delete("/:taskId", removeTask);
router.post("/", addTask);
router.put("/:taskId", updateTask);

export const taskRoutes = router;
