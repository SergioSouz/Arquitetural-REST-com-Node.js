import  express  from "express";
import { usersRoutes } from "./routes/usersRoute";
import { welcome } from "./routes/welcome"


const app = express()

// configurando a aplicação
app.use(express.json())

// configurações de rotas
app.use(welcome)
app.use(usersRoutes)

// exportando nosso servidor
export { app }