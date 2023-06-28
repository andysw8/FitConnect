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

INSERT INTO workouts (title, image_url)
VALUES ('The Murph', 'https://murphsealmuseum.org/wp-content/uploads/2021/03/MurphWOD.jpg');

INSERT INTO workouts (title, image_url)
VALUES ('Tabata Style Challenge', 'https://images.shape.mdpcdn.com/sites/shape.com/files/u379275/shape-tabata_challenge.jpg');

INSERT INTO workouts (title, image_url)
VALUES ('Deck of Fitness', 'https://image.boxrox.com/2020/09/Deck-of-Fitness-1024x1024.jpg');


