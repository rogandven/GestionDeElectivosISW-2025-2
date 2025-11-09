import nodemailer from "nodemailer";
import { EMAIL, EMAIL_PROVIDER, EMAIL_PASSWORD } from "../config/configEnv.js";

export const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: EMAIL,
        to: to,
        subject: subject,
        text: text
    };

    const transporter = nodemailer.createTransport({
        service: EMAIL_PROVIDER,
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    });

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

export default sendMail;