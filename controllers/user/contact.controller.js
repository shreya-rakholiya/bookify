const joi = require("joi");
const { createContact } = require("../../services/contact.service");

const contactValidate = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.number().optional(),
  subject: joi.string().optional(),
  message: joi.string().required(),
});

const createContactController = async (req, res) => {
  try {
    const payload = await contactValidate.validateAsync(req.body);

    if(!payload){
        return res.status(400).json({
            success:false,
            message:"please enter contact information"
        })
    }

    const contact = await createContact(payload);
    return res.status(201).json({
      success: true,
      msg: "Successfull",
      contact,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports={createContactController}
