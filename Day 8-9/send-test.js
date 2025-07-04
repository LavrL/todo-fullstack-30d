require('dotenv').config()
const nodemailer = require('nodemailer')

async function sendTestEmail() {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false, // use TLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    const info = await transporter.sendMail({
        from: '"SaaShelf Test" <noreply@saashelf.com>',
        to: 'zjc4tpl1te@jkotypc.com', // получатель
        subject: 'Test from SaaShelf SMTP',
        text: 'Hello! This is a test email sent via MailerSend SMTP from SaaShelf.',
    })

    console.log('✅ Message sent: %s', info.messageId)
}

sendTestEmail().catch(console.error)
