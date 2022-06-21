import db from "../database/db";
import User from "../models/userModel";
import DatabaseError from "../models/errors/database.error.model";



class UserRepository {
   async findAllUser(): Promise<User[]>{
      const query = `
         SELECT uuid, username, useremail
         FROM aplication_user
      `;

      const { rows } = await db.query<User>(query)
      return rows || [];
   }

   async findById(uuid:string): Promise<User>{
      try{
         const query = `
            SELECT uuid, username, useremail
            FROM aplication_user
            WHERE uuid = $1
         
         `;
   
         const values = [uuid]
         const { rows } = await db.query<User>(query,values)
         const [user] = rows;
         return user

      }catch(err){
         throw new DatabaseError( "Error na consulta por ID",err );
      }

   
   }

  async create(user:User): Promise<string>{
     const script = `
      INSERT INTO aplication_user (
         username,
         useremail,
         password
      )
      VALUES ($1,$2,crypt($3, 'my_salt'))
      RETURNING uuid
     `;

     const values = [user.name,user.email,user.password]
     const { rows } = await db.query<{uuid:string}>(script,values)
     const [ newUser ] = rows 
     return newUser.uuid
     
  }

   async update(user:User): Promise<void>{
      const script = `
      UPDATE aplication_user 
      SET 
         username = $1,
         useremail = $2,
         password = crypt($3, 'my_salt')
      WHERE uuid = $4



      `;

      const values = [user.name,user.email,user.password, user.uuid]
      await db.query(script,values)
   
   }

   async remove(uuid:string): Promise<void>{
      const script = `
         DELETE
            FROM aplication_user
            WHERE uuid = $1
      `;

      const values = [uuid]

      await db.query(script,values)
   }
   

}

export default new UserRepository();