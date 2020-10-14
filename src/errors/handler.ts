import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationError {
  [key: string]: string[]
}
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationError

    error.inner.forEach((err) => {
      errors[err.path] = err.errors
    })
  }
  console.log(error)

  return res.status(500).json({ msg: 'Validations fail', error })
}

export default errorHandler
