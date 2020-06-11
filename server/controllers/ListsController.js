import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { listService } from '../services/ListsService'
import { taskService } from '../services/TasksService'


//PUBLIC
export class ListsController extends BaseController {
    constructor() {
        super("api/lists/")
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            .get('/:id/tasks', this.getTasksByListId)
            .post('', this.createList)
            .put('/:id', this.editList)
            .delete('/:id', this.deleteList)
    }
    // TODO Write getTasksByListId (see: getListsByBoardId)
    async createList(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await listService.createList(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async getTasksByListId(req, res, next) {
        try {
            let data = await taskService.getTasksByListId(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async editList(req, res, next) {
        try {
            let data = await listService.editList(req.params.id, req.userInfo.email, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async deleteList(req, res, next) {
        try {
            await listService.deleteList(req.params.id, req.userInfo.email)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}