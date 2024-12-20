DROP DATABASE IF EXISTS plantify;
CREATE DATABASE plantify;
USE plantify;

CREATE TABLE user (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(12) NOT NULL,
    location VARCHAR(100), 
    image_user LONGBLOB
);

INSERT INTO user (username, email, location, password) VALUES
('MiniWheat', 'miniwheat@example.com', 'Montreal', 'cestReal'),
('PAC2', '2pac@example.com', 'Marseille','imdead'),
('SnoopyDoggy', 'snoopdogg@example.com', 'Lyon', 'blazeit420');

CREATE TABLE myplant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    myplant_name VARCHAR(100) NOT NULL,
    myplant_type VARCHAR(100) NOT NULL,
    myplant_age INT,
    myplant_location VARCHAR(100),
    image_myplant LONGBLOB,
    userId INT NOT NULL
);

INSERT INTO myplant (myplant_name, myplant_type, myplant_age, myplant_location, userId) VALUES
('Le Grand Fouette', 'Avocat', 2, 'Salon', 1),
('La ptite jaune', 'Araignée', 10, 'Cuisine',3),
('La suceptible', 'Cactus', 8, 'Salle de Bain',2);


CREATE TABLE plantdictionnary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plant_name VARCHAR(100) NOT NULL,
    plant_type VARCHAR(100) NOT NULL,
    watering_frequency INT(2) NOT NULL,
    depth_water_requirement VARCHAR(25) NOT NULL,
    poisonous_to_humans BOOLEAN NOT NULL DEFAULT FALSE,
    poisonous_to_pets BOOLEAN NOT NULL DEFAULT FALSE,
    intolerant_to_cold BOOLEAN NOT NULL DEFAULT FALSE, 
    image_plant LONGBLOB,
    indoor BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO plantdictionnary (
    plant_name, 
    plant_type, 
    watering_frequency, 
    depth_water_requirement, 
    poisonous_to_humans, 
    poisonous_to_pets, 
    intolerant_to_cold, 
    image_plant, 
    indoor
) VALUES 
('Lucky Bamboo', 'Bambou', 1,'20 mm', FALSE, FALSE, TRUE, NULL, TRUE),
('Christmas Cactus', 'Cactus', 2, '15 mm', FALSE, TRUE, TRUE, NULL, TRUE),
('Aloe Vera', 'Aloès', 1, '10 mm', FALSE, FALSE, TRUE, NULL, TRUE),
('Swiss Cheese Plant', 'Monstera', 2, '20 mm', FALSE, TRUE, TRUE, NULL, TRUE),
('Golden Pothos', 'Pothos', 2, '40 mm', TRUE, TRUE, TRUE, NULL, TRUE),
('Peace Lily', 'Lys de la paix', 3, '10 mm', TRUE, TRUE, TRUE, NULL, TRUE),
('Spider Plant', 'Araignée', 2, '15 mm', FALSE, FALSE, TRUE, NULL, TRUE),
('Chinese Evergreen', 'Aglaonema', 2,'30 mm', TRUE, TRUE, TRUE, NULL, TRUE),
('Rubber Tree', 'Figuier élastique', 1, '40 mm', FALSE, TRUE, TRUE, NULL, TRUE),
('Jade Plant', 'Plante de jade', 2, '15 mm', FALSE, TRUE, TRUE, NULL, TRUE),
('Boston Fern', 'Fougère de Boston', 1, '40 mm', FALSE, FALSE, TRUE, NULL, TRUE),
('Snake Plant', 'Langue de belle-mère', 1, '10 mm', FALSE, TRUE, TRUE, NULL, TRUE),
('Calathea Orbifolia', 'Calathée', 3, '20 mm', FALSE, FALSE, TRUE, NULL, TRUE),
('Bird of Paradise', 'Oiseau de paradis', 3, '25 mm', FALSE, TRUE, TRUE, NULL, TRUE),
('ZZ Plant', 'Zamioculcas', 2, '20 mm', FALSE, TRUE, TRUE, NULL, TRUE);


ALTER TABLE myplant
ADD COLUMN last_watering_time DATETIME DEFAULT NULL,
ADD COLUMN watering_interval INT DEFAULT NULL;

ALTER TABLE myplant
ADD CONSTRAINT fk_myplant_type
FOREIGN KEY (myplant_type) REFERENCES plantdictionnary(plant_type) 
ON DELETE CASCADE;

ALTER TABLE myplant
ADD CONSTRAINT fk_myplant_userId
FOREIGN KEY (userId) REFERENCES user(userId)
ON DELETE CASCADE;

/*
CREATE TABLE meteo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    temperature_min FLOAT,
    temperature_max FLOAT,
    precipitation FLOAT,
    weather_condition VARCHAR(100),
    wind_speed FLOAT,
    humidity INT
);

INSERT INTO meteo (location, date, temperature_min, temperature_max, precipitation, weather_condition, wind_speed, humidity) VALUES
('Montréal', '2024-12-01', -2.0, 5.0, 0.0, 'Clear', 10.5, 85),
('Laval', '2024-12-01', 3.0, 12.0, 0.5, 'Partly Cloudy', 8.0, 70),
('Lyon', '2024-12-01', -1.0, 8.0, 2.0, 'Rain', 5.5, 90),
('Paris', '2024-12-02', 0.0, 7.0, 0.0, 'Sunny', 6.0, 80),
('Marseille', '2024-12-02', 5.0, 14.0, 0.0, 'Clear', 12.0, 65);
*/
-- Exemples de SELECT pour les fonctionnalités

-- 1. Alerte en cas de gel
-- Requête pour identifier les plantes sensibles au gel avec une température prévue sous 0°C
/*
SELECT 
    u.nom AS user_name,
    u.prenom AS user_first_name,
    m.myplant_name,
    met.location,
    met.temperature_min
FROM 
    user u
JOIN 
    user_myplant um ON u.id = um.user_id
JOIN 
    myplant m ON um.myplant_id = m.id
JOIN 
    plantdictionnary pd ON m.myplant_type = pd.plant_type
JOIN 
    meteo met ON u.location = met.location
WHERE 
    met.temperature_min < 0 AND pd.intolerant_to_cold = TRUE;
*/

-- 2. Alerte d’arrosage en cas de sécheresse (pas de pluie)
-- Requête pour identifier les plantes dans des zones avec 0 mm de précipitations sur une journée
/*
SELECT 
    u.nom AS user_name,
    u.prenom AS user_first_name,
    m.myplant_name,
    met.location,
    met.precipitation AS today_precipitation
FROM 
    user u
JOIN 
    user_myplant um ON u.id = um.user_id
JOIN 
    myplant m ON um.myplant_id = m.id
JOIN 
    meteo met ON u.location = met.location
WHERE 
    met.date = CURDATE()
    AND met.precipitation = 0;

*/
