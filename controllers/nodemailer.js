import nodemailer from 'nodemailer';

class Mail{
    constructor(from, to, subject, text, html){
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }
}

const sendMail = (mail) => {
    if(mail instanceof Mail){
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account');
                console.error(err);
                return process.exit(1);
            }
    
            console.log('Credentials obtained, sending message...');
    
            // NB! Store the account object values somewhere if you want
            // to re-use the same account for future mail deliveries
    
            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport(
                {
                    host: process.env.MAIL_HOST,//'smtp.office365.com',
                    port: process.env.MAIL_PORT,//587,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,//'manweb_off@outlook.com',
                        pass: process.env.MAIL_PASS,//'#Mdw3mw87tB#',
                    },
                    logger: true,
                    transactionLog: true, // include SMTP traffic in the logs
                    allowInternalNetworkInterfaces: false
                },
                {
                    // default message fields
    
                    // sender info
                    from: mail.from,
                    // headers: {
                    //     'X-Laziness-level': 1000 // just an example header, no need to use this
                    // }
                }
            );
    
            // Message object
            let message = {
                // Comma separated list of recipients
                to: mail.to,
    
                // Subject of the message
                subject: mail.subject,
    
                // plaintext body
                text: mail.text,
    
                // HTML body
                html: mail.html,
            }
            transporter.sendMail(message, (error, info) => {
                console.log({error: error, info: info})
            })
        });
    }else throw Error('sendMail doit prendre mai: instance of Mail');
}
export {sendMail, Mail};