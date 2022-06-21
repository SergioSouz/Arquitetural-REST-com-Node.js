import { Pool } from "pg";

const connectionString = {
   user: 'postgres',
   password: 'postgres',
   host: 'localhost',
   port: 5432,
   database: 'dio'
};

const db = new Pool(connectionString);

export default db;