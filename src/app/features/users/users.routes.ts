import { Router } from "express";
import UserController from "./controllers/user.controller";
import { CheckEmailWasUsedValidator } from "./validators/check-email-was-used.validator";
import { CreateUserDataValidator } from "./validators/create-user-data.validator";

export default () => {
  const router = Router();

  const userController = new UserController();

  router.post(
    "/user",
    new CreateUserDataValidator().validate,
    new CheckEmailWasUsedValidator().validate,
    userController.createUser
  );
  router.post("/users/login", userController.loginUser);

  return router;
};
