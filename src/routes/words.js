import { Router } from 'express';
import { wordCountHandler, wordCountSecondHandler } from '../handlers/wordHandler';


let wordRoute = Router();

wordRoute.get('/v1/get-word-count', wordCountHandler);
wordRoute.get('/v2/get-word-count', wordCountSecondHandler);


export default wordRoute;