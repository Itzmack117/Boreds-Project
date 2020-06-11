import express from "express";
import BaseController from "../utils/BaseController";
import { taskService } from "../services/TasksService";
import auth0provider from "@bcwdev/auth0provider";


export class TasksController extends BaseController {
    constructor() {
        super("api/tasks");
        this.router
            // .get('', this.getAll)
            .get("", this.getTasksByListId)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(auth0provider.getAuthorizedUserInfo)
            .post('', this.createTask)
            .put('/:id', this.editTask)
            .delete('/:id', this.deleteTask)
    }
    // async getAll(req, res, next) {
    //     try {
    //         //only gets boards by user who is logged in
    //         let data = await taskService.getAll(req.userInfo.email)
    //         return res.send(data)
    //     }
    //     catch (err) { next(err) }
    // }

    async createTask(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await taskService.createTask(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async getTasksByListId(req, res, next) {
        try {
            let data = await taskService.getTasksByListId(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async editTask(req, res, next) {
        try {
            let data = await taskService.editTask(req.params.id, req.userInfo.email, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async deleteTask(req, res, next) {
        try {
            await taskService.deleteTask(req.params.id, req.userInfo.email)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}