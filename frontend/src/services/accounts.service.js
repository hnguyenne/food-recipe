import { DEFAULT_PIC } from "@/constants";

async function efetch(url, options = {}) {
    let result = {};
    let json = {};
    try {
        result = await fetch(url, options);
        json = await result.json();
    } catch (error) {
        throw new Error(error.message);
    }
    if (!result.ok || json.status !== 'success') {
        throw new Error(json.message);
    }
    return json.data;
}

function makeAccountsService(){
    const baseUrl = '/api/v1/users';

    async function fetchAccount(id){
        const {user} = await efetch(`${baseUrl}/${id}`);
        return {
            user,
            profile_pic: user.profile_pic ?? DEFAULT_PIC
        }
    }

    async function createAccount(user){
        return efetch(baseUrl, {
            method: 'POST',
            body: user
        })
    }

    async function updateAccount(id, user){
        return efetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            body: user,
        })
    }

    return {
        fetchAccount,
        createAccount,
        updateAccount
    }
}
