const utils = require('../utils/userUtils')

const addEmployee = async (req, res) => {
    console.log('hit add employee')

    const db = req.app.get('db')
    const { email, first_name, last_name, role, warehouse_id } = req.body
    const { password, passwordHash } = utils.generatePassword()

    if(foundUser[0]) {
        return res.status(409).send(`${email} is already taken. Please choose a different email.`);
    }

    const newUser = await db.register_user([email, passwordHash, first_name, last_name, role]); 
    delete newUser[0].password; 

    res.status(200).send('User created successfully')
}

const getEmployees = (req, res) => {
    console.log('hit get employees')
    res.status(200).send()
}

const editEmployee = (req, res) => {
    console.log('hit edit employee')
    res.status(200).send()
}

const deleteEmployee = (req, res) => {
    console.log('hit delete employee')
    res.status(200).send()
}

module.exports = {
    addEmployee,
    getEmployees,
    editEmployee,
    deleteEmployee
}