import {Response } from "express";
import { deleteContact, findContact, findAllContact } from "../../services/contact.service"
import { Request } from "../../types/request";

export const getAllContactController = async (req:Request, res:Response) => {
  try {
    const contacts = await findAllContact();

    if (!contacts) {
      return res.status(404).json({
        success: false,
        message: "no contacts are found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "contact Details",
      data: contacts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const deleteContactController = async (req:Request, res:Response) => {
  try {
    const {cId} = req.params;
    if (!cId) {
      return res.status(400).json({
        success: false,
        message: "enter author detail",
      });
    }

    const deletedContact = await deleteContact(cId);

    console.log(deletedContact);

    if (!deleteContact) {
      return res.status(404).json({
        success: false,
        message: "contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "contact deleted successfully",
      deletedContact,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};
