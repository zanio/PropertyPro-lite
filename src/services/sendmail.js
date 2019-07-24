import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


class Mail{
	constructor(option, content){
		this.subject = option.Subject;
		this.recipient = option.Recipient;
		this.content = content;
	}

	

	formatRecipients  (recipients){
		let array = recipients.split(',');
		array.map(el=>{
			el.trim();
		});
		return array;

	}

	async main(){
		const {subject,recipient,content} = this;
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: process.env.layer,
			auth: {
				user: process.env.email,
				pass: process.env.password
			}
		});

		

		let mailOptions = {
			from: '"PropertyPro-Lite" <'+process.env.email+'>', 
			to: recipient,
			subject: subject, 
			html: content
		};
        
		try{
			await transporter.sendMail(mailOptions);
		} 
		catch(error){
			console.log(error);
		}
      
        
	}
    
}



export {Mail};