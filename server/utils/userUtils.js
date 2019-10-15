const bcrypt = require('bcryptjs')

function generatePassword() {
    const password = Math.random().toString(36).slice(-10)
    const passwordSalt = bcrypt.genSaltSync(15)
    const passwordHash = bcrypt.hashSync(password, passwordSalt)

    console.log(password, passwordHash, passwordSalt)
    return {
        password,
        passwordHash
    }
}

module.exports = {
    generatePassword
}