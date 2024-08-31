import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; 
import { User } from "../../models/Users/userModel";
import { generateToken } from "../../utils/token/generateToken";
import { sendVerificationEmail } from "../../services/mail/emailService";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser.id.toString()); 
    await sendVerificationEmail(email, token);

    res
      .status(201)
      .json({ message: "Usuario registrado. Verifica tu correo electrónico" });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro de usuario" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const token = generateToken(user.id.toString()); 
  } catch (error) {
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "Token inválido" });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: "Correo electrónico verificado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en la verificación del correo electrónico" });
  }
};
