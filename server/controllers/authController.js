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
    console.log('hit login')
    const { email, password } = req.body; 
    const db = req.app.get('db'); 
    const foundUser = await db.get_user([email]); 

    if(!foundUser[0]) {
        return res.status(403).send('Invalid credentials, please try again.')
    }

    const authedPassword = bcrypt.compareSync(password, foundUser[0].password); 

    if(authedPassword) {
        delete foundUser[0].password; 
        req.session.user_id = foundUser[0].user_id;
        req.session.role = foundUser[0].role; 
        req.session.email = foundUser[0].email; 

        const accountInfo = {
            user_id: foundUser[0].user_id,
            role: foundUser[0].role, 
            email: foundUser[0].email,
            first_name: foundUser[0].first_name,
            last_name: foundUser[0].last_name
        };

        res.status(200).send(accountInfo); 
    } 
    
    else {
        res.status(401).send('Invalid credentials, please try again.'); 
    }
};

const logout = async (req, res) => {
    console.log('hit logout')
    req.session.destory(); 
    res.status(200).send('User logged out');
};

const deleteUser = async(req, res) => {
    const user_id = +req.params.user_id; 
    const { email } = req.session; 
    const db = req.app.get('db'); 
    const foundUser = await db.find_user([email]);
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
    const foundUser = await db.find_user([email]);
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

module.exports = {
    register, 
    login,
    logout, 
    deleteUser, 
    updateUser
};