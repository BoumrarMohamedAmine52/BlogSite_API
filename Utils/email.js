const nodemailer = require("nodemailer");

const sendEmail = async (emailOptions) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
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
