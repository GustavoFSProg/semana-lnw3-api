import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import multer from 'multer'

import uploadConfig from './config/upload'

const upload = multer(uploadConfig)
const routes = new Router()

// , upload.array('images')

routes.get('/', OrphanagesController.getAll)
routes.post('/orphanages', OrphanagesController.Create)
routes.get('/:id', OrphanagesController.getById)

export default routes
