import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
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
  timestamps: true,
  toJSON: { virtuals: false },
  toObject: { virtuals: false }
});

// Ustaw nasze własne ID jako główny identyfikator
itemSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret.id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model<IItem>('Item', itemSchema); 