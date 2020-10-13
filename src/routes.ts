import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController.ts'

const routes = new Router()

routes.post('/orphanages', OrphanagesController.Create)

export default routes
