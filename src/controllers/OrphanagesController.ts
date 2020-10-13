import { getRepository } from 'typeorm'
import orphanages from '../models/OrphanageModel.ts'

async function getAll(req, res) {
  try {
    const orphanagesRepository = getRepository(orphanages)

    const data = await orphanagesRepository.find()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(200).json(error)
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params

    const orphanagesRepository = getRepository(orphanages)

    const data = await orphanagesRepository.findOneOrFail(id)

    return res.status(200).json(data)
  } catch (error) {
    return res.status(200).json(error)
  }
}

async function Create(req, res) {
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

    const orfanatos = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    })

    await orphanagesRepository.save(orfanatos)

    return res.status(201).json({ orfanatos })
  } catch (error) {
    return res.status(400).send({ error, message: 'Got an Error!!' })
  }
}

export default { Create, getAll, getById }
