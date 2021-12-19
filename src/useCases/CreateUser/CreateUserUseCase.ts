import { hash } from 'bcryptjs'

import { client } from '../../prisma/client'

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

class CreateUserUseCase {
  async execute({ name, password, username }: IUserRequest){

    const userAlReadyExists = await client.user.findFirst({
      where: { username }
    })

    if(userAlReadyExists){
      throw new Error("User Already Exists!")
    }
    
    const passwordHash = await hash(password, 8)

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      }
    })

    return user
  }
}

export { CreateUserUseCase }