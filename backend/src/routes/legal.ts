import { Router } from 'express'
import { requireAuth } from '@clerk/clerk-sdk-node'
import axios from 'axios'
import { z } from 'zod'
import logger from '../utils/logger.js'

const router = Router()

// Validation schemas
const querySchema = z.object({
  question: z.string().min(1),
  jurisdiction: z.string().length(2).optional(),
  documentTypes: z.array(z.string()).optional(),
  maxResults: z.number().min(1).max(20).optional().default(5),
})

const definitionSchema = z.object({
  term: z.string().min(1),
  jurisdiction: z.string().length(2).optional(),
  plainLanguage: z.boolean().optional().default(true),
})

const stateComparisonSchema = z.object({
  concept: z.string().min(1),
  states: z.array(z.string().length(2)).min(2).max(5),
})

const evidenceSchema = z.object({
  claimType: z.string().min(1),
  jurisdiction: z.string().length(2),
})

// POST /api/legal/query - Query the legal RAG system
router.post('/query', requireAuth(), async (req, res, next) => {
  try {
    const data = querySchema.parse(req.body)
    const userId = req.auth.userId
    
    logger.info(`Legal query from user ${userId}: ${data.question}`)
    
    // Call Python RAG service
    const response = await axios.post(
      `${process.env.RAG_SERVICE_URL}/query`,
      data,
      {
        headers: {
          'X-User-Id': userId,
        },
      }
    )
    
    // Log query for analytics
    await logQuery(userId, data.question, data.jurisdiction)
    
    res.json(response.data)
  } catch (error) {
    next(error)
  }
})

// GET /api/legal/definition/:term - Get legal definition
router.get('/definition/:term', requireAuth(), async (req, res, next) => {
  try {
    const { term } = req.params
    const jurisdiction = req.query.jurisdiction as string | undefined
    const plainLanguage = req.query.plainLanguage !== 'false'
    
    const response = await axios.get(
      `${process.env.RAG_SERVICE_URL}/definition/${encodeURIComponent(term)}`,
      {
        params: { jurisdiction, plainLanguage },
      }
    )
    
    res.json(response.data)
  } catch (error) {
    next(error)
  }
})

// POST /api/legal/compare-states - Compare laws across states
router.post('/compare-states', requireAuth(), async (req, res, next) => {
  try {
    const data = stateComparisonSchema.parse(req.body)
    
    const response = await axios.post(
      `${process.env.RAG_SERVICE_URL}/compare-states`,
      data
    )
    
    res.json(response.data)
  } catch (error) {
    next(error)
  }
})

// GET /api/legal/procedure/:type - Get procedure guide
router.get('/procedure/:type', requireAuth(), async (req, res, next) => {
  try {
    const { type } = req.params
    const { jurisdiction } = req.query
    
    if (!jurisdiction) {
      return res.status(400).json({ error: 'Jurisdiction is required' })
    }
    
    const response = await axios.get(
      `${process.env.RAG_SERVICE_URL}/procedure/${type}`,
      {
        params: { jurisdiction },
      }
    )
    
    res.json(response.data)
  } catch (error) {
    next(error)
  }
})

// POST /api/legal/evidence - Get evidence requirements
router.post('/evidence', requireAuth(), async (req, res, next) => {
  try {
    const data = evidenceSchema.parse(req.body)
    
    const response = await axios.post(
      `${process.env.RAG_SERVICE_URL}/evidence`,
      data
    )
    
    res.json(response.data)
  } catch (error) {
    next(error)
  }
})

// Helper function to log queries
async function logQuery(userId: string, question: string, jurisdiction?: string) {
  try {
    // Store in database for analytics
    logger.info('Query logged', { userId, question, jurisdiction })
    // TODO: Implement database storage
  } catch (error) {
    logger.error('Failed to log query', error)
  }
}

export default router
