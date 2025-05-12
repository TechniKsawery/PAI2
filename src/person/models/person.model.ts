import mongoose from "mongoose";

export interface IPerson extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const personSchema = new mongoose.Schema<IPerson>({
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
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Nieprawidłowy format email']
  },
  birthDate: { 
    type: Date 
  },
  phoneNumber: { 
    type: String,
    match: [/^\+?[0-9]{9,15}$/, 'Nieprawidłowy format numeru telefonu']
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

export const PersonModel = mongoose.model<IPerson>("Person", personSchema); 