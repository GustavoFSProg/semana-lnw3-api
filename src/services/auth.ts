import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function Autorize(req, res, next) {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    res.status(401).json({
      message: 'Acesso Restrito',
    })
  } else {
    // eslint-disable-next-line func-names
    jwt.verify(token, process.env.GLOBAL_SAL_KEY, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Token Inválido!',
        })
      } else {
        next()
      }
    })
  }
}
