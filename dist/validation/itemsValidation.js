"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateItem = void 0;
const express_validator_1 = require("express-validator");
exports.validateItem = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Nazwa jest wymagana'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Opis jest wymagany'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
