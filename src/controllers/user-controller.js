const { UserService } = require('../services');

const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

async function signup(req, res){
    try{
        const user = await UserService.signup({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.data = user;

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        // console.log(error.statusCode);
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function signin(req, res){
    try{
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.data = user;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error){
        ErrorResponse.error = error;

        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function addRoleToUser(req, res){
    try {
        const response = await UserService.addRoleToUser({
            id: req.body.id,
            role: req.body.role
        });

        SuccessResponse.data = response;

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    signup,
    signin,
    addRoleToUser
}