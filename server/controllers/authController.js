const bcrypt = require('bcryptjs'); 

const register = async (req, res) => {
    const { email, password, role, first_name, last_name } = req.body;
    const db = req.app.get('db');
    const foundUser = await db.get_user([email]); 

    if(foundUser[0]) {
        return res.status(409).send(`${email} is already taken. Please choose a different email.`);
    }

    // Salt and Hashing Password
    const passwordSalt = bcrypt.genSaltSync(15); 
    const passwordHash = bcrypt.hashSync(password, passwordSalt); 

    // Registering User 
    const newUser = await db.register_user([email, passwordHash, first_name, last_name, role]); 

    // Deleting Unhashed Password 
    delete newUser[0].password; 

    res.status(200).send('Account created'); 
};

const login = async (req, res) => {
    const { email, password } = req.body; 
    const db = req.app.get('db'); 
    const foundUser = await db.get_user([email]); 

    if(!foundUser[0]) {
        return res.status(403).send('Invalid credentials, please try again.')
    }

    const authedPassword = bcrypt.compareSync(password, foundUser[0].password); 

    if(authedPassword) {
        const user_id = foundUser[0].user_id
        const warehouses = await db.get_warehouse([user_id]) // Gets warehouse information based on the user_id
        const company = await db.get_company_info_by_warehouse([warehouses[0].company_id])

        delete foundUser[0].password; 
        req.session.user_id = foundUser[0].user_id;
        req.session.role = foundUser[0].role; 
        req.session.email = foundUser[0].email; 

        const accountInfo = {
            user_id: user_id,
            role: foundUser[0].role, 
            email: foundUser[0].email,
            first_name: foundUser[0].first_name,
            last_name: foundUser[0].last_name,
            warehouses: warehouses,
            compay: company
        };

        res.status(200).send(accountInfo); 
    } 
    
    else {
        res.status(401).send('Invalid credentials, please try again.'); 
    }
};

const logout = async (req, res) => {
    req.session.destroy(); 
    res.status(200).send('User logged out');
};

const deleteUser = async(req, res) => {
    const user_id = +req.params.user_id; 
    const { email } = req.session; 
    const db = req.app.get('db'); 
    const foundUser = await db.get_user([email]);
    const role = foundUser[0].role; 

    if(role === 'manger' || role === 'owner' || role === 'admin') {
        db.delete_user([user_id])
            .then(() => {
                res.status(200).send('Account has been deleted'); 
            })
    }
    else {
        res.status(401).send('Invalid credentials')
    }
};

const updateUser = async(req, res) => {
    const user_id = +req.params.user_id; 
    const { newRole } = req.body; 
    const { email } = req.session; 
    const db = req.app.get('db'); 
    const foundUser = await db.get_user([email]);
    const role = foundUser[0].role; 

    if(role === 'manager' || role === 'owner' || role === 'admin') {
        db.update_user([user_id, newRole])
            .then(() => {
                res.status(200).send('Account has been updated'); 
            })
    }
    else {
        res.status(401).send('Invalid credentials')
    }
}; 

const updatePassword = async(req, res) => {
    const { password, newPassword} = req.body; 
    const { email, user_id } = req.session; 
    const db = req.app.get('db'); 
    const foundUser = await db.get_user([email]); 
    const authedPassword = bcrypt.compareSync(password, foundUser[0].password); 

    if(authedPassword) {
        const passwordSalt = bcrypt.genSaltSync(15); 
        const newPasswordHash = bcrypt.hashSync(newPassword, passwordSalt); 

        db.update_password([user_id, newPasswordHash])
            .then(() => {
                res.status(200).send('Password has been updated'); 
            })
    }

    else {
        res.status(401).send('Invalid credentials, please try again'); 
    }
};

module.exports = {
    register, 
    login,
    logout, 
    deleteUser, 
    updateUser,
    updatePassword
};