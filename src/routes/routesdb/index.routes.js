import express from 'express';
const router = express.Router();
import {Userrouter} from './userdb.routes';
import {propertyrouter} from './propertydb.routes';


router.use('/api/v1/', Userrouter);
router.use('/api/v1/',propertyrouter);
router.get('/api/v1/', (req, res) => {
	res.status(200).json({ status:200,data:'welcome to PropertyPro-lite'});
});


export default router;