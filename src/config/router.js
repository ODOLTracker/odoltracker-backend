import indexRouter from '@/routes/index';
import authRouter from '@/routes/auth';
import userRouter from '@/routes/user';
import tollgateRouter from '@/routes/tollgate';
import notificationRouter from '@/routes/notification';
import vehicleDetectionRouter from '@/routes/vehicledetection';
import imageRouter from '@/routes/image';

import 'dotenv/config';

const apiVersion = process.env.API_VERSION;

export default function (app) {
  app.use(`/${apiVersion}`, indexRouter);
  app.use(`/${apiVersion}/auth`, authRouter);
  app.use(`/${apiVersion}/profile`, userRouter);
  app.use(`/${apiVersion}/tollgate`, tollgateRouter);
  app.use(`/${apiVersion}/notification`, notificationRouter);
  app.use(`/${apiVersion}/vehicledetection`, vehicleDetectionRouter);
  app.use(`/${apiVersion}/image`, imageRouter);
}