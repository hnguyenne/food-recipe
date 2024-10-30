const { profile } = require("console");
const knex = require("../database/knex");
const fs = require('fs');
const { get } = require("http");

function accountRepository(){
    return knex('users')
}


function readAccount(payload){
    return{
        user_name: payload.user_name,
        user_email: payload.user_email,
        google_id: payload.google_id,
        password_hash: payload.password_hash,
        profile_pic: payload.profile_pic,
        user_birthdate: payload.user_birthdate
    }
}

async function CreateUser(payload){
    const user = readAccount(payload)
    const [id] = await accountRepository().insert(user);
    return { id, ...user }
}


async function getUserbyId(id){
    return await accountRepository().where('id', id).select('*').first();
}


async function updateAccount(id, payload){
    const updatedAccount = await accountRepository().where('user_id', id).select('*').first();
    if (!updatedAccount){
        return null;
    }
    const update = readAccount(payload)
    if (!update.profile_pic){
        delete update.profile_pic;
    }
    await accountRepository().where('user_id', id).update(update);
    if (update.profile_pic && updatedAccount.profile_pic &&
        update.profile_pic !== updatedAccount.profile_pic &&
        updatedAccount.profile_pic.startsWith('public/uploads/images/account/')
    ){
        fs.unlink(`.${updatedAccount.profile_pic}`, (err) => {})
    }
    return { ...updatedAccount, ...update }

}

async function getUserbyEmail(email){
    return await accountRepository().where('user_email', email).select('*').first();
}

module.exports = {
    CreateUser,
    getUserbyId,
    updateAccount,
    getUserbyEmail
}