import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import { client } from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
  username: string;
  password: string;
}

class AutenticateUserUseCase {
  async execute({ password, username }: IRequest){

    // Verificar se o usuario existe

    const useAlReadyExists = await client.user.findFirst({
      where: { username }
    })

    if(!useAlReadyExists){
      throw new Error("User or password incorrect");
    }

    // Verificar se a senha esta correta

    const passwordMatch = await compare(password, useAlReadyExists.password)

    if(!passwordMatch){
      throw new Error("User or password incorrect");
    }

    // Gerar o token do usuario

   const generateTokenProvider = new GenerateTokenProvider()
   const token = await generateTokenProvider.execute(useAlReadyExists.id)

   await client.refreshToken.deleteMany({
     where: {
       userId: useAlReadyExists.id
     }
   })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(useAlReadyExists.id)

    return { token, refreshToken}
  }

}

export { AutenticateUserUseCase }