import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  const authToken = request.headers.authorization

  if(!authToken){
    return response.status(401.).json({
      message: "Token is missing"
    })
  }

  const [,token] = authToken.split(" ");

  try{
    verify(token, "f18f4951-e6d8-4eed-b206-e22c84e7ddf6")

    return next();
  }catch(err){
    return response.status(401).json({ message: "Token Invalid"})
  }

}