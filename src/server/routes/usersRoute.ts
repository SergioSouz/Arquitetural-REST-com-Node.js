import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../../models/errors/database.error.model";
import userRepository from "../../repositories/user.repository";

const usersRoutes = Router()


//  minha rota get "users"
usersRoutes.get('/users',async (req:Request ,res:Response, next:NextFunction) =>{
   const users = await userRepository.findAllUser();
   res.status(StatusCodes.OK).json(users);
   
});


//  minha rota GET "users:id"
usersRoutes.get('/users/:uuid', async (req:Request<{uuid:string}> ,res:Response, next:NextFunction) =>{
   try{
      const uuid = req.params.uuid;
      const user = await userRepository.findById(uuid);
      res.status(StatusCodes.OK).json(user);
   }catch(err){
      next(err)
   }
});


//  minha rota POST "users"
usersRoutes.post('/users', async (req:Request ,res:Response, netx:NextFunction) =>{
   const newUser = req.body;
   
   const uuid = await userRepository.create(newUser)

   res.status(StatusCodes.CREATED).json(uuid);
});

//  minha rota PUT "users/uuid"
usersRoutes.put('/users/:uuid',async (req:Request<{uuid:string}> ,res:Response, netx:NextFunction) =>{
   const uuid = req.params.uuid;
   const modifiedUser = req.body;

   modifiedUser.uuid= uuid;
   await userRepository.update(modifiedUser)

   res.status(StatusCodes.OK).send({modifiedUser})
});


//  minha rota delete "users/uuid"
usersRoutes.delete('/users/:uuid',async (req:Request<{uuid:string}> ,res:Response, netx:NextFunction) =>{
   const uuid = req.params.uuid
   await userRepository.remove(uuid)
   res.sendStatus(StatusCodes.OK )
});


export { usersRoutes };
