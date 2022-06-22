import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken'
import userRepository from "../repositories/user.repository";

async function bearerAuthenticationMiddleware(req:Request, res:Response, next:NextFunction){
   try{
      const authorizationHeader =req.headers['authorization']

      if(!authorizationHeader){
         throw new ForbiddenError('Credenciais nao informada')
      }

      const [type, token] = authorizationHeader.split(' ')
      if(type !== 'bearer' || !token){
         throw new ForbiddenError('tipo de authenticacao invalida')
      }

      const tokenPayload = JWT.verify(token,'my_secret_key')

      if(typeof tokenPayload !== 'object' ||!tokenPayload.sub){
         throw new ForbiddenError('token invalido')
      }

      const uuid = tokenPayload.sub;
      const user = await userRepository.findById(uuid)
      req.user = user

      next()
   }catch(err){
      next(err)

   }

}


export default bearerAuthenticationMiddleware;