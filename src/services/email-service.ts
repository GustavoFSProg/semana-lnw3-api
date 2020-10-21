import sendgrid from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

async function send(req) {
  await sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: req.body.email,
    from: 'gustavosohne38@gmail.com',
    subject: 'Email institucional!',
    text: 'Cadastro Node.js',
    html:
      `${'<strong>Olá '}${req.body.name}, ` +
      ` Obrigado por se cadastrar no nosso site!</strong>`,
  }
  sendgrid.send(msg)
  return sendgrid
}

export default send
