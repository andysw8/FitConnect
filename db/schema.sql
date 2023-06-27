CREATE DATABASE fitconnect; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    Username TEXT,
    Email TEXT,
    Password_digest TEXT
); 

CREATE TABLE workouts (
    id SERIAL PRIMARY KEY, 
    title TEXT, 
    image_url TEXT, 
    user_id INTEGER REFERENCES users(id)
);