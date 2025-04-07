import { Request, Response } from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/itemController';
import Item from '../models/itemModel';
import mongoose from 'mongoose';

jest.mock('../models/itemModel');

describe('Item Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createItem', () => {
    it('powinien utworzyć nowy przedmiot', async () => {
      const mockItem = {
        id: 1,
        name: 'Test Item',
        description: 'Test Description',
        price: 99.99,
      };

      (Item.findOne as jest.Mock).mockResolvedValue(null);
      (Item.create as jest.Mock).mockResolvedValue(mockItem);

      mockRequest.body = {
        name: 'Test Item',
        description: 'Test Description',
        price: 99.99,
      };

      await createItem(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockItem,
      });
    });

    it('powinien zwrócić błąd przy nieprawidłowych danych', async () => {
      mockRequest.body = {
        name: '',
        description: '',
        price: -1,
      };

      await createItem(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getItems', () => {
    it('powinien zwrócić listę przedmiotów', async () => {
      const mockItems = [
        { id: 1, name: 'Item 1', description: 'Desc 1', price: 10 },
        { id: 2, name: 'Item 2', description: 'Desc 2', price: 20 },
      ];

      (Item.find as jest.Mock).mockResolvedValue(mockItems);

      await getItems(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        results: mockItems.length,
        data: mockItems,
      });
    });
  });

  describe('getItemById', () => {
    it('powinien zwrócić przedmiot po ID', async () => {
      const mockItem = {
        id: 1,
        name: 'Test Item',
        description: 'Test Description',
        price: 99.99,
      };

      (Item.findOne as jest.Mock).mockResolvedValue(mockItem);
      mockRequest.params = { id: '1' };

      await getItemById(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockItem,
      });
    });

    it('powinien zwrócić błąd gdy przedmiot nie istnieje', async () => {
      (Item.findOne as jest.Mock).mockResolvedValue(null);
      mockRequest.params = { id: '999' };

      await getItemById(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });
}); 