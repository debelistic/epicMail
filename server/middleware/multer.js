/**
 * A post on cloudinary storage by Okupkoro Joe
 * https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54
 */

import multer from 'multer';
import path from 'path';
import Datauri from 'datauri';

const dUri = new Datauri();

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('userImage');

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multerUploads, dataUri };
