'use strict'

var gUsers
var gCurrUser
var gSortBy = 'username'
var gIsTable = true

_createUsers()

function getUsersToShow() {
    if (gSortBy === 'username') {
        gUsers = sortByText(gUsers, 'username')
    } else if (gSortBy === 'lastLoginTime') {
        gUsers = sortByNumber(gUsers, 'timestamp')
    }

    return gUsers
}

function doLogin(userName, password) {
    const user = gUsers.find(user => {
        if (user.username === userName && user.password === password)
            return user
    })

    if (!user) return null

    var timestamp = new Date().getTime()
    user.timestamp = timestamp
    user.lastLoginTime = timestampToTime(timestamp)

    gCurrUser = userName

    _saveUsersToStorage(user)

    return user
}

function clearStorage() {
    const loggedInUsers = getLoggedInUsers()

    if (loggedInUsers) {
        const userIndex = loggedInUsers.findIndex(user => user.username === getUserName());

        if (userIndex !== -1) {
            loggedInUsers.splice(userIndex, 1);

            _saveUsersToStorage(loggedInUsers)
        }
    }

    saveCurrUserToStorage('')
    // clearLocalStorage()
}

function renderUsersTable() {
    var strHtml = ''

    strHtml +=
        '<tr class="table-header">\n' +
        '<td>userName</td>\n' +
        '<td>password</td>\n' +
        '<td>lastLoginTime</td>\n' +
        '<td>isAdmin</td>\n' +
        '</tr>\n'

    getUsersToShow().forEach(user => {
        strHtml += '<tr>\n'

        strHtml += '<td>' + user.username + '</td>\n'
        strHtml += '<td>' + user.password + '</td>\n'
        strHtml += '<td>' + user.lastLoginTime + '</td>\n'
        strHtml += '<td>' + user.isAdmin + '</td>\n'

        strHtml += '</tr>\n'
    })

    return strHtml
}

function getUserName() {
    return gCurrUser
}

function setSortBy(sortBy) {
    gSortBy = sortBy
}

function getLoggedInUsers() {
    return loadFromStorage('usersDB')
}

function saveCurrUserToStorage(userName) {
    saveToStorage('currLoggedInUserName', userName)
}

function getCurrLoggedInUser() {
    return loadFromStorage('currLoggedInUserName')
}

function _createUsers() {
    gUsers = [
        _createUser('Alice', 'A', true),
        _createUser('Zack', 'Z', false),
        _createUser('Paul', 'P', false),
    ]
    
    _saveUsersToStorage(gUsers)
}

function _createUser(username, password, isAdmin) {
    var timestamp = new Date().getTime()
    
    return {
        id: makeId(),
        username,
        password,
        timestamp,
        lastLoginTime: timestampToTime(timestamp),
        isAdmin,
    }
}

function _saveUsersToStorage(user) {
    saveToStorage('usersDB', user)

}   

function _saveUsersToStorage(users) {
    saveToStorage('usersDB', users)
}