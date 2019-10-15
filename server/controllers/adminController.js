const utils = require('../utils/userUtils')

const addEmployee = async (req, res) => {

    const db = req.app.get('db')
    const { email, first_name, last_name, role, warehouse_id } = req.body
    const { password, passwordHash } = utils.generatePassword()
    console.log(password)

    const foundUser = await db.get_user([email])

    if(foundUser[0]) {
        return res.status(409).send(`${email} is already taken. Please choose a different email.`)
    }

    const newUser = await db.register_user([email, passwordHash, first_name, last_name, role])
    delete newUser[0].password

    await db.add_user_to_warehouse([warehouse_id, newUser[0].user_id])

    res.status(200).send('User created successfully')
}

const getEmployees = async (req, res) => {
    console.log('hit get employees')

    const db = req.app.get('db')
    const { warehouse_id } = req.params

    const employees = await db.get_employees([warehouse_id])

    res.status(200).send(employees)
}

const editEmployee = async (req, res) => {
    console.log('hit edit employee')

    const db = req.app.get('db')
    const { first_name, last_name, role, email } = req.body
    const { id } = req.params

    await db.edit_user([first_name, last_name, role, email, id])
    res.status(200).send()
}

const deleteEmployee = async (req, res) => {
    console.log('hit delete employee')

    const db = req.app.get('db')
    const { id } = req.params

    await db.delete_user([id])
    res.status(200).send()
}

module.exports = {
    addEmployee,
    getEmployees,
    editEmployee,
    deleteEmployee
}