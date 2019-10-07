const bcrypt = require('bcryptjs'); 

const register = async (req, res) => {
    console.log('hit register')
    const { email, password, role } = req.body;
    const db = req.app.get('db');
    const founderUser = await db.get_user([email]); 

    if(founderUser[0]) {
        return res.status(409).send(`${email} is already taken. Please choose a different email.`);
    }

    // Salt and Hashing Password
    const passwordSalt = bcrypt.getSaltSync(15); 
    const passwordHash = bcrypt.hashSync(password, passwordSalt); 

    // Registering User 
    const newUser = await db.register_user([email, passwordHash, role]); 

    // Deleting Unhashed Password 
    delete newUser[0].password; 

    // Setting Values to Session
    req.session.user_id = founderUser[0].user_id;
    req.session.role = role; 

    const accountInfo = {
        user_id: founderUser[0].user_id,
        role: founderUser[0].role
    };

    res.status(200).send(accountInfo); 
};

const login = async (req, res) => {
    console.log('hit login')
    const { email, password } = req.body; 
    const db = req.app.get('db'); 
    const founderUser = await db.get_user([email]); 

    if(!founderUser[0]) {
        return res.status(403).send('Invalid credentials, please try again.')
    }

    const authedPassword = bcrypt.compareSync(password, founderUser[0].password); 

    if(authedPassword) {
        delete founderUser[0].password; 
        req.session.user_id = founderUser[0].user_id;
        req.session.role = founderUser[0].role; 

        const accountInfo = {
            user_id: founderUser[0].user_id,
            role: founderUser[0].role
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
}

module.exports = {
    register, 
    login,
    logout
};