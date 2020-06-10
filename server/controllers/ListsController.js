import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { listService } from '../services/ListsService'



//PUBLIC
export class ListsController extends BaseController {
    constructor() {
        super("api/lists")
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            .get('/:id', this.getListsByBoardId)
            .post('', this.createList)
            .put('/:id', this.editList)
            .delete('/:id', this.deleteList)
    }

    async getListsByBoardId(req, res, next) {
        try {
            let data = await listService.getListsByBoardId(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async createList(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await listService.createList(req.body)
            return res.status(201).send(data)
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