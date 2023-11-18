'use strict'

function onInit() {
    // window.location.href = 'index.html'

    const elSecretContentSection = document.querySelector('.secret-content-section')
    const elLoginSection = document.querySelector('.login-section')

    elSecretContentSection.style.display = 'none'
    elLoginSection.style.display = 'block'
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
        renderAdminBtn()
    }

    renderSecretContent()
}

function renderSecretContent() {
    const elLoginSection = document.querySelector('.login-section')
    elLoginSection.style.display = 'none'

    const elUserNameDisplay = document.querySelector('.user-name-display')
    const elSecretContentSection = document.querySelector('.secret-content-section')

    elUserNameDisplay.innerHTML = `Username: ${getUserName()}`
    elSecretContentSection.style.display = 'block'
}

function onDoLogOut() {
    onInit()
    clearStorage()

    const elUserNameDisplay = document.querySelector('.user-name-display')
    elUserNameDisplay.style.display = 'none'
}

function onAdmin() {
    window.location.href = 'admin.html'
}

function renderAdminBtn() {
    const elAdminBtn = document.querySelector('.admin')
    elAdminBtn.classList.remove('hidden')
}

function onRenderUsersTable() {
    const elTable = document.querySelector('.users-table')

    elTable.innerHTML = renderUsersTable()
}
