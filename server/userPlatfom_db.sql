
CREATE DATABASE IF NOT EXISTS user_platform_db;
USE user_platform_db;

-- טבלת users
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  name VARCHAR(100),
  username VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(50),
  website VARCHAR(100)
);

-- טבלת address
CREATE TABLE addresses (
  user_id BIGINT,
  street VARCHAR(100),
  suite VARCHAR(50),
  city VARCHAR(100),
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE posts (
  id BIGINT PRIMARY KEY,
  user_id BIGINT,
  title VARCHAR(255),
  body TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments (
  id BIGINT PRIMARY KEY,
  post_id BIGINT,
  name VARCHAR(255),
  email VARCHAR(100),
  body TEXT,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
CREATE TABLE todos (
  id BIGINT PRIMARY KEY,
  user_id BIGINT,
  title VARCHAR(255),
  completed BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

   SELECT users.*
      FROM users
      JOIN passwords ON users.id = passwords.user_id
      WHERE users.username = "123"  AND passwords.password_hash = "1234567"