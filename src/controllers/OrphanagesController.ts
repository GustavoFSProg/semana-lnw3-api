/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRepository } from 'typeorm'
import orphanages from '../models/OrphanageModel'
import orphanages_view from '../views/orphanages_view'
import * as yup from 'yup'
import { Request, Response } from 'express'

async function getAll(req: Request, res: Response) {
  try {
    const orphanagesRepository = getRepository(orphanages)

    const data = await orphanagesRepository.find({
      relations: ['images'],
    })

    return res.status(200).json(orphanages_view.renderMany(data))
  } catch (error) {
    return res.status(200).json(error)
  }
}

async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params

    const orphanagesRepository = getRepository(orphanages)

    const data = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    })

    return res.status(200).json(orphanages_view.render(data))
  } catch (error) {
    return res.status(200).json(error)
  }
}

async function Create(req: Request, res: Response) {
  try {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body

    const orphanagesRepository = getRepository(orphanages)

    const requestImages = req.files as Express.Multer.File[]

    const images = requestImages.map((image) => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      status: false,
      images,
    }

    const schema = yup.object().shape({
      name: yup.string().required(),
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      about: yup.string().required().max(300),
      instructions: yup.string().required(),
      opening_hours: yup.string().required(),
      open_on_weekends: yup.boolean().required(),
      images: yup.array(
        yup.object().shape({
          path: yup.string().required(),
        })
      ),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const orfanatos = orphanagesRepository.create(data)

    await orphanagesRepository.save(orfanatos)

    return res.status(201).json({ orfanatos })
  } catch (error) {
    return res.status(400).send({ error, message: 'Got an Error!!' })
  }
}

export default { Create, getAll, getById }
