import { Router } from 'express'
import controllers from './reply.controllers'
import { appendToUser, removeFromUser } from '../user/user.controllers'
import {
  appendReplyToTweet,
  removeReplyFromTweet
} from '../tweet/tweet.controllers'

const router = Router()

// /api/reply
router
  .route('/')
  .get(controllers.getSpecific)
  .post(controllers.createOne, appendReplyToTweet, appendToUser)
  .put(controllers.updateOne)
  .delete(controllers.removeOne, removeReplyFromTweet, removeFromUser)

router.route('/like').put(controllers.likeDoc)
router.route('/unlike').put(controllers.unlikeDoc)
router.route('/retweet').put(controllers.reTweet)
router.route('/undoretweet').put(controllers.undoRetweet)

export default router
