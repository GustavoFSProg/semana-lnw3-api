import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import UsersController from './controllers/UsersCotroller'
import multer from 'multer'

import uploadConfig from './config/upload'
import Autorize from './services/auth'

const upload = multer(uploadConfig)
const routes = Router()

routes.get('/', OrphanagesController.getAll)
routes.post(
  '/orphanages',
  Autorize,
  upload.array('images'),
  OrphanagesController.Create
)
routes.get('/orphanages/:id', OrphanagesController.getById)
routes.get('/users', UsersController.getAll)
routes.post('/forgot_password', UsersController.forgotPassword)
routes.post('/reset_password/:id', UsersController.resetPassword)
// routes.delete('/users/del', UsersController.removeAll)
routes.post('/users', UsersController.create)
routes.post('/users/login', UsersController.login)

export default routes
