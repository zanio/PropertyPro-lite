import express from 'express';
import { Userrouter } from './user.routes';
import { propertyrouter } from './property.routes';
import { adminrouter } from './admin.routes';

const router = express.Router();


router.use('/api/v1/', Userrouter);
router.use('/api/v1/', propertyrouter);
router.use('/api/v1/', adminrouter);
router.get('/api/v1/', (req, res) => {
	res.status(200).json({ status: 200, data: 'welcome to PropertyPro-lite' });
});


export default router;
