'use strict'

function onInit() {
    const elSecretContentSection = document.querySelector('.secret-content-section')
    const elLoginSection = document.querySelector('.login-section')

    elSecretContentSection.style.display = 'none'
    elLoginSection.style.display = 'block'
}

function onDoLogin() {
    const elUserName = document.querySelector('.user-name')
    const elPassword = document.querySelector('.password')

    if (!elUserName.value || !elPassword.value) return

    const logIn = doLogin(elUserName.value, elPassword.value)

    elUserName.value = ''
    elPassword.value = ''

    if (!logIn) {
        alert('No user name or password found')
        return
    }

    renderSecretContent()
}

