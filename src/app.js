// Import packages
import express from 'express';
import morgan from 'morgan';
import { cloudinaryConfig } from './config/cloudinaryConfig';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routerJsObject from './routes/routesjs/index.routes';
import routerdb from './routes/routesdb/index.routes';
import cors from 'cors';

const router = !process.env.type? routerJsObject : routerdb;


// App
const app = express();

// Morgan
app.use(morgan('tiny'));

const configurationOption = {
	origin: ['http://127.0.0.1:5500','https://propertpro-lite.herokuapp.com','https://zanio.github.io']
};

//Cors configuration
app.use(cors(configurationOption));

app.use( (request, response, next) => {
	response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});


// First route
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('*', cloudinaryConfig);
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use('*', (req, res) => {
	res.status(404).json({status:404,err:'That routes is not a known route'});
});

// Starting server
const PORT = process.env.PORT || 3300;
app.listen(PORT, ()=>{
	const debug = require('debug')('http');
	debug('app is running on '+PORT);
});

export default app;