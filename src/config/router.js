import indexRouter from '@/routes/index';
import authRouter from '@/routes/auth';
import userRouter from '@/routes/user';
import tollgateRouter from '@/routes/tollgate';
import notificationRouter from '@/routes/notification';
import vehicleDetectionRouter from '@/routes/vehicledetection';
import imageRouter from '@/routes/image';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/profile', userRouter);
  app.use('/tollgates', tollgateRouter);
  app.use('/notifications', notificationRouter);
  app.use('/vehicledetections', vehicleDetectionRouter);
  app.use('/images', imageRouter);
}