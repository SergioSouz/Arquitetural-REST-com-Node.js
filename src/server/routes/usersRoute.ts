import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const usersRoutes = Router()


//  minha rota get "users"
usersRoutes.get('/users',(req:Request ,res:Response, netx:NextFunction) =>{
   const users = [{
      userName: "Sergio",
      userEmail: "sergio.dev0208@gmail.com"
   }]
   res.status(StatusCodes.OK).json(users);
   
});


//  minha rota GET "users:id"
usersRoutes.get('/users/:uuid',(req:Request<{uuid:string}> ,res:Response, netx:NextFunction) =>{
   const uuid = req.params.uuid;
   res.status(StatusCodes.OK).json(uuid);
});


//  minha rota POST "users"
usersRoutes.post('/users',(req:Request ,res:Response, netx:NextFunction) =>{
   const newUser = req.body;
   console.log(newUser);
   res.status(StatusCodes.CREATED).json(newUser);
});


usersRoutes.put('/users/:uuid',(req:Request<{uuid:string}> ,res:Response, netx:NextFunction) =>{
   const uuid = req.params.uuid;
   const modifiedUser = req.body;
   modifiedUser.uuid= uuid;
   console.log(modifiedUser);
   res.status(StatusCodes.OK).send({modifiedUser})
});



usersRoutes.delete('/users/:uuid',(req:Request<{uuid:string}> ,res:Response, netx:NextFunction) =>{
   res.sendStatus(StatusCodes.OK )
});


export { usersRoutes };
