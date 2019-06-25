import { uploader} from '../config/cloudinaryConfig';
import { dataUri } from './multer';


const cloudinaryHandler = (req, res) => {

	if(req.file) {
		const file = dataUri(req).content;
		return uploader.upload(file)
			.then((result) => {
				const image = result.url;
				result.tags.push('screenshot');
				result.public_id = 'api/screen';
				return res.status(200).json({
					messge: 'Your image has been uploded successfully to cloudinary',
					data: {
						image,
						result
					
					}
				});
			}).catch((err) => res.status(400).json({
				messge: 'someting went wrong while processing your request',
				data: {
					err
				}
			}));
	}
};

export {cloudinaryHandler};