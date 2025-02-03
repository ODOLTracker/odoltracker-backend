import 'dotenv/config';

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import createError from 'http-errors';
import compression from 'compression';
import { v2 as cloudinary } from 'cloudinary';

import * as configs from '@/config';
import { authenticationMiddleware } from '@/middlewares';

const app = express();

// Required middleware list
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(configs.corsConfig));
app.use(compression(configs.compressionConfig));

// Custom middleware list
app.use(authenticationMiddleware);

// Cloudinary configuration
cloudinary.config(configs.cloudinaryConfig);

// Load router paths
configs.routerConfig(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
});

export default app;