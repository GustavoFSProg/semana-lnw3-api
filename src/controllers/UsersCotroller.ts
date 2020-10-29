/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRepository } from 'typeorm'
import usersModel from '../models/usersModel'
import users_view from '../views/users_view'
import * as yup from 'yup'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../services/Token'
import sendCreate from '../services/email-create'
import send from '../services/email-service'
import dotenv from 'dotenv'

dotenv.config()

async function getAll(req: Request, res: Response) {
  try {
    const UsersRepository = getRepository(usersModel)

    const data = await UsersRepository.find()

    return res.status(200).send(users_view.renderMany(data))
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function create(req: Request, res: Response) {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password),
    }

    const UsersRepository = getRepository(usersModel)

    const users = await UsersRepository.create(data)

    await UsersRepository.save(users)

    const token = await generateToken(data)

    await sendCreate(req)

    return res.status(201).send({ mensagem: 'Deu certo', token })
  } catch (error) {
    return res.status(400).send({ mensagem: 'Deu errado!!', error })
  }
}

async function login(req: Request, res: Response) {
  try {
    const data = { email: req.body.email, password: req.body.password }

    const UsersRepository = getRepository(usersModel)

    const found = await UsersRepository.find(data)

    if (!found) {
      return res.status(400).send({ message: 'Usuario não encontrado' })
    }
    const token = await generateToken(data)

    return res.status(200).send({ msg: 'Login efetuado com sucesso!', token })
  } catch (error) {
    return res.status(400).send({ msg: 'Erro no login', error })
  }
}

async function forgotPassword(req: Request, res: Response) {
  const data = { email: req.body.email, name: req.body.name }
  const token = await generateToken(data)

  send(req, token)

  return res.status(200).send({ msg: 'Acesse seu emial e use o Token' })
}

async function removeAll(req: Request, res: Response) {
  try {
    const UsersRepository = getRepository(usersModel)

    await UsersRepository.delete({})

    return res.status(200).send({ message: 'Tudo apagado!' })
  } catch (error) {
    return res.status(400).send({ message: 'Erro, tudo cagado!!!' })
  }
}

async function resetPassword(req: Request, res: Response) {
  try {
    const password = md5(req.body.password)
    const UsersRepository = getRepository(usersModel)
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
      return res.send({ menssagem: 'token invalido' })
    } else {
      await UsersRepository.update(
        {
          email: req.body.email,
        },
        { password }
      )
    }

    return res.status(200).send({ msg: 'Senha atualizada com sucesso' })
  } catch (error) {
    return res.status(400).send({ msg: 'Deu erro', error })
  }
}

export default {
  create,
  getAll,
  removeAll,
  login,
  forgotPassword,
  resetPassword,
}
