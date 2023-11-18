'use strict'

function makeId(length = 6) {
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        id += possible.charAt(getRandomInt(0, possible.length))
    }
    return id
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function timestampToTime(timestamp) {
	var date = new Date(timestamp)

	// Get date components
	var day = ('0' + date.getDate()).slice(-2)
	var month = ('0' + (date.getMonth() + 1)).slice(-2) // Months are zero-based
	var year = date.getFullYear()

	// Get time components
	var hours = ('0' + date.getHours()).slice(-2)
	var minutes = ('0' + date.getMinutes()).slice(-2)
	var seconds = ('0' + date.getSeconds()).slice(-2)

	// Concatenate the date and time components in the desired format
	var formattedDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`

	return formattedDateTime
}

function sortByText(list, prop) {
    return list.sort((txtA, txtB) => {
        var textA = txtA[prop].toLowerCase()
        var textB = txtB[prop].toLowerCase()

        return textA.localeCompare(textB)
    })
}

function sortByNumber(list, prop) {
    return list.sort((itemA, itemB) => {
        return -(itemA[prop] - itemB[prop])
    })
}