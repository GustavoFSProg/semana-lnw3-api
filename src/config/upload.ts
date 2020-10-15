import multer from 'multer'
import path from 'path'

export default {
  storage: new multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`

      cb(null, fileName)
    },
  }),
}

// export default {
//   storage: new multer.diskStorage({
//     destination: path.resolve(__dirname, '..', '..', 'uploads'),
//     filename: function (_req, file, cb) {
//       cb(null, file.originalname)
//     },
//   }),
// }
