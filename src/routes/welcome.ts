import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const welcome = Router()

welcome.get('/',(req:Request ,res:Response, netx:NextFunction) =>{
   return res.status(StatusCodes.OK).json({message: "Sucesso total!, você e demais"});
});


export default welcome;
