import { validationResult , body, param, query} from "express-validator";

const sensorKeys = ['Temperatura', 'Corriente', 'Vibración'];

export const createValidator = [
  body('id')
    .notEmpty().withMessage("El campo 'id' no puede estar vacío"),

  // Validaciones individuales de tipo
  ...sensorKeys.map(key =>
    body(`sensores.${key}`)
      .optional({ nullable: true })
      .isDecimal().withMessage(`${key} debe ser un valor decimal`)
  ),

  (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json(errores.array());
    }

    const sensores = req.body.sensores || {};
    const tieneAlMenosUnValor = sensorKeys.some(key => {
      const valor = sensores[key];
      return typeof valor === 'number' && !isNaN(valor);
    });

    if (!tieneAlMenosUnValor) {
      return res.status(400).json([
        {
          msg: "Debe haber al menos un valor numérico válido en 'sensores'",
          param: 'sensores',
          location: 'body'
        }
      ]);
    }

    next();
  }
];