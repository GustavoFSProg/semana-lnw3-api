import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController.ts'
import multer from 'multer'

import uploadConfig from './config/upload'

const upload = multer(uploadConfig)
const routes = new Router()

routes.post('/orphanages', upload.array('images'), OrphanagesController.Create)
routes.get('/', OrphanagesController.getAll)
routes.get('/:id', OrphanagesController.getById)

export default routes
