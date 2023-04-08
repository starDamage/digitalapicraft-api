import { Router } from 'express';
import { getRandomUserHandler } from '../handlers/userHandler';


let userRoute = Router();

userRoute.get('/get-random-users', getRandomUserHandler);


export default userRoute;