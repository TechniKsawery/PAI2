"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItems = void 0;
const Items_1 = __importDefault(require("../models/Items"));
// Pobierz wszystkie przedmioty
const getItems = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Items_1.default.find();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ message: "Błąd serwera" });
    }
});
exports.getItems = getItems;
// Dodaj nowy przedmiot
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const newItem = new Items_1.default({ name, description });
        yield newItem.save();
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(400).json({ message: "Niepoprawne dane" });
    }
});
exports.createItem = createItem;
// Aktualizuj przedmiot
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedItem = yield Items_1.default.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Przedmiot nie znaleziony" });
        }
        res.status(200).json(updatedItem);
    }
    catch (error) {
        res.status(400).json({ message: "Błąd podczas aktualizacji" });
    }
});
exports.updateItem = updateItem;
// Usuń przedmiot
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedItem = yield Items_1.default.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Przedmiot nie znaleziony" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: "Błąd podczas usuwania" });
    }
});
exports.deleteItem = deleteItem;
