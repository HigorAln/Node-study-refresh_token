import { Router } from 'express'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AutenticateUserController } from './useCases/autenticateUser/AutenticateUserController';
import { CreateUserController } from './useCases/CreateUser/CreateUserController';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController';

const router = Router();

const createUserController = new CreateUserController();
const autenticateUserControler = new AutenticateUserController()
const refreshTokenUseControler = new RefreshTokenUserController()

router.post('/users', createUserController.handle)
router.post("/login", autenticateUserControler.handle)
router.post("/refresh-token", refreshTokenUseControler.handle)

router.get("/courses", ensureAuthenticated ,(request, response)=> {
  return response.json([
    {id: 1, name: "Nodejs"},
    {id: 2, name: "ReactJs"},
    {id: 3, name: "React Native"},
    {id: 4, name: "Flutuer"},
    {id: 5, name: "Elixir"},
  ])
})

export { router }

