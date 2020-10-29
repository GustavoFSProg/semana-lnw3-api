/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import sendgrid from '@sendgrid/mail'
import dotenv from 'dotenv'
import { Request } from 'express'

dotenv.config()

async function sendCreate(req: Request) {
  await sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: req.body.email,
    from: 'augustoprog40@gmail.com',
    subject: 'Email institucional!',
    text: 'Cadastro Node.js',
    html:
      `${'<strong>Olá '}${req.body.name}, ` +
      ` Obrigado por se cadastrar aqui no nosso site! </strong>`,
  }
  sendgrid.send(msg)
  return sendgrid
}

export default sendCreate
