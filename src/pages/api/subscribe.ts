import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'POST') {
    // handle a POST request
    const { email } = req.body

    try {
      const response = await fetch(
        'https://connect.mailerlite.com/api/subscribers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      )

      const data = await response.json()
      console.log('data', data)
      res.status(200).json({ success: true, data })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  } else {
    // handle other request types (e.g. GET, PUT, DELETE)
    res.status(404).json({ success: false, error: 'Method not allowed' })
  }
}
