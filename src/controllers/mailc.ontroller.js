import { Mail } from '../models/mail.model.js'
import sendMailUtil from '../utils/sendmail.js'
import { v4 as uuid} from "uuid";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sendMail = async (req , res)=>{
  const {emails , name } = req.body

  const trackingId = uuid()

  try {
    await Mail.create({trackingId})
    await sendMailUtil(emails ,trackingId )
    return res.status(200).json({message:"Mail sent successfully", trackingId:trackingId})
  } catch (error) {
    console.log("Something went wrong while sending mail " , error)
  }


}

const trackMail = async (req , res)=>{
  const {id} = req.query
  const userIp = req.headers['true-client-ip'] || req.headers['cf-connecting-ip'];

  try {
    const track = await Mail.findOne({trackingId:id})
    if(!track){
      res.send(404).json({message:"No tracking found"})
    }
    if(!track.userIPs.includes(userIp)){
      track.userIPs.push(userIp)
      track.opens++
      await track.save()
    }
    const image = path.join(__dirname,"..", 'images', 'timeslotLogo5.png');

    return res.sendFile(image, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.log("Something went wrong while tracking mail" , error)
  }
}

const mailStatus = async (req , res)=>{
  const {trackingId} = req.query
  try {
    const track = await Mail.findOne({trackingId:trackingId})
    return res.status(200).json({data:track})
  } catch (error) {
    console.log("something went wrong while tracking mail" , error)
  }
}

export {sendMail , trackMail , mailStatus}