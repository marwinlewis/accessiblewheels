import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'

async function reset() {
  const payload = await getPayload({ config })
  const newPassword = 'AdminPassword@2026'
  const updated = await payload.update({
    collection: 'users',
    where: { email: { equals: 'admin@adaptedvehicle.in' } },
    data: {
      password: newPassword,
    },
  })
  console.log('PASSWORD_RESET_SUCCESS:', updated.docs.length, 'user(s) updated.')
  console.log('EMAIL: admin@adaptedvehicle.in')
  console.log('PASSWORD:', newPassword)
  process.exit(0)
}
reset().catch(err => {
  console.error(err)
  process.exit(1)
})
