import { createTransport } from "nodemailer";
import dotenv from 'dotenv'

dotenv.config({
  path:'./.env'
})

const transport = createTransport({
  host:"smtp.gmail.com",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
})

const sendMailUtil = async(emails , trackingId)=>{
  const trackingURL = `${process.env.BASE_URL}/api/v1/mail/track?id=${trackingId}`
  const mailOptions={
    from:process.env.EMAIL_USER,
    to:emails,
    subject:"Tracking dead pixel",
    html:`
    <h1>Tracking id: ${trackingId}</h1>
    <img src="${trackingURL} alt="dead-pixel" style="display:none"/>
    `
  }

  try {
    await transport.sendMail(mailOptions)
  } catch (error) {
    console.log("Something went wrong while sending mail" , error)
  }

}

export default sendMailUtil