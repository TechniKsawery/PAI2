import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Nieprawidłowy format email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: { 
    type: String, 
    required: true, 
    minLength: 2, 
    maxLength: 50 
  },
  lastName: { 
    type: String, 
    required: true, 
    minLength: 2, 
    maxLength: 50 
  },
  createdAt: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    required: true, 
    default: Date.now 
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUser>("User", userSchema); 