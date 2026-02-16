import nodemailer from "nodemailer"

const sendOrderConfirmation = async (toEmail) => {
  try {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Order Confirmation",
    text:"Your order has been placed successfully"
  }
  await transporter.sendMail(mailOptions);
  console.log("Order confirmation email sent")
  }
  catch(error) {
    console.error("Error sending email", error)
  }

}

export default sendOrderConfirmation;