'use strict'

function _createUsers() {
    gUsers - loadFromStorage('usersDB')
    if(gUsers && gUsers.length) return

    gUsers = [
        _createUser('A', 'A', true),
        _createUser('J', 'J', false),
        _createUser('P', 'P', false),
    ]

}

function _createUser(username, password, isAdmin) {
    return {
        id: makeId(),
        username,
        password,
        lastLoginTime: null,
        isAdmin,
    }
}

function _saveUsers() {
    saveToStorage('usersDB', gUsers)
}