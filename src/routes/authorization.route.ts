import { NextFunction, Request, Response, Router } from "express"

import JWT from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes"
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware"
import ForbiddenError from "../models/errors/forbidden.error.model"


const authorizationRoute = Router()


authorizationRoute.post('/token',basicAuthenticationMiddleware, async (req:Request,res:Response,next:NextFunction) =>{
   try{
      const user = req.user

      if(!user){
         throw new ForbiddenError("usuario nao informado")
      }
      const jwtPayload = {username:user.name}
      const jwtOptions = {subject:user?.uuid}
      const secretKey ='my_secret_key'

      const jwt = JWT.sign( jwtPayload, secretKey, jwtOptions)
      res.status(StatusCodes.OK).json({token:jwt})
   }catch(err){
      next(err)
   }


})



export default authorizationRoute;