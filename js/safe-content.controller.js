'use strict'

function onInit() {
    const elSecretContentSection = document.querySelector('.secret-content-section')
    const elLoginSection = document.querySelector('.login-section')

    elSecretContentSection.style.display = 'none'
    elLoginSection.style.display = 'block'
}

function onInitAdmin() {
    const loggedInUsers = getLoggedInUsers()
    const currentUser = loggedInUsers.find(user => user.username === getCurrLoggedInUser())

    if (!loggedInUsers || !currentUser || !currentUser.isAdmin) {
        window.location.href = 'index.html'
        return
    }

    onRenderUsersTable()
}

function onDoLogin() {
    const elUserName = document.querySelector('.user-name')
    const elPassword = document.querySelector('.password')

    if (!elUserName.value || !elPassword.value) return

    const user = doLogin(elUserName.value, elPassword.value)

    elUserName.value = ''
    elPassword.value = ''

    if (!user) {
        alert('No user name or password found')
        return
    } else if (user.isAdmin) {
        renderAdminBtn('remove')
    }

    renderSecretContent()
}

function renderSecretContent() {
    const elLoginSection = document.querySelector('.login-section')
    elLoginSection.style.display = 'none'

    const elUserNameDisplay = document.querySelector('.user-name-display')
    const elSecretContentSection = document.querySelector('.secret-content-section')

    elUserNameDisplay.innerHTML = `${getUserName()}`
    elSecretContentSection.style.display = 'block'

    saveCurrUserToStorage(getUserName())
}

function onDoLogOut() {
    if (window.location.href.includes('admin.html')) window.location.href = 'index.html'

    renderAdminBtn('add')
    clearStorage()
    onInit()

    const elUserNameDisplay = document.querySelector('.user-name-display')
    elUserNameDisplay.style.display = 'none'
}

function onAdmin() {
    window.location.href = 'admin.html'
}

function renderAdminBtn(action) {
    const elAdminBtn = document.querySelector('.admin')
    if (action === 'remove') {
        elAdminBtn.classList.remove('hidden')
    } else {
        elAdminBtn.classList.add('hidden')
    }
}

function onRenderUsersTable() {
    const elTable = document.querySelector('.users-table')
    elTable.innerHTML = renderUsersTable()
}

function onSetSortBy(elSelect) {
    setSortBy(elSelect.value)
    onRenderUsersTable()
}
