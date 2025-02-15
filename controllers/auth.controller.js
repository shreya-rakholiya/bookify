const Joi = require("joi");
const { createUser, findUser } = require("../services/register.service");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const mailer=require("../middleware/mailer");
const sendMail = require("../middleware/mailer");

const registerValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .pattern(/^\S*$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 30 characters.",
      "string.pattern.base":
        "Password must include one uppercase, one lowercase, one number, and one special character.",
      "string.pattern": "Password cannot contain spaces.",
    }),
  role: Joi.string(),
  phone: Joi.number(),
  address: Joi.string().optional(),
});

const loginValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .pattern(/^\S*$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 30 characters.",
      "string.pattern.base":
        "Password must include one uppercase, one lowercase, one number, and one special character.",
      "string.pattern": "Password cannot contain spaces.",
    })
    .required(),
});

module.exports = registerValidate;

const registerController = async (req, res) => {
  try {
    const payload = await registerValidate
      .validateAsync(req.body)
      .then((val) => {
        console.log(val);
        return val;
      })
      .catch((e) => {
        res.status(404).json({ msg: "no value", error: e.message });
      });

    const encryptedPassword = crypto.AES.encrypt(
      payload.password,
      process.env.AES_SECRET
    ).toString();
    // console.log(encryptedPassword);
    payload.password = encryptedPassword;

    const user = await createUser(payload);
    //sending mail
    const msg =
      "<p> Hii " + user.name + ",<p>You are registered successfully </p>";
    
      mailer,sendMail(user.email, "Registration mail", msg);
    res.status(201).json({ msg: "registration succesfull" });
  } catch (err) {
    return res.status(500).json({
      message:
        "Unable to register user due to server error.Please try again later.",
      error: err.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const payload = await loginValidate
      .validateAsync(req.body)
      .then((val) => {
        console.log(val);
        return val;
      })
      .catch((e) => {
        res.status(404).json({ message: "no value", error: e.message });
      });

    const userData = await findUser({ email: payload.email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(userData, "userdata");

    // console.log(process.env.AES_SECRET);

    const originalPassword = crypto.AES.decrypt(
      userData.password,
      process.env.AES_SECRET
    ).toString(crypto.enc.Utf8);

    // console.log(originalPassword);

    if (originalPassword !== payload.password) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .setHeader("x-auth-token", token)
      .json({ message: "login successfully",user:userData});
  } catch (e) {
    return res.status(500).json({
      message: "Something happened wrong try again after sometime.",
      error: err.message,
    });
  }
};

module.exports = { registerController, loginController };
