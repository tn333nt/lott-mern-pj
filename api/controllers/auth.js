const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') // to create new jwt conveniently
const nodemailer = require('nodemailer') // help sending mail from inside njs
const sendgridTransport = require('nodemailer-sendgrid-transport') // deliver email through 3rd party service

const User = require('../models/user')

// const transporter = nodemailer.createTransport(
//     sendgridTransport({
//         auth: {
//             api_key:
//                 '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'
//         }
//     })
// );

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thaonpfx15559@funix.edu.vn',
        pass: 'xffzpzwbufgadjnj',
    },
    // tls: {
    //     // do not failed on invalid certs
    //     rejectUnauthorized: false
    // }
});





exports.signup = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error('validation failed')
        err.statusCode = 422
        throw err
    }

    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    try {
        const isMatched = password === confirmPassword
        if (!isMatched) {
            const err = new Error('passwords did not match')
            err.statusCode = 422
            throw err
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPassword
        })
        await user.save()

        res.status(201).json({ user: user })

    } catch (err) {
        next(err)
    }

}


exports.login = async (req, res, next) => {

    const email = req.body.email
    const password = req.body.password

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const err = new Error('no found user with this email')
            err.statusCode = 401 // not authenticated
            throw err
        }

        const isMatched = await bcrypt.compare(password, user.password)
        // const isMatched = password == 123123
        if (!isMatched) {
            const err = new Error('wrong password')
            err.statusCode = 401
            throw err
        }

        const token = jwt.sign( // sign new jwt from the payload
            { user: user },
            'privatekey',
            { expiresIn: '1h' } // invalid token after 1h
        )

        res.status(200).json({ token: token, user: user })

    } catch (err) {
        next(err)
    }

}

exports.resetPassword = async (req, res, next) => {

    const email = req.body.email

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const err = new Error('no found user')
            err.statusCode = 401
            throw err
        }
        console.log(user, 'user')

        // create a random password
        const newPassword = Math.floor(Math.random() * 900000000).toString()
        console.log(newPassword, 'password')
        // ko thay no bao bcrypt vs NUMBER ha lol @@

        // send mail with new pw

        // const sent = transporter.sendMail({
        //     to: email,
        //     from: '123@gmail.com',
        //     subject: 'your new password',
        //     content: newPassword
        // });
        // console.log(sent, 'transporter');


        const mailOptions = {
            from: '123@gmail', // wtf cuoi cung thi no cung lay ten mail o tren
            to: email,
            subject: 'new password',
            text: newPassword,
        }

        console.log(mailOptions, 'mailOptions');

        transporter.sendMail(mailOptions, (err, success) => {
            if (err) {
                next(err);
            } else { console.log(success, 'success'); }
        })



        // // https://nodemailer.com/about/#example
        // // Generate test SMTP service account from ethereal.email
        // // Only needed if you don't have a real mail account for testing
        // const testAccount = await nodemailer.createTestAccount();

        // // create reusable transporter object using the default SMTP transport
        // const transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: 'katheryn.wolf@ethereal.email', // generated ethereal user
        //         pass: 'E9u3VMDHZJMnmCXUxz', // generated ethereal password
        //     },
        // });

        // console.log(transporter, 'transporter')

        // // send mail with defined transport object
        // const info = transporter.sendMail({
        //     from: 'katheryn.wolf@ethereal.email', // sender address
        //     to: 'email', // list of receivers
        //     subject: "resetPassword", // Subject line
        //     text: 'your new password : ' + newPassword, // plain text body
        // });

        // console.log(info, 'info')

        // console.log("Message sent: %s", info.messageId);
        // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...




        // save hashedpw to db
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedPassword
        await user.save()

        res.status(200).json({ user: user })

    } catch (err) {
        next(err)
    }
}