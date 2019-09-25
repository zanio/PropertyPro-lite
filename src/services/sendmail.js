/* eslint-disable import/prefer-default-export, no-console */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


class Mail {
	constructor(emailDetails, html) {
		this.subject = emailDetails.Subject;
		this.recipient = emailDetails.Recipient;
		this.content = html;
		this.Recipients = this.formatRecipients();
	}

	// When sending to multiple users;
	formatRecipients() {
		const array = this.recipient.split(',');
		array.map(el => el.trim());
		return array;
	}


	async main() {
		const { subject, recipient, html } = this;
		// create reusable transporter object using the default SMTP transport
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
		const transporter = nodemailer.createTransport({
			service: process.env.layer,
			auth: {
				user: process.env.email,
				pass: process.env.password,
			},
		});


		const mailOptions = {
			from: `"PropertyPro-Lite" <${process.env.email}>`,
			to: recipient,
			subject,
			html,
		};

		try {
			await transporter.sendMail(mailOptions);
		} catch (error) {
			console.log(error.message);
		}
	}
}


export { Mail };
