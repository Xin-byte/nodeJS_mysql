import multer, { diskStorage } from 'multer'
import { mkdir } from 'fs'

const storage = diskStorage({
  destination (req, file, cb) {
    mkdir('./uploads/', () => {
      cb(null, './uploads/')
    })
  },
  filename (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

export const upload = multer({ storage })
