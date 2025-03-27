import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'Nazwa jest wymagana').max(100, 'Nazwa jest za długa'),
  description: z.string().min(1, 'Opis jest wymagany').max(1000, 'Opis jest za długi'),
  price: z.number().min(0, 'Cena nie może być ujemna')
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>; 