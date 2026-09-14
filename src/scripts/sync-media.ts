import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const backendUploads = 'D:/Projects/adapted-vehicle/backend/public/uploads'
const targetMediaDir = 'D:/Projects/adapted-vehicle/frontend/media'

if (!fs.existsSync(targetMediaDir)) {
  fs.mkdirSync(targetMediaDir, { recursive: true })
}

const baseImages = [
  'anand_motors_jaipur_ce1183a448.jpg',
  'car_ferro_a2a4e82d9d.jpg',
  'galary_system_workshop_bangalore_f947efcf16.jpg',
  'm_k_motors_jaipur_rajasthan_1_7fb2dd3fd5.jpg',
  'm_k_motors_jaipur_rajasthan_2_c86cd8e200.jpg',
  'm_k_motors_jaipur_rajasthan_90a158718b.jpg',
  'mobility_solutions_karnal_895d9f202c.jpg',
  'saika_mobility_hub_1_36e78e2c3a.jpg',
  'saika_mobility_hub_d1363ec9a5.jpg',
  'shree_vari_engineering_works_chennai_05eff0b137.jpg',
  'shree_vari_engineering_works_chennai_2_8f4114e4d9.jpg',
]

async function generate() {
  for (const file of baseImages) {
    const srcPath = path.join(backendUploads, file)
    if (!fs.existsSync(srcPath)) {
      console.warn('Source not found:', srcPath)
      continue
    }

    const baseName = file.replace(/\.jpg$/, '')
    const variants = [`${baseName}-2`, `${baseName}-1`, baseName]

    for (const v of variants) {
      const destFile = path.join(targetMediaDir, `${v}.jpg`)
      fs.copyFileSync(srcPath, destFile)

      await sharp(srcPath)
        .resize(300, 200, { fit: 'cover', position: 'centre' })
        .toFile(path.join(targetMediaDir, `${v}-300x200.jpg`))

      await sharp(srcPath)
        .resize(750, 500, { fit: 'cover', position: 'centre' })
        .toFile(path.join(targetMediaDir, `${v}-750x500.jpg`))

      await sharp(srcPath)
        .resize(1200, 800, { fit: 'cover', position: 'centre' })
        .toFile(path.join(targetMediaDir, `${v}-1200x800.jpg`))
    }
    console.log('Processed:', file)
  }
  console.log('All media files generated successfully in', targetMediaDir)
}

generate().catch(console.error)
