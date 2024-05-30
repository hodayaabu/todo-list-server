
import { taskService } from "./task.service.js";

// lIST
export async function getTasks(req, res) {
  try {
    let filterBy = {};
    const tasks = await taskService.query(filterBy);
    res.send(tasks);
  } catch (err) {
    res.status(400).send({ err: "Failed to get tasks" });
  }
}


// POST
export async function addTask(req, res) {
  let { title, description } = req.body;

  const taskToSave = {
    title,
    description,
    createdAt: Date.now(),
    completed: false
  };

  try {
    const savedTask = await taskService.add(taskToSave);
    res.send(savedTask);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Could't add task" });
  }
}

// UPDATE
export async function updateTask(req, res) {
  const { taskId } = req.params;
  const { _id, ...taskWithoutId } = req.body;
  const taskToUpdate = {
    _id: taskId,
    ...taskWithoutId,
  };

  try {
    const updatedTask = await taskService.update(taskToUpdate);
    res.send(updatedTask);
  } catch (err) {
    res.status(400).send("Could't update task" + err);
  }
}

// DELETE
export async function removeTask(req, res) {
  const { taskId } = req.params;
  try {
    const deletedCount = await taskService.remove(taskId);
    res.json({ message: `task Deleted: ${taskId}`, deletedCount });
  } catch (err) {
    console.log(err);
    res.status(400).send("Could't remove task");
  }
}
