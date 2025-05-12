import { RequestHandler, Request, Response, NextFunction } from 'express';
import { PersonModel } from '../person/models/person.model';
import { validatePerson, validatePersonMiddleware } from '../validation/personsValidation';
import { StatusCodes } from 'http-status-codes';
import express from 'express';

export const personsController = express.Router();

const getAllPersons: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const persons = await PersonModel.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: persons.length,
      data: persons
    });
  } catch (error) {
    next(error);
  }
};

const getPersonById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const person = await PersonModel.findById(req.params.id);
    if (!person) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Nie znaleziono osoby o podanym ID'
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: person
    });
  } catch (error) {
    next(error);
  }
};

const createPerson: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const person = new PersonModel(req.body);
    const savedPerson = await person.save();
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: savedPerson
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        status: 'error',
        message: 'Osoba z podanym emailem już istnieje'
      });
    } else {
      next(error);
    }
  }
};

const updatePerson: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const person = await PersonModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!person) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Nie znaleziono osoby o podanym ID'
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: person
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        status: 'error',
        message: 'Osoba z podanym emailem już istnieje'
      });
    } else {
      next(error);
    }
  }
};

const deletePerson: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const person = await PersonModel.findByIdAndDelete(req.params.id);
    if (!person) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Nie znaleziono osoby o podanym ID'
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Osoba została usunięta'
    });
  } catch (error) {
    next(error);
  }
};

personsController.get("/", getAllPersons);
personsController.get("/:id", getPersonById);
personsController.post("/", validatePerson, validatePersonMiddleware, createPerson);
personsController.put("/:id", validatePerson, validatePersonMiddleware, updatePerson);
personsController.delete("/:id", deletePerson); 