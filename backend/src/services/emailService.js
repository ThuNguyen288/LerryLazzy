import nodemailer from 'nodemailer';
import db from '../models/index';
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 10000, 
    socketTimeout: 10000 
});

const sendResetPasswordEmail = (email, username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const code = Math.floor(100000 + Math.random() * 900000).toString();

            await db.User.update({ 
                Code: code 
            }, { 
                where: { Username: username } 
            });

            console.log('Reset code:', code);

            const mailOptions = {
                from: 'Lerry Lazzy Handmade <lerrylazzyshop@gmail.com>',
                to: email,
                subject: 'Reset Password',
                text: `Your password reset code is: ${code}`,
                html: `
                    <p>Hi ${username},</p>
                    <p>Your password reset code is:</p>
                    <h3>${code}</h3>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Best regards,<br>Lerry Lazzy</p>
                `,
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully to: ', email);
            resolve({ 
                errCode: 0, 
                errMessage: 'Email sent successfully' });
        } catch (error) {
            console.log('Error sending reset password email:', error);
            reject(error)
        }
    });
};

module.exports =  { sendResetPasswordEmail };
