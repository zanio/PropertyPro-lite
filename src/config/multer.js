import multer from 'multer';
import path from 'path';
import Datauri from 'datauri';
const dUri = new Datauri();
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');


const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
export { multerUploads, dataUri };