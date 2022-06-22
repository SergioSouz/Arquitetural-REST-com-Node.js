import express from "express";
import bearerAuthenticationMiddleware from "../middlewares/bearer-authentication.middleware";
import erroHendler from "../middlewares/error-handler.middleware";
import authorizationRoute from "../routes/authorization.route";
import usersRoutes from "../routes/usersRoute";
import welcome  from "../routes/welcome";


const app = express()

// configurando a aplicação
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// configurações de rotas
app.use(welcome)
app.use(bearerAuthenticationMiddleware,usersRoutes)
app.use(authorizationRoute)


// configuracao dos handler de ERRO
app.use(erroHendler)

// exportando nosso servidor
export { app };