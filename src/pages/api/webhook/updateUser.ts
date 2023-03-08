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
  console.log('REQ', req)
  const wh = new Webhook(secret)
  let msg
  try {
    msg = wh.verify(payload, headers)
  } catch (err) {
    res.status(400).json({})
  }
  try {
    const updatedUser = await prisma.user.upsert({
      where: { id: msg.data.id },
      update: { email: msg.data.email_addresses[0].email_address },
      create: {
        id: msg.data.id,
        email: msg.data.email_addresses[0].email_address,
      },
    })
    console.log('updatedUser', updatedUser)
    res.status(200).json()
  } catch (error) {
    console.error(error)
    res.status(error.requestResult.statusCode).send(error.message)
  }

  return
}
