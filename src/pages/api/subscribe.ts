import type { NextApiRequest, NextApiResponse } from 'next'
import MailerLite from '@mailerlite/mailerlite-nodejs'
import { toast } from 'react-hot-toast'
import { Notification } from '../../components/Notification'

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY || '',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'POST') {
    // handle a POST request
    const { email } = req.body

    // group and url from https://dashboard.mailerlite.com/integrations/api
    const params = { email: email, groups: ['112345086202742155'] }

    mailerlite.subscribers
      .createOrUpdate(params)
      .then((response) => {
        const { data } = response
        res.status(200).json({ success: true, data })
      })
      .catch((error) => {
        if (error.response) res.status(400).send(error.message)
      })
  } else {
    // handle other request types (e.g. GET, PUT, DELETE)
    res.status(404).json({ success: false, error: 'Method not allowed' })
  }
}
