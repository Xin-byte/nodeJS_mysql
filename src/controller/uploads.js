import { UploadsModel } from '../model/uploads.js'

export class UploadsController {
  static async uploadFile (req, res) {
    if (!req.file) {
      return res.status(404).json({ error: 'No file provided' })
    }

    console.log(req.file)

    const { filename: fileName, path } = req.file

    const { fileName: name } = await UploadsModel.upload({ fileName, path })

    return res.json({ url: `http://192.168.1.100:5000/${name}` })
  }
}
