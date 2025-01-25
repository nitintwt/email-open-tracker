import { Router } from "express";
import { mailStatus, sendMail, trackMail } from "../controllers/mail.controller.js";


const mailRouter = Router()

mailRouter.route("/sendmail").post(sendMail)
mailRouter.route("/track").get(trackMail)
mailRouter.route("/mailStatus").get(mailStatus)


export default mailRouter