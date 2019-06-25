import express from 'express';
const router = express.Router();
import {Userrouter} from './user.routes';
import {propertyrouter} from './property-advert.routes';


//console.log(Userrouter);
//router.use('/api/v1/', require('./post.routes'));
router.use('/api/v1/', Userrouter);
router.use('/api/v1/',propertyrouter);
router.get('/', (req, res) => {
	res.status(200).json({ status:200,data:'welcome to PropertyPro-lite'});
});

export default router;