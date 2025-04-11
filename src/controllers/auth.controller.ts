import Joi from "joi";
import { createUser, findUser, updateUser } from "../services/user.service";
import CryptoJS from "crypto-js";
const { AES, enc } = CryptoJS;
import Jwt from "jsonwebtoken";
import { mailsender } from "../middleware/mailer";
import { Response } from "express";
import { Request } from "../types/request";
import { addMedia } from "../services/media.service";
import { error, profile } from "console";
import { userModel } from "../models/user";
import randomstring from "randomstring";
import {
  createPasswordReset,
  deletePreviousPasswordReset,
  findPasswordResetByToken,
} from "../services/passwordReset.service";
import { passwordResetModel } from "../models/passwordReset";

export const registerValidate = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
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
  gender: Joi.string(),
  phone: Joi.number(),
  address: Joi.string().optional(),
  profile: Joi.string().optional(),
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

export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const file = req.body.files;
    console.log(file[0].path, "fileeee");

    if (!file || !file[0].path) {
      return res
        .status(400)
        .json({ error: "No file uploaded or invalid file" });
    }
    const bookImage = await addMedia({
      title: "",
      url: file[0].path,
      type: "user",
    });
    console.log(bookImage);

    return res.status(201).json({
      success: true,
      message: "Profile Image uploaded successfully",
      data: bookImage,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const payload = await registerValidate.validateAsync(req.body);

    const encryptedPassword = AES.encrypt(
      payload.password,
      process.env.AES_SECRET || "secret"
    ).toString();
    // console.log(encryptedPassword);
    payload.password = encryptedPassword;

    const user = await createUser(payload);
    //sending mail
    const msg =
      "<p> Hii " + user.firstName + ",<p>You are registered successfully </p>";

    mailsender(user.email, "Registration mail", msg);
    res.status(201).json({ msg: "registration succesfull" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message:
        "Unable to register user due to server error.Please try again later.",
      error: (err as Error).message,
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const payload = await loginValidate.validateAsync(req.body);

    const userData = await findUser({ email: payload.email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(userData, "userdata");

    // console.log(process.env.AES_SECRET);

    const originalPassword = AES.decrypt(
      userData.password,
      process.env.AES_SECRET || "secret"
    ).toString(enc.Utf8);

    // console.log(originalPassword);

    if (originalPassword !== payload.password) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = Jwt.sign(
      { id: userData._id },
      process.env.AES_SECRET || "secret"
    );

    return res
      .status(200)
      .setHeader("x-auth-token", token)
      .json({ message: "login successfully", user: userData });
  } catch (err) {
    return res.status(500).json({
      message: "Something happened wrong try again after sometime.",
      error: (err as Error).message,
    });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    // const authUSer = req.authUser;
    const { email } = req.body;
    const { formPath } = req.body;
    const userData = await findUser({ email });
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const randomString = randomstring.generate();
    console.log(randomString);
    // @ts-ignore
    await deletePreviousPasswordReset(userData._id);
    const passwordReset = await createPasswordReset({
      user: userData._id,
      token: randomString,
    });
    const msg =
      "<p>Hii " +
      userData.firstName +
      `, Please click <a href="${formPath}?token=${randomString}` +
      '">here</a>  to reset your password </p>';
    mailsender(userData.email, "Registration mail", msg);
    return res.status(201).json({
      success: true,
      msg: "Reset password link send to your mail , please check!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something happened wrong while forgatting password",
      error: (err as Error).message,
    });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const token = req.query.token;
    // @ts-ignore
    const passwordreset = await findPasswordResetByToken(token);
    if (!passwordreset) {
      return res.status(400).json({
        success: false,
        message: "ResetToken not valid or expired",
      });
    }
    // const authUser = req.authUser;
    const id = passwordreset.user;
    const user = await findUser({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { password } = req.body;

    const encryptedPassword = AES.encrypt(
      password,
      process.env.AES_SECRET || "secret"
    ).toString();
    const changePasword = await updateUser(
      { _id: user._id },
      { password: encryptedPassword }
    );
    // @ts-ignore
    const passwordReset = await deletePreviousPasswordReset(user._id);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something happened wrong while resetting password",
      error: (err as Error).message,
    });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    res.setHeader("x-auth-token", "");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something happened wrong while logging out",
    });
  }
};
