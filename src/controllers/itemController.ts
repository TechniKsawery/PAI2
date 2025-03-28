import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import Item from '../models/itemModel';
import { AppError } from '../middleware/errorHandler';

export const createItem: RequestHandler = async (req, res, next) => {
  try {
    console.log('1. Otrzymane dane:', JSON.stringify(req.body, null, 2));
    
    const lastItem = await Item.findOne().sort({ id: -1 });
    console.log('2. Ostatni przedmiot:', lastItem ? JSON.stringify(lastItem, null, 2) : 'Brak');
    
    const nextId = lastItem && typeof lastItem.id === 'number' ? lastItem.id + 1 : 1;
    console.log('3. Następne ID:', nextId);
    
    const newItem = {
      ...req.body,
      id: nextId
    };
    console.log('4. Nowy przedmiot do utworzenia:', JSON.stringify(newItem, null, 2));
    
    try {
      const item = await Item.create(newItem);
      console.log('5. Utworzony przedmiot:', JSON.stringify(item, null, 2));
      
      res.status(201).json({
        status: 'success',
        data: item
      });
    } catch (createError) {
      console.error('6. Błąd podczas tworzenia w bazie:', createError);
      throw createError;
    }
  } catch (error) {
    console.error('7. Błąd główny:', error);
    next(new AppError('Błąd podczas tworzenia przedmiotu', 400));
  }
};

export const getItems: RequestHandler = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ id: 1 });
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: items
    });
  } catch (error) {
    next(new AppError('Błąd podczas pobierania przedmiotów', 500));
  }
};

export const getItem: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findOne({ id: parseInt(req.params.id) });
    if (!item) {
      return next(new AppError('Przedmiot nie został znaleziony', 404));
    }
    res.status(200).json({
      status: 'success',
      data: item
    });
  } catch (error) {
    next(new AppError('Błąd podczas pobierania przedmiotu', 500));
  }
};

export const updateItem: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return next(new AppError('Przedmiot nie został znaleziony', 404));
    }
    res.status(200).json({
      status: 'success',
      data: item
    });
  } catch (error) {
    next(new AppError('Błąd podczas aktualizacji przedmiotu', 400));
  }
};

export const deleteItem: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!item) {
      return next(new AppError('Przedmiot nie został znaleziony', 404));
    }
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(new AppError('Błąd podczas usuwania przedmiotu', 500));
  }
};