import { prisma } from '@/server/prisma'
import { buffer } from 'micro'

import { Webhook } from 'svix'

export const config = {
  api: {
    bodyParser: false,
  },
}

const secret = process.env.CLERK_WEBHOOK_SECRET ?? ''

export default async function handler(req, res) {
  const payload = (await buffer(req)).toString()
  const headers = req.headers

  const wh = new Webhook(secret)
  let msg
  try {
    msg = wh.verify(payload, headers)
  } catch (error) {
    res.status(400).send(error.message)
  }

  try {
    // delete case  (also deletes all the guestbook entries as it cascades)
    if (msg.data.deleted) {
      await prisma.user.delete({
        where: { id: msg.data.id },
      })
      res.status(200).json()
      return
    }
    // update create case
    await prisma.user.upsert({
      where: { id: msg.data.id },
      update: {
        username: msg.data.username,
        profileImageUrl: msg.data.profile_image_url.includes('gravatar')
          ? null
          : msg.data.profile_image_url,
      },
      create: {
        id: msg.data.id,
        profileImageUrl: msg.data.profile_image_url.includes('gravatar')
          ? null
          : msg.data.profile_image_url,
        username: msg.data.username,
      },
    })
    res.status(200).json()
  } catch (error) {
    console.error(error)
    res.status(error.requestResult.statusCode).send(error.message)
  }

  return
}
