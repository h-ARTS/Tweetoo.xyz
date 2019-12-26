import mongoose from 'mongoose'
import config from '../../config'
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

export const connect = (url = config.dbUrl, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true
  })
}