/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRepository } from 'typeorm'
import usersModel from '../models/usersModel'
import users_view from '../views/users_view'
import * as yup from 'yup'
import { Request, Response } from 'express'
import md5 from 'md5'

async function getAll(req: Request, res: Response) {
  try {
    const UsersRepository = getRepository(usersModel)

    const data = await UsersRepository.find()

    return res.status(200).send(users_view.renderMany(data))
  } catch (error) {
    return res.status(400).send({ error })
  }
}

// async function getAll(req: Request, res: Response) {
//   return res.send('Entrou na colcete!')
// }

async function create(req: Request, res: Response) {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password),
    }

    const UsersRepository = getRepository(usersModel)

    const users = UsersRepository.create(data)

    await UsersRepository.save(users)
    return res.status(201).send({ mensagem: 'Deu certo', data })
  } catch (error) {
    return res.status(400).send({ mensagem: 'Deu errado!!', error })
  }
}

export default { create, getAll }
