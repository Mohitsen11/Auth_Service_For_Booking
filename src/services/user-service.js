const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');
const { Auth } = require('../utils/common');

const userRepo = new UserRepository();

async function signup(data){
    try{
        const response = await userRepo.create(data);
        return response;
    } catch(error){
        // console.log(error);
        if(error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((ele) => {
                explanation.push(ele.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}

async function signin(data){
    try {
        const validUser = await userRepo.getUserByEmail(data.email);
        if(!validUser){
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }
        const checkPass = await Auth.checkPassword(data.password, validUser.password);
        if(!checkPass){
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }

        const jwt = await Auth.createToken({id: validUser.id, email: validUser.email});

        return jwt;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    signup,
    signin
}