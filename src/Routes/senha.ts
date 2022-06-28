import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import Senha from "../Controllers/validar";

router.get(
  "/",
  function (request: Request, response: Response, next: NextFunction) {
    response.send("Rota Senha");
  }
);
router.post("/pass", Senha.Validar);

export default router;
