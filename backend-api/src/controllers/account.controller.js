const accountsService = require('../services/account.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');
const { application, json } = require('express');

async function login(req, res, next) {
    
}

async function logout(req, res, next) {
    const { id } = req.params;
    try{
        const deleted = await accountsService.logout(id);
        return res.json(JSend.success())
    }
    catch (error){
        console.log(error);
        return next(new ApiError(500, `Error occurred while logging out`))
    }
}

async function register(req, res, next) {
    if (!req.body?.user_name || typeof req.body.user_name !== 'string'){
        return next(new ApiError(400, 'Name cannot be empty'))
    }
    try {
        const user = await accountsService.CreateUser({
            ...req.body,
            profile_pic: req.file ? `/public/uploads/images/${req.file.filename}` : null
        })
        return res.status(201).set({
            Location: `${req.baseUrl}/${user.id}`,
        }).json(JSend.success({
            user,
        }))
    }
    catch (error){
        console.log(error);
        return next(new ApiError(500, 'An error occurred while create new account'))
    }
}

async function getProfile(req, res, next){
    const { id } = req.params;

    try {
        const user = await accountsService.getUserbyId(id);
        if(!user){
            return next(new ApiError(404, 'User not found'));

        }
        return res.json(JSend.success({ user }));
    }
    catch (error){
        console.log(error);
        return next(new ApiError(500, `Error retrieving user id ${id}`))
    }
}

async function updateProfile(req, res, next){
    if (Object.keys(req.body).length == 0 && req.file){
        return next(new ApiError (400, 'Data cannot be empty'))
    }
    const { id } = req.params;

    try{
        const updated = await accountsService.updateAccount(id, {
            ...req.body,
            profile_pic: req.file? `public/uploads/images/${req.file.filename}` : null,
        })
        if (!updated) {
            return next(new ApiError(404, 'User not found'))
        }
        return res.json(JSend.success({ user: updated, }))
    }
    catch (error){
        console.log(error);
        return next(new ApiError(500, `Error updating user id ${id}`))
    }    
}

module.exports = {
    login,
    logout,
    register,
    getProfile,
    updateProfile,
};