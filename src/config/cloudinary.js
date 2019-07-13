import { uploader} from './cloudinaryConfig';
import { dataUri,dataUris } from './multer';

const contentimg = async req =>{
	let file =[];
	await dataUris(req).map(el=>{
		file.push(el.content);
	});
	return file;
};

const uploadall =  (array,arrayImage) =>{
	
	return new Promise( (resolve,reject)=>{
		
		array.map(async (file)=>{
			try{
				let result = await uploader.upload(file);
				let image =  await result.url;
				
				arrayImage.push(image);
				if(arrayImage[3]){
					resolve(arrayImage);
				}
			}
			catch(err){
				if(err)reject(err);
				
			}	
				
		});

	});
	
	
};

const uploadone =  (singleimage) =>{
	
	return new Promise( async (resolve,reject)=>{
		try{
			let result = await uploader.upload(singleimage);
			let image =  await result.url;	
				
			if(image){
				resolve(image);
			}
		}
		catch(err){
			if(err)reject(err);
				
		}	
	});
	
	
};


const cloudinaryHandler = async (req, res,next) => {
	
	if(req.file) {
		const file = dataUri(req).content;
		// console.log(file)
		// let files = await contentimg(req);
		// let arrayImage = [];

		try{
			const singlefile = await uploadone(file);
			//const multiplefiles = await uploadall(files,arrayImage);
			//let arrayImages = multiplefiles;
			req.Image_url = singlefile;
			//req.Image_urls = arrayImages;
			next();
		} catch(err){
			if(err){
				return res.status(500).json({status:500,error:err.message});
			}
		}		
	} 	
};
	


export {cloudinaryHandler};