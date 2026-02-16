import nodemailer from "nodemailer";

const HelpSupportUserQueryReply_Email = async (toEmail, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Support reply email sent");
  } catch (error) {
    console.error("Error sending support email", error);
    throw error;
  }
};

export default HelpSupportUserQueryReply_Email;
