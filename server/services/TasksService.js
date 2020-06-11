import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {
    // async getAll(userEmail) {
    //     return await dbContext.Lists.find({ creatorEmail: userEmail }).populate("creator", "name picture")
    // }

    async getTasksByListId(id, userEmail) {
        let data = await dbContext.Tasks.find({ listId: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board")
        }
        return data
    }

    async createTask(rawData) {
        let data = await dbContext.Tasks.create(rawData)
        return data
    }

    async editTask(id, userEmail, update) {
        let data = await dbContext.Tasks.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board");
        }
        return data;
    }

    async deleteTask(id, userEmail) {
        let data = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board");
        }
    }

}
export const taskService = new TasksService()