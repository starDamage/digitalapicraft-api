
import express from 'express';
import indexRoute from './routes';
import { StatusCodes } from 'http-status-codes';
import { responseGenerators } from './utils/common.functions';
import { ERROR_MESSAGES } from './utils/common.variables';

const app = express();
const port = 3000;


// Routers
app.use('/api', indexRoute);

// Home route.
app.get('/', (req, res) => {
    res.send('Server is up and running..');
});


// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
    return res
        .status(StatusCodes.BAD_REQUEST)
        .send(
            responseGenerators(
                {},
                StatusCodes.BAD_REQUEST,
                ERROR_MESSAGES.NO_ROUTE_FOUDN,
                true
            )
        );
});

// Handle all other errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(
            responseGenerators(
                {},
                StatusCodes.INTERNAL_SERVER_ERROR,
                ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
                true
            )
        );
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
