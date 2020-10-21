/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRepository } from 'typeorm'
import usersModel from '../models/usersModel'
import users_view from '../views/users_view'
import * as yup from 'yup'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../services/Token'
import jwt from 'jsonwebtoken'
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

    return res.status(201).send({ mensagem: 'Deu certo', token })
  } catch (error) {
    return res.status(400).send({ mensagem: 'Deu errado!!', error })
  }
}

export default { create, getAll }