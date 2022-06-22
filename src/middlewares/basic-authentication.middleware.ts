import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model"
import userRepository from "../repositories/user.repository"

async function basicAuthenticationMiddleware(req:Request, res:Response, next:NextFunction){
   try{
      const authorezationHeader = req.headers['authorization']

      if(!authorezationHeader){
         throw new ForbiddenError('Credenciais nao informandas')
      }

      const [type ,token] =authorezationHeader.split(' ')
      if(type !== 'Basic' || !token){
         throw new ForbiddenError('tipo de authenticacao invalida')
      }

      const tokenContent = Buffer.from(token, 'base64').toString('utf-8')
      const [username, password] =tokenContent.split(':')

      if(!username|| !password){
         throw new ForbiddenError('Credenciais invalidas')
      }

      const user = await userRepository.findUsernameAndPassword(username, password)

      if(!user){
         throw new ForbiddenError('Usuario invalido')

      }

      req.user = user;
      next();

   }catch(err){
      next(err)
   }
}

export default basicAuthenticationMiddleware;