CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS aplication_user(
   uuid uuid DEFAULT uuid_generate_v4(),
   username VARCHAR NOT NULL,
   useremail VARCHAR NOT NULL,
   password VARCHAR NOT NULL,
   PRIMARY KEY (uuid)
);

INSERT INTO aplication_user (username, useremail, password) VALUES ('sergio', 'sergio.test@gmail.com', crypt('admin','my_salt'))
