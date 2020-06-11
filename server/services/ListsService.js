import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class ListsService {
    async getListsByBoardId(id, userEmail) {
        let data = await dbContext.Lists.find({ boardId: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board")
        }
        return data
    }

    async createList(rawData) {
        let data = await dbContext.Lists.create(rawData)
        return data
    }

    async editList(id, userEmail, update) {
        let data = await dbContext.Lists.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board");
        }
        return data;
    }

    async deleteList(id, userEmail) {
        let data = await dbContext.Lists.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board");
        }
    }

}


export const listService = new ListsService()