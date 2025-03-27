import type { Request, Response } from "express";
import Item from "../models/Items";

// Pobierz wszystkie przedmioty
export const getItems = async (_req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// Pobierz przedmiot po ID
export const getItemById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params; // Typowanie req.params
  res.send(`Item ID: ${id}`);
};

// Dodaj nowy przedmiot
export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: "Niepoprawne dane" });
  }
};

// Aktualizuj przedmiot
export const updateItem = async (req: Request<{ params: { id: string } }>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Przedmiot nie znaleziony" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Błąd podczas aktualizacji" });
  }
};

// Usuń przedmiot
export const deleteItem = async (req: Request<{ params: { id: string } }>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Przedmiot nie znaleziony" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Błąd podczas usuwania" });
  }
};
