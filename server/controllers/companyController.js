const bcrypt = require('bcryptjs')

const register = async (req, res) => {

    const { company, owner, warehouse } = req.body
    const db = req.app.get('db')

    const password = // TODO generate random password
    const passwordSalt = bcrypt.genSaltSync(15)
    const passwordHash = bcrypt.hashSync(password, passwordSalt)

    try {
        const user = await db.register_user([owner.email, passwordHash, owner.first_name, owner.last_name, 'owner'])
        const company = await db.create_company([company.name, company.address, company.city, company.state, company.zip, user.user_id])
        const warehosue = await db.create_warehouse([company.company_id, warehouse.name, warehouse.address, warehouse.city, warehouse.state, warehouse.zip])
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Error creating company')
    }
j
    const response = {
        user,
        company,
        warehouse
    }

    res.status(200).send(response)
}

module.exports = {
    register
}