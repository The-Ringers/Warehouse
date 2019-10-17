CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    company_name VARCHAR(40),
    email VARCHAR(320) NOT NULL,
    phone VARCHAR(15)
);