import axios from 'axios';
import { responseGenerators } from '../utils/common.functions';
import { StatusCodes } from 'http-status-codes';
import { USER_MESSAGES } from '../utils/common.variables';


// get random 10 users handler
export const getRandomUserHandler = async (req, res, next) => {
    try {
        const { data } = await axios.get('https://randomuser.me/api/?results=10');
        const usersDetails = data.results.map(user => {
            return {
                name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                dob: user.dob.date.slice(0, 10),
                email: user.email
            };
        });
        return res
            .status(StatusCodes.OK)
            .send(
                responseGenerators(
                    { usersDetails },
                    StatusCodes.OK,
                    USER_MESSAGES.SUCCESS,
                    false
                )
            );
    } catch (err) {
        next(err);
    }
};