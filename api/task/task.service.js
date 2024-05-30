import { utilService } from "../../services/util.service.js";
import { dbService } from "../../services/db.service.js";
import { ObjectId } from "mongodb";

export const taskService = {
  query, // LIST
  add, // POST
  update, // UPDATE
  remove, // DELETE
};

const collectionName = "taskDB";
const allowedFields = ["completed", "title", "description"];

// lIST
async function query(filterBy = {}) {
  try {
    //   const criteria = _buildCriteria(filterBy);
    //   const bugCursor = await collection.find(criteria);
    const collection = await dbService.getCollection(collectionName);
    const tasks = await collection.find().toArray();

    return tasks;
  } catch (err) {
    // logger.error("taskService[list] : ", err);
    throw err;
  }
}

// POST
async function add(taskToSave) {
  try {
    const collection = await dbService.getCollection(collectionName);
    await collection.insertOne(taskToSave);
    return taskToSave;
  } catch (err) {
    // loggerService.error("boardService[add] : ", err);
    throw err;
  }
}

// UPDATE
async function update(task) {
  try {
    const fieldsToUpdate = {};
    // Iterate over each field in task
    for (const field in task) {
      // Check if the current field is in the 'allowedFields' array (top of the file)
      if (allowedFields.includes(field)) {
        // If it is allowed, add it to the 'fieldsToUpdate' object
        fieldsToUpdate[field] = task[field];
      }
    }
    const collection = await dbService.getCollection(collectionName);
    const updatedTask = await collection.findOneAndUpdate(
      { _id: new ObjectId(task._id) },
      { $set: fieldsToUpdate },
      { returnDocument: "after" }
    );

    return updatedTask;
  } catch (err) {
    // loggerService.error("boardService[update] : ", err);
    throw err;
  }
}

// DELETE
async function remove(taskId) {
  try {
    const collection = await dbService.getCollection(collectionName);
    const { deletedCount } = await collection.deleteOne({
      _id: new ObjectId(taskId),
    });
    return deletedCount;
  } catch (err) {
    console.log(err);
    // loggerService.error("taskService[Remove] : ", err);
    throw err;
  }
}
