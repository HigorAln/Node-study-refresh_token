import { Request, Response } from "express";
import { AutenticateUserUseCase } from "./AutenticateUserUseCase"


class AutenticateUserController {
  async handle( request: Request, response:Response ){
    const { username, password } = request.body

    const autenticateUserUseCase = new AutenticateUserUseCase();

    const token = await autenticateUserUseCase.execute({
      username, password
    })

    return response.json(token)
  }
}

export { AutenticateUserController }