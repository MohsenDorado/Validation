import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';



export const sendEmail= async({email,emailType,userId}:any) =>{
    try {
     const hashedToken= await   bcryptjs.hash(userId.toString(),10)
      if (emailType==="VERIFY") {
        await User.findByIdAndUpdate(userId,
            {verifyToken:hashedToken , verifyTokenExpiry:Date.now()+3600000})
            
        
      }
      else if(emailType==="VERIFY")  {
        await User.findByIdAndUpdate(userId,
            {forgotPasswordToken:hashedToken , forgotPasswordTokenExpiry:Date.now()+3600000})
           

        }
        const transporter= nodemailer.createTransport({
          
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "ce0bd74bd82e65",
                  pass: "82695b23f58789"
                }
          
        })
        const mailOptions={
            from:'mohsen@gmail.com',
            to:email,
            subject:emailType==="VERIFY" ? "Verify email" :"Reset password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`

        }
        const mailResponse= await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        throw new Error(error.messsage);
    }
    
}