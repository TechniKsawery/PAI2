import Item from '../models/itemModel';


export const getItems = async (req: any, res: any) => {
  try {
    const items = await Item.find().sort({ id: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania przedmiotów' });
  }
};


export const getItem = async (req: any, res: any) => {
  try {
    const item = await Item.findOne({ id: parseInt(req.params.id) });
    if (!item) {
      return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas pobierania przedmiotu' });
  }
};


export const createItem = async (req: any, res: any) => {
  try {
    const lastItem = await Item.findOne().sort({ id: -1 });
    const nextId = lastItem ? lastItem.id + 1 : 1;

    const item = new Item({
      id: nextId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas tworzenia przedmiotu' });
  }
};


export const updateItem = async (req: any, res: any) => {
  try {
    const item = await Item.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas aktualizacji przedmiotu' });
  }
};


export const deleteItem = async (req: any, res: any) => {
  try {
    const item = await Item.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!item) {
      return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
    }
    res.json({ message: 'Przedmiot usunięty' });
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas usuwania przedmiotu' });
  }
};