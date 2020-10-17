import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import multer from 'multer'

import uploadConfig from './config/upload'

const upload = multer(uploadConfig)
const routes = Router()

routes.get('/', OrphanagesController.getAll)
routes.post('/orphanages', upload.array('images'), OrphanagesController.Create)
routes.get('/:id', OrphanagesController.getById)

export default routes
