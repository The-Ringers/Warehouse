CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password TEXT NOT NULL,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    role roles NOT NULL,
    active BOOLEAN DEFAULT true
);