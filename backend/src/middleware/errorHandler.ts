import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import logger from '../utils/logger.js'

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Error occurred:', error)

  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors,
    })
  }

  // Axios errors (from RAG service)
  if ('response' in error && error.response) {
    const axiosError = error as any
    return res.status(axiosError.response.status).json({
      error: axiosError.response.data.error || 'External service error',
    })
  }

  // Clerk authentication errors
  if ('status' in error && error.status === 401) {
    return res.status(401).json({
      error: 'Unauthorized',
    })
  }

  // Generic error
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
  })
}
