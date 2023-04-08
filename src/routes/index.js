import { Router } from 'express';
import usersRoute from './user';
import wordsRoute from './words';


let indexRoute = Router();

indexRoute.use('/users', usersRoute);
indexRoute.use('/words', wordsRoute);

export default indexRoute;