const nodemailer = require("nodemailer");

const sendEmail = async (emailOptions) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      name: process.env.SMTP_USERNAME,
      password: process.env.SMTP_PASSWORD,
    },
  });

  await transport.sendMail({
    from: "<blog@gmail.com>",
    to: emailOptions.email,
    subject: emailOptions.subj,
    text: emailOptions.text,
  });
};

module.exports = sendEmail;
