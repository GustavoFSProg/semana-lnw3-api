import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function generateToken(data) {
  const token = jwt.sign({ data }, process.env.GLOBAL_SAL_KEY, {
    expiresIn: '1d',
  })

  return token
}

export async function decodeToken(token) {
  return jwt.decode(token, process.env.GLOBAL_SAL_KEY)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function verifyToken(token: unknown) {
  return jwt.verify(token, process.env.GLOBAL_SAL_KEY, (error, decode) => {
    if (error) return { error }
    return { decode }
  })
}
