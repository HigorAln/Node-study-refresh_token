import { sign } from "jsonwebtoken"


class GenerateTokenProvider {
  async execute(userId: string){

    const token = sign({}, "f18f4951-e6d8-4eed-b206-e22c84e7ddf6", {
      subject: userId,
      expiresIn: "20s"
    })

    return token
  }
}


export { GenerateTokenProvider }