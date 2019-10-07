CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password TEXT NOT NULL,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    warehouse_id INTEGER REFERENCES warehouses(warehouse_id),
    role roles NOT NULL
);