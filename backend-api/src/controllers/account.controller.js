const accountsService = require('../services/account.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');
const bcrypt = require('bcrypt'); 

async function login(req, res, next) {
    if (!req.body?.email || typeof req.body.email !== 'string'){
        return next(new ApiError(400, 'Email cannot be empty'))
    }

    if (!req.body?.password || typeof req.password !== 'string'){
        return next(new ApiError(400, 'Password cannot be empty'))
    }
    try{
        const user = await accountsService.getUserbyEmail(req.body.email);
        if (!user) {
            return next(new ApiError(404, 'Email not found'))
        }
        const Match = await bcrypt.compare(req.body.password, user.PASSWORD_HASH);
        if (!Match){
            return next(new ApiError(401, 'Password incorrect'))
        }
        req.session.isLoggedIn = true;
        req.session.email = req.body.email;
        return res.json({
            message: 'Logged in successfully!',
            user: {
                user_id: user.user_id,
                user_email: user.user_email,
                profile_pic: user.profile_pic
            }
        })
    }
    catch (error){
        console.log(error);
        return next (new ApiError(500, 'Internal server error'))
    }

}

function logout(req, res) { 
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    })
}

async function register(req, res, next) {
    if (!req.body?.user_name || typeof req.body.user_name !== 'string'){
        return next(new ApiError(400, 'Name cannot be empty'))
    }
    try {
        const password = req.body.password;
        console.log(password);
        const hashedPassword = await bcrypt.hash(req.body.password, 5)
        const user = await accountsService.CreateUser({
            ...req.body,
            PASSWORD_HASH: hashedPassword,
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