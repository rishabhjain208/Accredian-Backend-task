const prisma = require("../prismaClient/connection");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Define a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.useremail,
    pass: process.env.password,
  },
});

module.exports.sendEmail = async (req, res) => {
  const { email, name } = req.body;

  try {
    const sendRefer = await prisma.refer.create({
      data: {
        email: email,
        name: name,
      },
    });

    const to = sendRefer.email;
    const subject = "Welcome to the Referal Program";
    const html =
      `<h1>Hi ${sendRefer.name},</h1> ` +
      `<p>Thank you for joining the Referal Program. You have been successfully registered.</p>`;

    let info = await transporter.sendMail({
      from: "rishabhjain223344@gmail.com",
      to: to,
      subject: subject,
      html: html,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ e: "Failed to send or schedule email" });
  }
};
