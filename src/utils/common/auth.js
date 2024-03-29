const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../../config');
const bcrypt = require('bcrypt');
const AppError = require('../error/app-error');
const { StatusCodes } = require('http-status-codes');

function checkPassword(plainTextPassword, encryptedPassword){
    try {
        return bcrypt.compareSync(plainTextPassword, encryptedPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function createToken(input){
    try {
        return jwt.sign(input, ServerConfig.JWT_SECRET , {expiresIn: ServerConfig.JWT_EXPIRY});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function verifyToken(token){
    try {
        console.log('I am in Auth');
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    checkPassword,
    createToken,
    verifyToken
}