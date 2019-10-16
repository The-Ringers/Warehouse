CREATE TABLE shipping_delivery (
    ship_del_id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    address VARCHAR(120),
    city VARCHAR(40),
    state VARCHAR(2),
    zip VARCHAR(15),
    sales_id INTEGER REFERENCES sales(sales_id),
    type shipping_delivery_type 
); 