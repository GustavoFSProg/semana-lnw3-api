/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import sendgrid from '@sendgrid/mail'
import dotenv from 'dotenv'
import { Request } from 'express'

dotenv.config()

async function send(req: Request, token = null) {
  await sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: req.body.email,
    from: 'augustoprog40@gmail.com',
    subject: 'Email institucional!',
    text: 'Cadastro Node.js',
    html:
      `${'<strong>Olá '}${req.body.name}, ` +
      ` Esqueceu sua senha? Utilize esse token para redefinir a senha: </strong> Token: ${token}`,
  }
  sendgrid.send(msg)
  return sendgrid
}

export default send
