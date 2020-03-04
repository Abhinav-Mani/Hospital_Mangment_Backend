const nodemailer = require("nodemailer")
const dotenv = require("dotenv")

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
})

const footer = `Thank you for using our service!`

exports.send= (email,key) => {
    const text =
    `Thank you for signing up!
    Your UID is ${key}
    ${footer}
    `

    const options = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: `Welcome to our service!`,
        text: text,
        //html: `<b>Hello world!</b>`
    }

    transporter.sendMail(options, (err, info) => {
        if (!err) {
            console.log(`Sent welcome email to ${email}`)
        } else {
            console.log(process.env.EMAIL_PASSWORD+"nodemailer failed"+process.env.EMAIL_ADDRESS, err)
        }
    })
}