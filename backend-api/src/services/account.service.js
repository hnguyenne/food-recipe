const { profile } = require("console");
const knex = require("../database/knex");
const fs = require('fs');
const { get } = require("http");

function accountRepository(){
    return knex('users')
}

function TokenRepository(){
    return knex ('oauth_tokens')
}

function readAccount(payload){
    return{
        user_name: payload.user_name,
        user_email: payload.user_email,
        google_id: payload.google_id,
        profile_pic: payload.profile_pic,
        user_birthdate: payload.user_birthdate
    }
}

function readToken(token){
    return{
        user_id: token.user_id,
        access_token: token.access_token,
        refresh_Token: token.refresh_Token,
        expires: token.expires
    }
}
async function CreateUser(payload){
    const user = readAccount(payload)
    const [id] = await accountRepository().insert(user);
    return { id, ...user }
}

async function Login(id, tokens){
    const user = readAccount(payload).where('google_id', id).select('*');
    if (!user){
        return null;
    }
    const token = readToken(tokens)
    await TokenRepository().insert({ id, ...token })
    return {id, ...token};
}

async function updateToken(token){ // Update khi token hết hạn
    return await TokenRepository().update(token)
}

async function refreshnewToken(id){
    const token = await TokenRepository().where('user_id', id).select('*').first();
    if (!token || !token.refresh_Token){
        throw new Error('No refreshtoken available');
    }
    const newToken = await googleAuthApi.refreshToken(token.refresh_Token);
    await updateToken(id, newToken);
    return {id, ...newToken}
}

async function getUserbyId(id){
    return await accountRepository().where('id', id).select('*').first();
}

async function logout(id){
    return await TokenRepository().where('user_id', id).del();
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

module.exports = {
    CreateUser,
    Login,
    updateToken,
    refreshnewToken,
    getUserbyId,
    logout,
    updateAccount
}