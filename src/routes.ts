import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import UsersController from './controllers/UsersCotroller'
import multer from 'multer'

import uploadConfig from './config/upload'

const upload = multer(uploadConfig)
const routes = Router()

routes.get('/', OrphanagesController.getAll)
routes.post('/orphanages', upload.array('images'), OrphanagesController.Create)
routes.get('/orphanages/:id', OrphanagesController.getById)
routes.get('/users', UsersController.getAll)
routes.post('/users', UsersController.create)

export default routes
