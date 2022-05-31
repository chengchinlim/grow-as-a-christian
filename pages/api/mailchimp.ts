import { NextApiRequest, NextApiResponse } from 'next'
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // E.g. us1
})

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  console.log(`Current Env: ${process.env.NODE_ENV}`)
  console.log(`Server: ${process.env.MAILCHIMP_API_SERVER}`)
  console.log(`ListId: ${process.env.MAILCHIMP_AUDIENCE_ID}`)

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'pending',
    })
    return res.status(201).json({ error: '' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
