const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendMail = async (emails, subject, message) => {
  // Configure nodemailer
  let config = {
    service: "gmail",
    auth: {
      user: "reservefor.now@gmail.com",
      pass: "uyel eomc oouz iaux",
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "ReserveNow",
      link: "https://mailgen.js/",
    },
  });

  // Define the email content
  let emailContent = {
    body: {
      intro: message,
      outro: "Thank you for doing business with us!",
    },
  };

  let emailBody = MailGenerator.generate(emailContent);

  // Iterate over each email in the array
  const sendMailPromises = emails.map((recipientEmail) => {
    let mailOptions = {
      from: "reservefor.now@gmail.com",
      to: recipientEmail,
      subject: subject,
      html: emailBody,
    };

    return transporter.sendMail(mailOptions);
  });

  // Send all emails concurrently and wait for completion
  return Promise.all(sendMailPromises);
};

exports.sendMailEvent = async (req, res) => {
  const { emails, subject, message } = req.body;

  if (!Array.isArray(emails) || emails.length === 0) {
    return res
      .status(400)
      .json({
        error:
          "Emails array is required and should contain at least one email address",
      });
  }

  try {
    await sendMail(emails, subject, message);
    res.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Failed to send emails:", error.message);
    res.status(500).json({ error: "Failed to send emails" });
  }
};
