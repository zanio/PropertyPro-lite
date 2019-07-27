import { uploader,v2} from './cloudinaryConfig';
import { dataUri,dataUris } from './multer';
import { idCheck } from '../middlewares/auth/auth';
import {generateId} from '../helpers/helper'

const contentimg = async (req) =>{
	let file =[];
	await dataUris(req).map(el=>{
		file.push(el.content);
	});
	return file;
};

const uploadall =  (array,arrayImage,n) =>{
	
	return new Promise( (resolve,reject)=>{
		
		array.map(async (file)=>{
			try{
				let result = await uploader.upload(file);
				let image =  await result.url;
				
				arrayImage.push(image);
				if(arrayImage[n]){
					resolve(arrayImage);
				}
			}
			catch(err){
				if(err)reject(err);
				
			}	
				
		});

	});
	
	
};


const uploadone =  (singleimage,res) =>{
	
	return new Promise(  (resolve,reject)=>{
		v2.uploader.upload(singleimage,{ resource_type: 'image', public_id: 
										'api/screens/thumnail_'+generateId(),tags:['screenshot','image'],	
		audio_codec: "none", effect: "auto_contrast", gravity: "south", height: 300, radius: 0, width: 300, crop: "crop"
		},
		
		 function(err,result){		
						if(result){
							const image = result.url
							resolve(image);
						}
						if(err){
							res.status(500).json({status:500,err})
						}
					 });
			
		});
			
};


const cloudinaryHandler = async (req, res,next) => {
	
	
	if(req.files !== undefined) {
		const file = dataUri(req).content;
		let files = req.files['images_url']? await contentimg(req):null;
		let arrayImage = [];
		
		
		try{
			const singlefile = await uploadone(file,res);
			const no_images = req.files['images_url'].length-1;
			//console.log(no_images)
			const multiplefiles = req.files['images_url']? await uploadall(files,arrayImage,no_images):['upload at least 3 images'];
			
			let arrayImages = multiplefiles;
			
			if((singlefile && multiplefiles)|| multiplefiles  ){
				req.Image_url = singlefile;
				req.gallery = arrayImages;
				
				next();
			}
				
			
		} catch(err){
			if(err){
				return res.status(500).json({status:500,error:': THIS IS MOST LIKELY A NETWORK ERROR'});
			}
		}		
	} 
};
	


export {cloudinaryHandler};