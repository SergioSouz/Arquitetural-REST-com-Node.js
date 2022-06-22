import express from "express";
import erroHendler from "../middlewares/error-handler.middleware";
import authorizationRoute from "../routes/authorization.route";
import usersRoutes from "../routes/usersRoute";
import welcome  from "../routes/welcome";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";


const app = express()

// configurando a aplicação
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// configurações de rotas
app.use(welcome)
app.use(authorizationRoute)

app.use(jwtAuthenticationMiddleware)
app.use(usersRoutes)



// configuracao dos handler de ERRO
// app.use(erroHendler)

// exportando nosso servidor
export { app };