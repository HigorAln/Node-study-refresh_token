import { client } from "../prisma/client"
import dayjs from 'dayjs'


class GenerateRefreshToken {
  async execute(userId: string){
    const expiresIn = dayjs().add(15,"second").unix() // Criando o expiresIn apartir da biblioteca
    
    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      }
    })

    return generateRefreshToken
  }
}

export { GenerateRefreshToken }