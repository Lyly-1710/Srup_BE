import nodemailer from 'nodemailer';
import 'dotenv/config';

class mailService
{
    
    async sendMail(emailTo, emailSubject, emailText)
    {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
        });
        transporter.sendMail({
            from: process.env.SMTP_USER,
            to: emailTo,
            subject: emailSubject,
            text: emailText
        });
    }
}

export default new mailService();
