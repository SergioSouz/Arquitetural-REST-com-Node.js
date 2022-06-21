import { Request,Response,NextFunction } from 'express'
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error.model";


function erroHendler(err:any,req:Request,res:Response,next:NextFunction){
   if( err instanceof DatabaseError){
      res.sendStatus(StatusCodes.BAD_REQUEST)
   }else{
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
   }

}


export default erroHendler;