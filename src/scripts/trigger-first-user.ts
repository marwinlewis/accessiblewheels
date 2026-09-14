import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'

async function triggerFirstUser() {
  const payload = await getPayload({ config })
  const res = await payload.delete({
    collection: 'users',
    where: {
      id: { exists: true },
    },
  })
  console.log(`Deleted ${res.docs.length} user(s). Navigating to /admin will now show the 'Create First User' onboarding screen.`)
  process.exit(0)
}

triggerFirstUser().catch(err => {
  console.error(err)
  process.exit(1)
})
