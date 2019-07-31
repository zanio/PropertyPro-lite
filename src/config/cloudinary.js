/* eslint-disable import/prefer-default-export,  camelcase, no-console,
consistent-return,radix */
import { uploader, v2 } from './cloudinaryConfig';
import { dataUri, dataUris } from './multer';
import { generateId } from '../helpers/helper';

const contentimg = async (req) => {
	const file = [];
	await dataUris(req).map(el => file.push(el.content));
	return file;
};

const uploadall = (array, arrayImage, n) => new Promise((resolve, reject) => {
	array.map(async (file) => {
		try {
			const result = await uploader.upload(file);
			const image = await result.url;
			arrayImage.push(image);
			if (arrayImage[n]) {
				resolve(arrayImage);
			}
		} catch (err) {
			if (err)reject(err);
		}
	});
});


const uploadone = singleimage => new Promise((resolve, reject) => {
	v2.uploader.upload(singleimage, {
		resource_type: 'image',
		public_id:
										`api/screens/thumnail_${generateId()}`,
		tags: ['screenshot', 'image'],
		audio_codec: 'none',
		effect: 'auto_contrast',
		gravity: 'south',
		height: 300,
		radius: 0,
		width: 300,
		crop: 'crop',
	},

	(err, result) => {
		if (result) {
			const image = result.url;
			resolve(image);
		}
		if (err) {
			reject(err);
		}
	});
});


const cloudinaryHandler = async (req, res, next) => {
	if (req.files !== undefined) {
		const file = dataUri(req).content;
		const files = req.files.images_url ? await contentimg(req) : null;
		const arrayImage = [];


		try {
			const singlefile = await uploadone(file, res);
			const no_images = req.files.images_url ? req.files.images_url.length - 1 : null;
			const multiplefiles = req.files.images_url ? await uploadall(files, arrayImage, no_images) : ['upload at least 3 images'];

			const arrayImages = multiplefiles;

			if (singlefile || (singlefile && multiplefiles)) {
				req.Image_url = singlefile;
				req.gallery = arrayImages;

				next();
			}
		} catch (err) {
			if (err) {
				return res.status(500).json({ status: 500, error: err });
			}
		}
	}
};


export { cloudinaryHandler };
