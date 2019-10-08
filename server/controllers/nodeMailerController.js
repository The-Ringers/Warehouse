const nodemailer = require('nodemailer')

const mail = (req, res) => {
    console.log ('mail')
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: 'inventario1019@gmail.com',
            pass: 'devmtngrpproj1019'
        }
    })
    const mailOptions = {
        from: 'inventario1019@gmail.com',
        to: 'inventario1019@gmail.com', 
        subject: req.body.email,
        text:  `${req.body.name}
        ${req.body.message}`
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            res.status(200).send({msg:'success'})
            console.log('email sent:' + info.response)
        }
    })
}
module.exports = {
    mail
}