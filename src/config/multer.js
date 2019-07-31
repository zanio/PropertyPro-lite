import multer from 'multer';
import path from 'path';
import Datauri from 'datauri';

const dUri = new Datauri();
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image_url');
const cpUpload = multer({ storage }).fields([{ name: 'image_url', maxCount: 1 }, { name: 'images_url', maxCount: 4 }]);
const multerArrayUploads = multer({ storage }).array('images_url', 4);


const dataUri = req => dUri.format(path.extname(req.files.image_url[0].originalname).toString(),
	req.files.image_url[0].buffer);

const dataUris = (req) => {
	const AlliUri = [];
	if (req.files.images_url) {
		for (let i = 0; i < req.files.images_url.length; i += 1) {
			AlliUri.push(dUri.format(path.extname(req.files.images_url[i].originalname).toString(),
				req.files.images_url[i].buffer));
		}
	}


	return AlliUri;
};


export {
	multerUploads, dataUri, dataUris, cpUpload, multerArrayUploads,
};
