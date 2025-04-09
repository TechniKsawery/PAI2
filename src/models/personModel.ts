import mongoose, { Schema, Document } from 'mongoose';

export interface IPerson extends Document {
  id: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const personSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Imię jest wymagane'],
    trim: true
  },
  surname: {
    type: String,
    required: [true, 'Nazwisko jest wymagane'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Wiek jest wymagany'],
    min: [0, 'Wiek nie może być ujemny']
  },
  email: {
    type: String,
    required: [true, 'Email jest wymagany'],
    unique: true,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true
});

personSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret.id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model<IPerson>('Person', personSchema); 