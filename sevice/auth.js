const sessionIdToUseMap = new Map();

function setUserId(id, user) {
    sessionIdToUseMap.set(id, user);
}

function getUser(id){
    return sessionIdToUseMap.get(id);
}

module.exports = {
    setUserId, getUser
}