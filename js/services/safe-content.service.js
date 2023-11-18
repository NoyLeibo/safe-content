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

function doLogin(userName, password) {
    const user = gUsers.find(user => {
        if (user.username === userName && user.password === password)
            return user
    })
    console.log('user:', user)

    if (!user) return null

    var timestamp = new Date().getTime()
    user.lastLoginTime = timestampToTime(timestamp)

    gCurrUser = userName

    _saveUsers()

    return user
}

function clearStorage() {
    clearLocalStorage()
}

function getUserName() {
    return gCurrUser
}

function _createUsers() {
    gUsers - loadFromStorage('usersDB')
    if (gUsers && gUsers.length) return

    gUsers = [
        _createUser('A', 'A', true),
        _createUser('J', 'J', false),
        _createUser('P', 'P', false),
    ]

}

function _createUser(username, password, isAdmin) {
    var timestamp = new Date().getTime()

    return {
        id: makeId(),
        username,
        password,
        lastLoginTime: timestampToTime(timestamp),
        isAdmin,
    }
}

function _saveUsers() {
    saveToStorage('usersDB', gUsers)
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

    gUsers.forEach(user => {
        strHtml += '<tr>\n'

        strHtml += '<td>' + user.username + '</td>\n'
        strHtml += '<td>' + user.password + '</td>\n'
        strHtml += '<td>' + user.lastLoginTime + '</td>\n'
        strHtml += '<td>' + user.isAdmin + '</td>\n'

        strHtml += '</tr>\n'
    })

    return strHtml
}