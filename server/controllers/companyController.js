const bcrypt = require('bcryptjs')

const register = async (req, res) => {

    const { company, owner, warehouse } = req.body
    const db = req.app.get('db')

    console.log(warehouse)
    console.log(warehouse.branch_name, warehouse.address, warehouse.city, warehouse.state, warehouse.zip)

    const password = Math.random().toString(36).slice(-10)
    console.log(password)
    const passwordSalt = bcrypt.genSaltSync(15)
    const passwordHash = bcrypt.hashSync(password, passwordSalt)
    let user, comp, ware

    try {
        user = await db.register_user([owner.email, passwordHash, owner.first_name, owner.last_name, 'owner'])
        comp = await db.create_company([company.name, company.address, company.city, company.state, company.zip, user[0].user_id])
    console.log('company response', comp)
    console.log('warehouse data', comp[0].company_id, warehouse.branch_name, warehouse.address, warehouse.city, warehouse.state, warehouse.zip)
        ware = await db.create_warehouse([comp[0].company_id, warehouse.branch_name, warehouse.address, warehouse.city, warehouse.state, warehouse.zip])
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Error creating company')
    }

    const response = {
        user,
        company: comp,
        warehouse: ware
    }

    res.status(200).send(response)
}

module.exports = {
    register
}