import { prisma } from '@/server/prisma'
import { arrayBuffer } from 'stream/consumers'

import { Webhook } from 'svix'

export const config = {
  api: {
    bodyParser: false,
  },
}

const secret = process.env.CLERK_WEBHOOK_SECRET ?? ''

export default async function handler(req, res) {
  const payload = (await arrayBuffer(req)).toString()
  const headers = req.headers
  console.log('REQ', req)
  const wh = new Webhook(secret)
  let msg
  try {
    msg = wh.verify(payload, headers)
  } catch (err) {
    res.status(400).json({})
  }
  console.log('MESSAGE', msg)

  return prisma.user.upsert({
    where: { id: msg.data.id },
    update: { email: msg.data.email_addresses[0].email_address },
    create: {
      id: msg.user.id,
      email: msg.data.email_addresses[0].email_address,
    },
  })
}
