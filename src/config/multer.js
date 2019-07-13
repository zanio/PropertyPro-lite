import multer from 'multer';
import path from 'path';
import Datauri from 'datauri';
const dUri = new Datauri();
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

const multerArrayUploads = multer({ storage }).array('myFiles', 4);


const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const dataUris = req =>{
	let AlliUri = [];
	for(let i =0; i < req.files.length; i++){
		AlliUri.push(dUri.format(path.extname(req.files[i].originalname).toString(), req.files[i].buffer)); 
	}
	return AlliUri;
     
};

export { multerUploads, dataUri,dataUris, multerArrayUploads};