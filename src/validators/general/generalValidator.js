import { validationResult , body, param, query} from "express-validator";

export const IdqueryValidator = [
    query('id')
    .notEmpty().withMessage("this value can't be empty")
    .isUUID().withMessage("the value must be UUID type"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]

export const IdqueryValidatorNode = [
    query('id')
    .notEmpty().withMessage("this value can't be empty"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]

export const FlagqueryValidatorNode = [
    query('flag')
    .notEmpty().withMessage("this value can't be empty")
    .isLength({max: 1}).withMessage("length must be one")
    .isInt().withMessage("must be integer"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]