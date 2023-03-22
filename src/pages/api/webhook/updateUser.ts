import { prisma } from '@/server/prisma'
import { buffer } from 'micro'

import { Webhook } from 'svix'

export const config = {
  api: {
    bodyParser: false,
  },
}
// clerk secret from the webhook above
const secret = process.env.CLERK_WEBHOOK_SECRET ?? ''

export default async function handler(req, res) {
  //collect the stream and parse it to a string
  const payload = (await buffer(req)).toString()
  const headers = req.headers
  // create a new webhook instance
  const wh = new Webhook(secret)
  let msg
  try {
    // verify the webhook and get the message
    msg = wh.verify(payload, headers)
  } catch (error) {
    return res.status(400).send(error.message)
  }

  const { id, username, profile_image_url: profileImageUrl } = msg.data

  const shouldIgnoreGravatar = profileImageUrl.includes('gravatar')
  // I don't want to use the gravatar image so I set it to null if the user doesn't have a profile image
  const sanitizedProfileImageUrl = shouldIgnoreGravatar ? null : profileImageUrl

  try {
    // delete case  (also deletes all the guestbook entries as it cascades)
    if (msg.data.deleted) {
      await prisma.user.delete({
        where: { id: msg.data.id },
      })
    }
    // update create case
    await prisma.user.upsert({
      where: { id: msg.data.id },
      update: {
        username,
        profileImageUrl: sanitizedProfileImageUrl,
      },
      create: {
        id,
        username,
        profileImageUrl: sanitizedProfileImageUrl,
      },
    })
    res.status(200).json()
  } catch (error) {
    console.error(error)
    res.status(error.requestResult.statusCode).send(error.message)
  }
}
