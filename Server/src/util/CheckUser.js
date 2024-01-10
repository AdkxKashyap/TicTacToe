import { isStringEmpty } from "./CommonUtils.js"

export const getUser = async (streamClient, userName) => {
    if (isStringEmpty(userName)) return false;
    const { users } = await streamClient.queryUsers({ name: userName });
    return users;
}

export const isUserExist = async (streamClient, userName) => {
    if (isStringEmpty(userName)) return false;
    const { users } = await streamClient.queryUsers({ name: userName });
    return users.length !== 0;
}