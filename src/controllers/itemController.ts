import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import Item from '../models/itemModel';
import { AppError } from '../middleware/errorHandler';

// @desc    Utwórz nowy przedmiot
// @route   POST /api/items
// @access  Public
export const createItem: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({
      status: 'success',
      data: item
    });
  } catch (error) {
    next(new AppError('Błąd podczas tworzenia przedmiotu', 400));
  }
};

// @desc    Pobierz wszystkie przedmioty
// @route   GET /api/items
// @access  Public
export const getItems: RequestHandler = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: items
    });
  } catch (error) {
    next(new AppError('Błąd podczas pobierania przedmiotów', 500));
  }
};

// @desc    Pobierz pojedynczy przedmiot
// @route   GET /api/items/:id
// @access  Public
export const getItem: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
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

// @desc    Aktualizuj przedmiot
// @route   PUT /api/items/:id
// @access  Public
export const updateItem: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
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

// @desc    Usuń przedmiot
// @route   DELETE /api/items/:id
// @access  Public
export const deleteItem: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
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