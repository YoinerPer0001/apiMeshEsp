import { validationResult, body, param, query } from "express-validator";

export const IdqueryValidator = [
    query('id')
        .notEmpty().withMessage("this value can't be empty")
        .isUUID().withMessage("the value must be UUID type"),

    (req, res, next) => {
        const errorList = validationResult(req)

        if (!errorList.isEmpty()) {
            return res.status(400).json(errorList.array())
        }

        next()
    }
]

export const IdqueryValidatorNode = [
    query('id')
        .notEmpty().withMessage("this value can't be empty"),

    (req, res, next) => {
        const errorList = validationResult(req)

        if (!errorList.isEmpty()) {
            return res.status(400).json(errorList.array())
        }

        next()
    }
]

export const FlagqueryValidatorNode = [
    query('flag')
        .notEmpty().withMessage("this value can't be empty")
        .isLength({ max: 1 }).withMessage("length must be one")
        .isInt().withMessage("must be integer"),

    (req, res, next) => {
        const errorList = validationResult(req)

        if (!errorList.isEmpty()) {
            return res.status(400).json(errorList.array())
        }
        next()
    }
]

export const createValidator = [
    body("nombre")
        .notEmpty().withMessage("El nombre no puede estar vacío")
        .isString().withMessage("El nombre debe ser una cadena de texto"),

    body("modelo")
        .notEmpty().withMessage("El modelo no puede estar vacío")
        .isString().withMessage("El modelo debe ser una cadena de texto"),

    body("nodos").isArray({ min: 1 }).withMessage("Debe haber al menos un nodo"),

    body("nodos.*.nombre")
        .notEmpty().withMessage("El nombre del nodo no puede estar vacío")
        .isString().withMessage("El nombre del nodo debe ser una cadena de texto"),

    body("nodos.*.mac")
        .notEmpty().withMessage("la mac del nodo no puede estar vacío")
        .isString().withMessage("la mac del nodo debe ser una cadena de texto"),

    body("nodos.*.sensores").isArray({ min: 1 }).withMessage("Cada nodo debe tener al menos un sensor"),

    body("nodos.*.sensores.*.nombre")
        .notEmpty().withMessage("El nombre del sensor no puede estar vacío")
        .isString().withMessage("El nombre del sensor debe ser una cadena de texto"),

    body("nodos.*.sensores.*.tipo")
        .notEmpty().withMessage("El tipo del sensor no puede estar vacío")
        .isString().withMessage("El tipo del sensor debe ser una cadena de texto"),

    body("nodos.*.sensores.*.unidad")
        .notEmpty().withMessage("La unidad del sensor no puede estar vacía")
        .isString().withMessage("La unidad del sensor debe ser una cadena de texto"),

    (req, res, next) => {
        const errorList = validationResult(req);
        if (!errorList.isEmpty()) {
            return res.status(400).json({ errors: errorList.array() });
        }
        next();
    }
];


