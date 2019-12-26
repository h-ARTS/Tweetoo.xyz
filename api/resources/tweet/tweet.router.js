import { Router } from 'express'
import controllers from './tweet.controllers'

const router = Router()

// /api/tweet
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

// /api/tweet/:tweetId
router
  .route('/:tweetId')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router