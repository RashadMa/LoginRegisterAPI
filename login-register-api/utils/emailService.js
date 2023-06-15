// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         type:'login',
//         user: "c8657545@gmail.com",
//         pass: "bcozssymjajpqicg",
//     },
// });

// function confirmCodeEmail(userEMail, confirmCode){
//     transporter.sendMail({
//         from: 'c8657545@gmail.com',
//         to: userEMail,
//         subject: "Confirm Code",
//         text: "Code: " + confirmCode,
//     });
// }

// module.exports = {
//     confirmCodeEmail
// }
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "login",
    user: "c8657545@gmail.com",
    pass: "bcozssymjajpqicg",
  },
});

function confirmCodeEmail(userEmail, confirmCode) {
  const emailText = `
    <html>
      <body style="background-color: #fff4f2; text-align: center; font-family: Arial, sans-serif;">
        <h1 style="color: #ff6f61; font-size: 32px;">Welcome to FunApp!</h1>
        <p style="font-size: 18px;">Thank you for joining the fun!</p>
        <p style="font-size: 24px; color: #ff6f61; font-weight: bold;">Your secret code to unlock endless fun is:</p>
        <h2 style="font-size: 48px; color: #ff6f61; margin: 20px 0;">${confirmCode}</h2>
        <p style="font-size: 16px; color: #999;">Please keep it safe and don't share it with anyone!</p>
        <img src="https://avatars.githubusercontent.com/u/3276376?v=4" alt="Funny GIF" style="width: 300px; margin-top: 40px;">
      </body>
    </html>
  `;

  transporter.sendMail({
    from: "c8657545@gmail.com",
    to: userEmail,
    subject: "Welcome to FunApp - Confirm Code",
    html: emailText,
  });
}

module.exports = {
  confirmCodeEmail,
};
