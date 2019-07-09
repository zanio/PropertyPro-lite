import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


class Mail{
	constructor(option, content){
		this.subject = option.Subject;
		this.recipient = option.Recipient;
		this.content = content;
	}

	async main(){

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: process.env.layer,
			auth: {
				user: process.env.email,
				pass: process.env.password
			}
		});

		const {subject,recipient,content} = this;

		let mailOptions = {
			from: '"PropertyPro-Lite" <'+process.env.email+'>', 
			to: recipient,
			subject: subject, 
			html: content
		};
        
		try{
			const info = await transporter.sendMail(mailOptions);
			console.log(info);
		} 
		catch(error){
			console.log(error);
		}
      
        
	}
    
}



export {Mail};