import { Router } from 'express'
import { requireAuth, clerkClient } from '@clerk/clerk-sdk-node'
import logger from '../utils/logger.js'

const router = Router()

// GET /api/user/profile - Get user profile
router.get('/profile', requireAuth(), async (req, res, next) => {
  try {
    const userId = req.auth.userId!
    const user = await clerkClient.users.getUser(userId)
    
    res.json({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
    })
  } catch (error) {
    next(error)
  }
})

// GET /api/user/preferences - Get user preferences
router.get('/preferences', requireAuth(), async (req, res, next) => {
  try {
    const userId = req.auth.userId!
    
    // TODO: Fetch from database
    const preferences = {
      defaultJurisdiction: 'CA',
      emailNotifications: true,
      savedQueries: [],
    }
    
    res.json(preferences)
  } catch (error) {
    next(error)
  }
})

// PUT /api/user/preferences - Update user preferences
router.put('/preferences', requireAuth(), async (req, res, next) => {
  try {
    const userId = req.auth.userId!
    const { defaultJurisdiction, emailNotifications } = req.body
    
    // TODO: Save to database
    logger.info(`Updated preferences for user ${userId}`)
    
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

export default router
