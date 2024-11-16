const accountsService = require('../services/account.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');
const bcrypt = require('bcrypt'); 

async function login(req, res, next) {
    if (!req.body?.user_email || typeof req.body.user_email !== 'string'){
        return next(new ApiError(400, 'Email cannot be empty'))
    }

    if (!req.body?.password || typeof req.body.password !== 'string'){
        return next(new ApiError(400, 'Password cannot be empty'))
    }
    try{
        const user = await accountsService.getUserbyEmail(req.body.user_email);
        if (!user) {
            return next(new ApiError(404, 'Email not found'))
        }
        const Match = await bcrypt.compare(req.body.password, user.PASSWORD_HASH);
        if (!Match){
            return next(new ApiError(401, 'Password incorrect'))
        }
        return res.json(JSend.success({ user }))
    }
    catch (error){
        console.log(error);
        return next (new ApiError(500, 'Internal server error'))
    }

}


async function register(req, res, next) {
    if (!req.body?.user_name || typeof req.body.user_name !== 'string'){
        return next(new ApiError(400, 'Name cannot be empty'))
    }
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 5)
        const user = await accountsService.CreateUser({
            ...req.body,
            password_hash: hashedPassword,
            profile_pic: req.file ? `/public/uploads/${req.file.filename}` : null
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
    const { user_id } = req.params;
    try {
        const user = await accountsService.getUserbyId(user_id);
        if(!user){
            return next(new ApiError(404, 'User not found'));
        }
        return res.json(JSend.success({ user }));
    }
    catch (error){
        console.log(error);
        return next(new ApiError(500, `Error retrieving user id ${user_id}`))
    }
}

async function updateProfile(req, res, next){
    if (Object.keys(req.body).length == 0 && req.file){
        return next(new ApiError (400, 'Data cannot be empty'))
    }
    const  {user_id}  = req.params;
    try{
        const user = await accountsService.updateAccount(user_id, {
            ...req.body,
            profile_pic: req.file? `public/uploads/${req.file.filename}` : null,
        })
        if (!user) {
            return next(new ApiError(404, 'User not found'))
        }
        return res.json(JSend.success({ user }))
    }
    catch (error){
        console.log(error);
        return next(new ApiError(500, `Error updating user id ${user_id}`))
    }    
}

async function getUserFavorite(req, res, next) {
    const { user_id } = req.params;
    try {
        const favorite = await accountsService.getFavorite(user_id);
        if (!favorite){
            return next(new ApiError(404, "User not found"));
        }
        return res.json(JSend.success({ favorite }))
    }
    catch (error){
        console.log(error);
        return next (new ApiError(500, `Error retrieving favorite list of user ${user_id}`))
    }
    
}
module.exports = {
    login,
    register,
    getProfile,
    updateProfile,
    getUserFavorite
};