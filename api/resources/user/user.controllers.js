import { User } from './user.model'

export const myProfile = (req, res) => {
  return res.status(200).json({ data: req.user })
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ handle: req.params.handle })

    if (!user) {
      return res.status(404).end()
    }

    return res.status(200).json({ data: user })
  } catch (e) {
    console.error(e)
    return res.status(404).end()
  }
}

export const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec()

    return res.status(200).json({ data: updated })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const followHandler = async (req, res) => {
  try {
    const targetUser = await User.findOne({ handle: req.params.handle })

    if (req.body.toFollow) {
      targetUser.followers.push({ userId: req.user._id })
    } else {
      const followerToRemove = targetUser.followers.find(
        f => f.userId.toString() === req.user._id.toString()
      )
      targetUser.followers.pull({ _id: followerToRemove._id })
    }
    await targetUser.save()

    if (!targetUser) {
      return res.status(400).end()
    }

    const me = await User.findById(req.user._id)

    if (req.body.toFollow) {
      me.following.push({ userId: targetUser._id })
    } else {
      const followingToRemove = me.following.find(
        f => f.userId.toString() === targetUser._id.toString()
      )
      me.following.pull({ _id: followingToRemove._id })
    }
    await me.save()

    if (!me) {
      return res.status(400).end()
    }

    res.status(200).json({ data: { target: targetUser, updated: me } })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

// TODO: Create imageUpload controller

export const controllers = {
  myProfile: myProfile,
  updateProfile: updateProfile,
  getUser: getUser,
  followHandler: followHandler
}