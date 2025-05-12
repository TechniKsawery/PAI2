import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../person/models/person.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Użytkownik z tym emailem już istnieje' });
      return;
    }

    const user = new UserModel({
      email,
      password,
      firstName,
      lastName
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'Użytkownik został zarejestrowany',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Zalogowano pomyślnie',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await UserModel.findById(req.user?.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Użytkownik nie znaleziony' });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await UserModel.findById(req.user?.userId);

    if (!user) {
      res.status(404).json({ message: 'Użytkownik nie znaleziony' });
      return;
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();

    res.json({
      message: 'Dane użytkownika zaktualizowane',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await UserModel.findByIdAndDelete(req.user?.userId);
    if (!user) {
      res.status(404).json({ message: 'Użytkownik nie znaleziony' });
      return;
    }
    res.json({ message: 'Użytkownik został usunięty' });
  } catch (error) {
    next(error);
  }
}; 