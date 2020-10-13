import { getRepository } from 'typeorm'
import orphanages from '../models/OrphanageModel.ts'

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

    const orfanatos = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    })

    await orphanagesRepository.save(orfanatos)

    return res.status(201).send({ message: 'Orphanage created successufuly' })
  } catch (error) {
    return res.status(400).send({ error, message: 'Got an Error!!' })
  }
}

export default { Create }
