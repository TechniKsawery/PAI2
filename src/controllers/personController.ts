import { RequestHandler } from 'express';
import Person from '../models/personModel';
import { AppError } from '../middleware/errorHandler';

export const createPerson: RequestHandler = async (req, res, next) => {
  try {
    const lastPerson = await Person.findOne().sort({ id: -1 });
    const nextId = lastPerson && typeof lastPerson.id === 'number' ? lastPerson.id + 1 : 1;
    
    const newPerson = {
      ...req.body,
      id: nextId
    };

    const person = await Person.create(newPerson);
    res.status(201).json({
      status: 'success',
      data: person
    });
  } catch (error) {
    next(new AppError('Błąd podczas tworzenia osoby', 400));
  }
};

export const getPersons: RequestHandler = async (req, res, next) => {
  try {
    const persons = await Person.find().sort({ id: 1 });
    res.status(200).json({
      status: 'success',
      results: persons.length,
      data: persons
    });
  } catch (error) {
    next(new AppError('Błąd podczas pobierania osób', 400));
  }
};

export const getPerson: RequestHandler = async (req, res, next) => {
  try {
    const person = await Person.findOne({ id: req.params.id });
    if (!person) {
      return next(new AppError('Nie znaleziono osoby', 404));
    }
    res.status(200).json({
      status: 'success',
      data: person
    });
  } catch (error) {
    next(new AppError('Błąd podczas pobierania osoby', 400));
  }
};

export const updatePerson: RequestHandler = async (req, res, next) => {
  try {
    const person = await Person.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!person) {
      return next(new AppError('Nie znaleziono osoby', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: person
    });
  } catch (error) {
    next(new AppError('Błąd podczas aktualizacji osoby', 400));
  }
};

export const deletePerson: RequestHandler = async (req, res, next) => {
  try {
    const person = await Person.findOneAndDelete({ id: req.params.id });
    if (!person) {
      return next(new AppError('Nie znaleziono osoby', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(new AppError('Błąd podczas usuwania osoby', 400));
  }
}; 