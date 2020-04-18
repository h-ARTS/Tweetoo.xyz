import { Schema, SchemaTypes, model } from 'mongoose'

export const TweetSchema = new Schema(
  {
    fullText: {
      type: String,
      required: true,
      maxlength: 280
    },
    likeCount: {
      type: Number,
      default: 0
    },
    retweetCount: {
      type: Number,
      default: 0
    },
    replies: {
      type: [SchemaTypes.ObjectId],
      default: []
    },
    fullName: {
      type: String,
      required: true
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    },
    handle: {
      type: String,
      required: true
    },
    userImageUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const UserTweetSchema = new Schema({
  retweet: {
    type: Boolean,
    default: false
  },
  tweetId: {
    type: SchemaTypes.ObjectId,
    required: true
  }
})

// TweetSchema.index({ user: 1, handle: 1 }, { unique: true })

export const Tweet = model('tweet', TweetSchema)
