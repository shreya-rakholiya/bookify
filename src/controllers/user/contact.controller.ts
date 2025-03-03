import { Response } from "express";
import Joi from "joi";
import { createContact } from "../../services/contact.service";
import { Request } from "../../types/request";



const contactValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().optional(),
  subject: Joi.string().optional(),
  message: Joi.string().required(),
  agreement: Joi.boolean()
});

export const createContactController = async (req:Request, res:Response):Promise<any>=> {
  try {
    const payload = await contactValidate.validateAsync(req.body);
    console.log(payload,"payload..");
    if(!payload){
         res.status(400).json({
            success:false,
            message:"please enter contact information"
        })
        return
    }

    const contact = await createContact(payload);
    return res.status(201).json({
      success: true,
      msg: "Successfull",
      contact,
    });
  } catch (err) {
    console.log(err,"jdwurifthui")
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};
