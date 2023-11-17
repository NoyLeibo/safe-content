'use strict'

var gUsers
var gCurrUser
var gSortBy

_createUsers()

function getUsersToShow() {
    if (gSortBy === 'username') {
		gUsers = sortByText(gUsers, 'username');
	} else if (gSortBy === 'password') {
		gUsers = sortByText(gUsers, 'password')
	} else if (gSortBy === 'time') {
		gUsers = sortByNumber(gUsers, 'last-login')
	} else if (gSortBy === 'isAdmin') {
		gUsers = sortByText(gUsers, 'is-admin')
	}
}


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