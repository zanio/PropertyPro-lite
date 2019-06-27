// Import packages
import express from 'express';
import morgan from 'morgan';
import { cloudinaryConfig } from './config/cloudinaryConfig';

// App
const app = express();
// Morgan
app.use(morgan('tiny'));
// First route
import router from './routes/index.routes';
app.use(express.json());
app.use('*', cloudinaryConfig);
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use('*', (req, res) => {
	res.status(404).json({status:404,err:'That routes is not a known route'});
});



// Starting server
const PORT = process.env.PORT || 3300;
app.listen(PORT, ()=>{
	// eslint-disable-next-line no-console
	console.log('server is listening at port %d', PORT);
});

export default app;