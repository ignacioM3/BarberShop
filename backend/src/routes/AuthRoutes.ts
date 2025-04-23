import express from "express";
import { AuthControllers } from "../controllers/AuthControllers";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("el password debe tener al menos 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los password deben ser iguales");
    }
    return true;
  }),
  body("email").isEmail().withMessage("Email no valido"),
  handleInputErrors,
  AuthControllers.register
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email no valido"),
  body("password").notEmpty().withMessage("El password no puede ir vacio"),
  handleInputErrors,
  AuthControllers.login
);

router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("El token no puede estar vacio"),
  handleInputErrors,
  AuthControllers.confirmAccount
);

router.post(
  "/request-code",
  body("email").isEmail().withMessage("Email no valido"),
  handleInputErrors,
  AuthControllers.requestConfirmationCode
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Email no válido"),
  handleInputErrors,
  AuthControllers.forgotPassword
);

router.post(
  "/validate-token",
  body("token").notEmpty().withMessage("Token no válido"),
  handleInputErrors,
  AuthControllers.validateToken
);

router.post(
  "/update-password/:token",
  param("token").isNumeric().withMessage("Token no valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("el password debe tener al menos 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los password deben ser iguales");
    }
    return true;
  }),
  handleInputErrors,
  AuthControllers.updatePasswordWithToken
);
router.get('/user/perfil',authenticate ,AuthControllers.user)
router.post('/user/update/:id', 
  authenticate,
  param("id").isMongoId().withMessage("Id no valido"),
  handleInputErrors,
  AuthControllers.updateUser)
export default router;
