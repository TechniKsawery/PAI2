import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nazwa jest wymagana'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Opis jest wymagany'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Cena jest wymagana'],
    min: [0, 'Cena nie może być ujemna']
  }
}, {
  timestamps: true
});

export default mongoose.model<IItem>('Item', itemSchema); 