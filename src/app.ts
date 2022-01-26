import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../specs/swagger.json';

import { notFoundErrorHandler, serverErrorHandler } from './controller';
import router from "./route";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Swagger API Document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// apply our default router to '/'
app.use('/', router);

// Catch 404 and forward to error handler
app.use(notFoundErrorHandler);

// Catch server error and display any error
app.use(serverErrorHandler);

export default app;
