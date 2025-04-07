import mongoose from 'mongoose';

// Interfejs przedmiotu
export interface IItem extends mongoose.Document {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schemat przedmiotu
const itemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }
}, {
  timestamps: true
});

// Usuwanie niepotrzebnych pól z JSON
itemSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret.id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Item = mongoose.model<IItem>('Item', itemSchema);
export default Item; 